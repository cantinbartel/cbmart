import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = (props) => {
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { 
        loading:loadingUpdate, 
        error:errorUpdate, 
        success:successUpdate 
    } = userUpdate

    const [name, setName] = useState(user.name || '')
    const [email, setEmail] = useState(user.email || '')
    const [isAdmin, setIsAdmin] = useState(user.isAdmin || false)

    const { id } = useParams()
    const testId = props.match?.params.id
    const navigate = useNavigate()
    const location = useLocation()
    console.log('USERDETAILS', userDetails)
    console.log('USER', user)
    console.log('USERID', id)
    console.log('TESTID', testId)

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist/')
        } else {
            if(!user.name || user._id != id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }  
    }, [user, successUpdate, id, dispatch, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist'>
                    <span className='font-bold mb-8'>GO BACK</span>
            </Link>
            { loadingUpdate && <p>Loading...</p> }
            { errorUpdate && <p>{errorUpdate}</p> }
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <div className="h-full w-1/3 mx-auto my-8">
                    <h1 className="uppercase text-3xl font-semibold mb-6">Edit User</h1>
                    <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="name">name</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="name" 
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="email">email address</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="email" 
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <div className="flex justify-start items-center mb-6">
                            <label
                                className="capitalize text-gray-600 font-semibold mr-2"
                                htmlFor="password">admin</label>
                            <input
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)} />
                        </div>
                        <button className="uppercase bg-black text-white font-semibold px-3 py-2 rounded">update</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default UserEditScreen