import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="w-full font-semibold text-gray-700 mt-6 mb-8">
            <ul className="flex justify-around items-center mx-auto capitalize">
                <li className="cursor-pointer">
                    {step1 ? <Link to='/login'>sign in</Link> : <div className="text-gray-300 cursor-not-allowed">sign in</div>}
                </li>
                <li className="cursor-pointer">
                    {step2 ? <Link to='/shipping'>shipping</Link> : <div className="text-gray-300 cursor-not-allowed">shipping</div>}
                </li>
                <li className="cursor-pointer">
                    {step3 ? <Link to='/payment'>payment</Link> : <div className="text-gray-300 cursor-not-allowed">payment</div>}
                </li>
                <li className="cursor-pointer">
                    {step4 ? <Link to='/placeorder'>place order</Link> : <div className="text-gray-300 cursor-not-allowed">place order</div>}
                </li>
            </ul>
        </nav>
    )
}

export default CheckoutSteps