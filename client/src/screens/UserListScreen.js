import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { listUsers, deleteUser } from '../actions/userActions'
import { ImCross, ImCheckmark } from 'react-icons/im'
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        dispatch(listUsers())
    }, [userInfo, successDelete])
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteUser(id))
        }
    }
    console.log('users', users)
    console.log('userList', userList)
  return (
    <div className="w-10/12 mx-auto mt-24" style={{ minHeight: `calc(100vh - 9.5rem)`}}>
        <h1 className="uppercase text-3xl font-semibold mb-6 pt-6">Users</h1>
        { loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : (
            <>
            <table className="w-full hidden lg:block">
                <thead className="w-full border border-gray-200">
                    <tr className='py-4'>
                        <th className="px-2 py-3 text-left">ID</th>
                        <th className="px-2 text-left">NAME</th>
                        <th className="px-2 text-left">EMAIL</th>
                        <th className="px-2 text-left">ADMIN</th>
                        <th className="px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user._id} className="bg-gray-100 hover:bg-gray-50 border border-gray-200">
                            <td className="px-2 text-left py-2">{user._id}</td>
                            <td className="px-2 text-left">{user.name}</td>
                            <td className="px-2 text-left"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td className="px-2 text-left">{user.isAdmin ? 
                                <ImCheckmark className="text-green-400" /> : (
                                <ImCross className="text-red-400" />
                            )}</td>
                            <td className="px-2 text-left">
                                <Link to={`/admin/user/${user?._id}/edit`}>
                                    <button className="px-2 py-1 mx-auto cursor-pointer"><FaUserEdit /></button>
                                </Link>
                                <button 
                                    className="px-2 py-1 mx-auto cursor-pointer"
                                    onClick={() => deleteHandler(user._id)}><FaTrashAlt /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                <div className="lg:hidden mt-12">
                    {users?.map((user, i) => (
                        <div key={user._id}>
                            <p>ID: {user._id}</p>
                            <p>NAME: {user.name}</p>
                            <p>EMAIL: {user.email}</p>
                            <p>ADMIN: {user.isAdmin ? 
                                <ImCheckmark className="text-green-400" /> : (
                                <ImCross className="text-red-400" />
                            )}</p>
                            <Link to={`/admin/user/${user?._id}/edit`}>
                                <button className="px-2 py-1 text-2xl mx-auto cursor-pointer mt-4 mr-2"><FaUserEdit /></button>
                            </Link>
                            <button 
                                className="px-2 py-1 mx-auto text-xl cursor-pointer"
                                onClick={() => deleteHandler(user._id)}><FaTrashAlt /></button>
                            {i + 1 !== users.length && (
                                <hr className='w-full border mt-2 mb-8 ' />
                            )}
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
  )
}

export default UserListScreen