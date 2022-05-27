import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = () => {
    const [lastIndex, setLastIndex] = useState(0)
    const [sdkReady, setSdkReady] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const orderId = id

    console.log('orderId', orderId)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    console.log('order.isPaid', order?.isPaid)
    // useEffect(() => {
    //     if (!order || order._id !== orderId) {
    //         dispatch(getOrderDetails(orderId))
    //     }
    //     setLastIndex(order?.orderItems.length - 1)
    // }, [order, orderId])

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            console.log('clientId', clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        setLastIndex(order?.orderItems.length - 1)

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
        // dispatch(getOrderDetails(orderId))
        // }, [])
    }, [order, orderId, successPay, order])

    console.log('order', order)

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    { loading && <p>Loading...</p> }
    { error && <p>{error}</p> }
    return (
        <div className="w-10/12 mx-auto mt-6">
            <h1 className="text-2xl font-semibold uppercase">Order {order?._id}</h1>
            {/* <div className="w-8/12 mx-auto">
                    <CheckoutSteps step1 step2 step3 step4 />
                </div> */}
            <div className="flex justify-between items-start ml-4">
                <div className="w-8/12">
                    <h1 className="font-semibold text-lg uppercase mb-3 mt-6">Shipping</h1>
                    <p className="capitalize"><span className="font-semibold">Name:</span>&nbsp;{order?.user.name}</p>
                    <p className="capitalize"><span className="font-semibold">Email:</span>&nbsp;<a href={`mailto:${order?.user.email}`}>{order?.user.email}</a></p>
                    <p className="mb-4">
                        <span className="font-semibold capitalize">Address:</span>&nbsp;
                        {order?.shippingAddress.address},&nbsp;{order?.shippingAddress.vity}&nbsp;
                        {order?.shippingAddress.postalCode},&nbsp;{order?.shippingAddress.country}
                    </p>
                    {order?.isDelivered ? <p className="font-semibold capitalize">Delivered on {order?.deliveredAt}</p> : <p className="font-semibold capitalize">Not Delivered</p>}
                    <hr />
                    <h1 className="font-semibold text-lg uppercase mb-3 mt-4">Payment Method</h1>
                    <p className="mb-4">
                        <span className="font-semibold capitalize">Method:</span>&nbsp;
                        {order?.paymentMethod}
                    </p>
                    {order?.isPaid ? <p className="font-semibold capitalize">Paid on {order?.paidAt}</p> : <p className="font-semibold capitalize">Not Paid</p>}
                    <hr />
                    <h1 className="font-semibold text-lg uppercase mb-3 mt-4">Order Items</h1>
                    {order?.orderItems.length === 0 ?
                        <p>Order is empty</p> :
                        order?.orderItems.map((item, index) => (
                            <div key={index}>
                                <div className={`flex justify-start items-start font-semibold m-4 ${index === 0 ? 'mt-8' : ''}`}>
                                    <div className="flex justify-start items-start w-8/12">
                                        <img className="w-8 rounded mr-8" src={item.image} />
                                        <Link to={`/product/${item.product}`}>
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                    <p>{item.qty} x {item.price}€ = {item.qty * item.price}€</p>
                                </div>
                                {index !== lastIndex && <hr />}
                            </div>
                        ))
                    }
                </div>
                <div className="w-3/10 text-sm mt-4">
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
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                {loadingPay && <p>Loading...</p>}
                                {!sdkReady ? <p>Loading...</p> : (
                                    <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen