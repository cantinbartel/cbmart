import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import Footer from '../components/Footer'

const PlaceOrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    console.log('cart inside placeorders', cart)
    let lastIndex = cart.cartItems.length - 1
    // Calculate Price
    cart.itemsPrice = Number.parseFloat(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    )).toFixed(2)

    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10

    cart.taxPrice = Number.parseFloat((cart.itemsPrice * 0.21)).toFixed(2)

    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)
    // cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success, dispatch])

    const placeOrderHandler = () => {
        console.log('cart.paymentMethod', cart.paymentMethod)
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
            <div className='pt-24' style={{ minHeight: `calc(100vh - 4rem)`}}>
                <div className="w-8/12 mx-auto">
                    <CheckoutSteps step1 step2 step3 step4 className="hidden lg:block" />
                </div>
                <div className="w-full lg:w-10/12 mx-auto flex flex-col lg:flex-row justify-between items-start pt-6 lg:pt-0 pl-4 lg:pt-0">
                    <div className="w-full lg:w-8/12">
                        <h1 className="font-semibold text-2xl uppercase mb-3">Shipping</h1>
                        <p className="mb-4">
                            <span className="font-semibold capitalize">Address:</span>&nbsp;
                            {cart.shippingAddress.address},&nbsp;{cart.shippingAddress.vity}&nbsp;
                            {cart.shippingAddress.postalCode},&nbsp;{cart.shippingAddress.country}
                        </p>
                        <hr />
                        <h1 className="font-semibold text-2xl uppercase mb-3 mt-4">Payment Method</h1>
                        <p className="mb-4">
                            <span className="font-semibold capitalize">Method:</span>&nbsp;
                            {cart.paymentMethod}
                        </p>
                        <hr />
                        <h1 className="font-semibold text-2xl uppercase mb-3 mt-4">Order Items</h1>
                        {cart.cartItems.length === 0 ?
                            <p>Your cart is empty</p> :
                            cart.cartItems.map((item, index) => (
                                <>
                                    <div className={`flex flex-col lg:flex-row justify-start items-start font-semibold m-4 ${index === 0 ? 'mt-8' : ''}`}>
                                        <div className="flex justify-start items-start w-full lg:w-8/12">
                                            <img className="w-20 lg:w-8 rounded mr-8" src={item.image} />
                                            <Link to={`/product/${item.product}`}>
                                                <p>{item.name}</p>
                                            </Link>
                                        </div>
                                        <p className='mt-6 lg:mt-0'>{item.qty} x {item.price}€ = {item.qty * item.price}€</p>
                                    </div>
                                    {index !== lastIndex && <hr />}
                                </>
                            ))
                        }
                    </div>
                    <div className="w-6/10 lg:w-3/10 text-sm mt-8 lg:mt-4 mb-8 self-center lg:self-start">
                        <div className="flex flex-col">
                            <div className="border border-gray-300 py-3 pt-4 pb-6 pl-4">
                                <p className="font-semibold text-gray-800 text-xl uppercase">Order Summary</p>
                            </div>
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Items</p>
                                <p className="text-gray-600">{cart.itemsPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Shipping</p>
                                <p className="text-gray-600">{cart.shippingPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Tax</p>
                                <p className="text-gray-600">{cart.taxPrice}€</p>
                            </div>
                            {/* <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }} /> */}
                            <div className="flex justify-start items-center border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 capitalize w-40">Total</p>
                                <p className="text-gray-600">{cart.totalPrice}€</p>
                            </div>
                            {error && <p>{error}</p>}
                            <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }}>
                                <button
                                    className="uppercase w-full bg-black text-white font-semibold px-3 py-2 rounded"
                                    type="submit"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PlaceOrderScreen


// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import CheckoutSteps from '../components/CheckoutSteps'

// const PlaceOrderScreen = () => {
//     const cart = useSelector(state => state.cart)
//     console.log('cart inside placeorders', cart)
//     let lastIndex = cart.cartItems.length - 1
//     const placeOrderHandler = () => {
//         console.log('Place Order')
//     }
//     return (
//         <div className="w-8/12 mx-auto">
//             <CheckoutSteps step1 step2 step3 step4 />
//             <h1 className="font-semibold text-2xl uppercase mb-3">Shipping</h1>
//             <p className="mb-4">
//                 <span className="font-semibold capitalize">Address:</span>&nbsp;
//                 {cart.shippingAddress.address},&nbsp;{cart.shippingAddress.vity}&nbsp;
//                 {cart.shippingAddress.postalCode},&nbsp;{cart.shippingAddress.country}
//             </p>
//             <hr />
//             <h1 className="font-semibold text-2xl uppercase mb-3 mt-4">Payment Method</h1>
//             <p className="mb-4">
//                 <span className="font-semibold capitalize">Method:</span>&nbsp;
//                 {cart.paymentMethod}
//             </p>
//             <h1 className="font-semibold text-2xl uppercase mb-3 mt-4">Order Items</h1>
//             {cart.cartItems.length === 0 ?
//                 <p>Your cart is empty</p> :
//                 cart.cartItems.map((item, index) => (
//                     <>
//                         <div className={`flex justify-start items-start font-semibold m-4 ${index === 0 ? 'mt-8' : ''}`}>
//                             <div className="flex justify-start items-start w-8/12">
//                                 <img className="w-8 rounded mr-8" src={item.image} />
//                                 <Link to={`/product/${item.product}`}>
//                                     <p>{item.name}</p>
//                                 </Link>
//                             </div>
//                             <p>{item.qty} x {item.price}€ = {item.qty * item.price}€</p>
//                         </div>
//                         {index !== lastIndex && <hr />}
//                     </>
//                 ))
//             }
//             <h1>Items</h1>
//             <p>{cart.itemsPrice || 'test'}</p>
//             <h1>Shipping</h1>
//             <p>{cart.shippingPrice}</p>
//             <h1>Tax</h1>
//             <p>{cart.taxPrice}</p>
//             <h1>Total</h1>
//             <p>{cart.totalPrice}</p>
//             <button
//                 className="uppercase bg-black text-white font-semibold px-3 py-2 rounded"
//                 type="submit"
//                 onClick={placeOrderHandler}>Place Order</button>
//         </div>
//     )
// }

// export default PlaceOrderScreen