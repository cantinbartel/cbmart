import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserDetails, getUserUpdateProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { ImCross } from 'react-icons/im';

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            // setTimeout(() => { setMessage('') }, [2000])
        } else {
            dispatch(getUserUpdateProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <div className="w-full h-full flex justify-start items-start text-gray-600">
            <div className="h-full w-3/12 my-8 mx-8">
                <h1 className="uppercase text-3xl font-semibold mb-6">User Profile</h1>
                <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="name">name</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="name" type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="email">email address</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="email" type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="password">password</label>
                    <input
                        className="w-full px-4 py-2 mb-4 bg-gray-100 font-semibold"
                        id="password"
                        type="text"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="confirmPassword">confirm password</label>
                    <input
                        className="w-full px-4 py-2 mb-4 bg-gray-100 font-semibold"
                        id="confirmPassword"
                        type="text"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <button
                        className="uppercase bg-black text-white font-semibold px-3 py-2 rounded"
                        type="submit">update</button>
                </form>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                {success && <p>Profile Updated</p>}
                {loading && <p>Loading</p>}
            </div>
            <div className="h-full w-9/12 my-8 mx-8">
                <h1 className="uppercase text-3xl font-semibold mb-6">My Orders</h1>
                {loadingOrders ? <p>Loading...</p> :
                    errorOrders ? <p>{errorOrders}</p> : (
                        <table className="w-full">
                            <thead className="w-full border border-gray-200">
                                <tr className='py-4'>
                                    <th className="px-2 py-3 text-left">ID</th>
                                    <th className="px-2 text-left">DATE</th>
                                    <th className="px-2 text-left">TOTAL</th>
                                    <th className="px-2 text-left">PAID</th>
                                    <th className="px-2 text-left">DELIVERED</th>
                                    <th className="px-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="bg-gray-100 border border-gray-200">
                                        <td className="px-2 text-left py-2">{order._id}</td>
                                        <td className="px-2 text-left">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-2 text-left">{order.totalPrice}</td>
                                        <td className="px-2 text-left">{order.isPaid ? order.paidAt.substring(0, 10) : (
                                            <ImCross className="text-red-400" />
                                        )}</td>
                                        <td className="px-2 text-left">{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                            <ImCross className="text-red-400" />
                                        )}</td>
                                        <td className="px-2 text-left">
                                            <Link to={`/order/${order._id}`}>
                                                <button className="px-2 py-1 mx-auto cursor-pointer">Details</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            </div>
        </div>
    )
}

export default ProfileScreen