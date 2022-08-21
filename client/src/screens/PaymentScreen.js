import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    useEffect(() => {
        console.log(paymentMethod)
    }, [paymentMethod])

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
        <div className="w-8/12 mx-auto" style={{ minHeight: `calc(100vh - 9.5rem)`}}>
            <CheckoutSteps step1 step2 step3 />
            <h1 className="font-semibold text-2xl uppercase mb-8">Payment Method</h1>
            <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                <label
                    className="capitalize text-gray-600 font-semibold mb-1.5"
                    htmlFor="paypal">Paypal</label>
                <input
                    className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                    id="paypal" type="checkbox"
                    // placeholder="Enter credentials"
                    // value={paymentMethod}
                    checked={paymentMethod === 'paypal'}
                    onChange={() => choosePaymentMethod('paypal')} />
                <label
                    className="capitalize text-gray-600 font-semibold mb-1.5"
                    htmlFor="stripe">Credit Card</label>
                <input
                    className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                    id="stripe" type="checkbox"
                    // placeholder="Enter credentials"
                    // value={paymentMethod}
                    checked={paymentMethod === 'stripe'}
                    onChange={() => choosePaymentMethod('stripe')} />
                <button
                    className="uppercase bg-black text-white font-semibold px-3 py-2 rounded"
                    type="submit"
                    disabled={paymentMethod === null}>Continue</button>
            </form>
        </div>
    )
}

export default PaymentScreen