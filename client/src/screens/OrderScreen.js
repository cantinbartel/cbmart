import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Paypal from '../components/Paypal'
import axios from 'axios'
// import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_DETAILS_RESET } from '../constants/orderConstants'
import { CART_RESET } from '../constants/cartConstants'
import Footer from '../components/Footer'
import { FiLoader } from "react-icons/fi"

const OrderScreen = () => {
    const [lastIndex, setLastIndex] = useState(0)
    const [sdkReady, setSdkReady] = useState(false)
    const [paymentResult, setPaymentResult] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderId = id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [])

    useEffect(() => {
        if(!userInfo) navigate('/login')
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        setLastIndex(order?.orderItems.length - 1)

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_DETAILS_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [order, orderId, successPay, successDeliver, dispatch])

    useEffect(() => {
        if (paymentResult) {
            dispatch(payOrder(orderId, paymentResult))
            dispatch({ type: CART_RESET })
        }  
    }, [paymentResult])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    { loading && <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' /> }
    { error && <p>{error}</p> }
    return (
        <>
            <div className="min-h-screen w-10/12 mx-auto pt-24 lg:-mb-12">
                <div className="text-2xl font-semibold uppercase pt-6 flex flex-col lg:flex-row ml-4 lg:ml-0">
                    <p>Order</p> 
                    <p className="text-xl lg:text-2xl lg:ml-2">{order?._id}</p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-start ml-4">
                    <div className="w-full lg:w-8/12">
                        <h1 className="font-semibold text-lg uppercase mb-3 mt-8 lg:mt-6">Shipping</h1>
                        <p className="capitalize"><span className="font-semibold">Name:</span>&nbsp;{order?.user.name}</p>
                        <p><span className="font-semibold">Email:</span>&nbsp;<a href={`mailto:${order?.user.email}`}>{order?.user.email}</a></p>
                        <p className="mb-4">
                            <span className="font-semibold capitalize">Address:</span>&nbsp;
                            {order?.shippingAddress.address},&nbsp;{order?.shippingAddress.city}&nbsp;
                            {order?.shippingAddress.postalCode},&nbsp;{order?.shippingAddress.country}
                        </p>
                        {order?.isDelivered ? <p className="font-semibold capitalize">Delivered on {order?.deliveredAt}</p> : <p className="font-semibold capitalize">Not Delivered</p>}
                        <hr />
                        <h1 className="font-semibold text-lg uppercase mb-3 mt-8 lg:mt-4">Payment Method</h1>
                        <p className="mb-4">
                            <span className="font-semibold capitalize">Method:</span>&nbsp;
                            {order?.paymentMethod}
                        </p>
                        {order?.isPaid ? <p className="font-semibold capitalize">Paid on {order?.paidAt}</p> : <p className="font-semibold capitalize">Not Paid</p>}
                        <hr />
                        <h1 className="font-semibold text-lg uppercase mb-3 mt-8 lg:mt-4">Order Items</h1>
                        {order?.orderItems.length === 0 ?
                            <p>Order is empty</p> :
                            order?.orderItems.map((item, index) => (
                                <div key={index}>
                                    <div className={`flex flex-col lg:flex-row justify-start items-start font-semibold m-4 ${index === 0 ? 'mt-8' : ''}`}>
                                        <div className="flex flex-col lg:flex-row justify-start items-start w-full lg:w-8/12 mb-2 lg:mb-0">
                                            <img className="w-20 lg:w-8 rounded mr-8 mb-3 lg:mb-0" src={item.image} />
                                            <Link to={`/product/${item.product}`}>
                                                <p>{item.name}</p>
                                            </Link>
                                        </div>
                                        <p>{item.qty} x {item.price}€ = {item.qty * item.price}€</p>
                                    </div>
                                    {index !== lastIndex && <hr className='mb-8' />}
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-8/10 lg:w-3/10 text-sm mt-8 lg:mt-4 mb-6 lg:mb-0 self-center lg:self-start">
                        <div className="flex flex-col">
                            <div className="border border-gray-300 py-3 pt-4 pb-6 pl-4">
                                <p className="font-semibold text-gray-800 text-xl uppercase">Order Summary</p>
                            </div>
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Items</p>
                                <p className="text-gray-600">{order?.itemsPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Shipping</p>
                                <p className="text-gray-600">{order?.shippingPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Tax</p>
                                <p className="text-gray-600">{order?.taxPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Total</p>
                                <p className="text-gray-600">{order?.totalPrice}€</p>
                            </div>
                            {!order?.isPaid && (
                                <div className="flex justify-center lg:justify-start items-center border border-gray-300 py-3 px-4">
                                    {loadingPay && <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' />}
                                    {!sdkReady ? <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' /> : (
                                        <Paypal amount={order?.totalPrice} setPaymentResult={setPaymentResult} />
                                    )}
                                </div>
                            )}
                            {loadingDeliver && <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' />}
                            {userInfo && userInfo.isAdmin && order?.isPaid && !order?.isDelivered && (
                                <button
                                    className="w-full bg-black text-white font-semibold px-3 py-2 rounded mt-3" 
                                    onClick={deliverHandler}>Mark as delivered</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default OrderScreen