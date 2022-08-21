import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants'
import { listOrders } from '../actions/orderActions'
import { ImCross, ImCheckmark } from 'react-icons/im'
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa'

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
            dispatch({ type: 'CART_RESET' })
        } else {
            navigate('/login')
        }
        dispatch(listOrders())
    // }, [userInfo])
    }, [userInfo, dispatch])
    console.log('orders', orders)
    console.log('orderList', orderList)
    const handleDetails = (order) => {
        dispatch({ type: ORDER_DETAILS_RESET })
        navigate(`/order/${order?._id}`)
    }
  return (
    <div className="w-10/12 mx-auto mt-6" style={{ minHeight: `calc(100vh - 9.5rem)`}}>
        <h1 className="uppercase text-3xl font-semibold mb-6">Orders</h1>
        { loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : (
            <table className="w-full">
                <thead className="w-full border border-gray-200">
                    <tr className='py-4'>
                        <th className="px-2 py-3 text-left">ID</th>
                        <th className="px-2 text-left">USER</th>
                        <th className="px-2 text-left">DATE</th>
                        <th className="px-2 text-left">TOTAL</th>
                        <th className="px-2 text-left">PAID</th>
                        <th className="px-2 text-left">DELIVERED</th>
                        <th className="px-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map(order => (
                        <tr key={order._id} className="bg-gray-100 hover:bg-gray-50 border border-gray-200">
                            <td className="px-2 text-left py-2">{order._id}</td>
                            <td className="px-2 text-left">{order.user && order.user.name}</td>
                            <td className="px-2 text-left">{order.createdAt.substring(0,10)}</td>
                            <td className="px-2 text-left">{order.totalPrice}€</td>
                            <td className="px-2 text-left">
                                {order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    <ImCross className="text-red-400" />
                                )}
                            </td>
                            <td className="px-2 text-left">
                                {order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                    <ImCross className="text-red-400" />
                                )}
                            </td>
                            <td className="px-2 text-left">
                                {/* <Link to={`/order/${order?._id}`}> */}
                                    <button 
                                        className="px-2 py-1 mx-auto cursor-pointer"
                                        onClick={() => handleDetails(order)}>Details</button>
                                {/* </Link> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default OrderListScreen     