import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <>
            <div className="w-8/12 mx-auto pt-24" style={{ height: `calc(100vh - 4rem)`}}>
                <CheckoutSteps step1 step2 className="hidden md:block" />
                <h1 className="font-semibold text-2xl uppercase mb-8 pt-6 lg:pt-0">Shipping</h1>
                <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="address">address</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="address" type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={e => setAddress(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="city">city</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="city" type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={e => setCity(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="postalCode">postal code</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="postalCode" type="text"
                        placeholder="Enter postalCode"
                        value={postalCode}
                        required
                        onChange={e => setPostalCode(e.target.value)} />
                    <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="country">country</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                        id="country" type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={e => setCountry(e.target.value)} />
                    <button
                        className="uppercase bg-black text-white font-semibold px-3 py-2 rounded mt-6 lg:mt-4 mx-auto md:mx-0"
                        type="submit">Continue</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ShippingScreen