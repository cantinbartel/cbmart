import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const choosePaymentMethod = (paymentChoosen) => {
        if (paymentChoosen === paymentMethod) {
            setPaymentMethod(null)
        } else {
            setPaymentMethod(paymentChoosen)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <>
            <div className="w-8/12 pt-24 mx-auto" style={{ minHeight: `calc(100vh - 4rem)`}}>
                <CheckoutSteps step1 step2 step3 className="hidden md:block" />
                <h1 className="font-semibold text-2xl uppercase mb-12 lg:mb-8 pt-6 lg:pt-0">Payment Method</h1>
                <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5 mr-2"
                        htmlFor="paypal">Paypal</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-8 lg:mb-4 -mt-6 -ml-6 lg:-ml-0"
                        id="paypal" type="checkbox"
                        // placeholder="Enter credentials"
                        // value={paymentMethod}
                        checked={paymentMethod === 'paypal'}
                        onChange={() => choosePaymentMethod('paypal')} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5 mr-2"
                        htmlFor="stripe">Credit Card</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4 -mt-6 -ml-6 lg:-ml-0"
                        id="stripe" type="checkbox"
                        // placeholder="Enter credentials"
                        // value={paymentMethod}
                        checked={paymentMethod === 'stripe'}
                        onChange={() => choosePaymentMethod('stripe')} />
                    <button
                        className="uppercase bg-black text-white font-semibold px-3 py-2 rounded mt-6 lg:mt-0"
                        type="submit"
                        disabled={paymentMethod === null}>Continue</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default PaymentScreen