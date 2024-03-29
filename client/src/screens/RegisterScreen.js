import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userActions'
import Footer from '../components/Footer'
import { FiLoader } from "react-icons/fi"

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (!userInfo) return
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <>
            <div className="h-screen overflow-hidden w-9/12 lg:w-1/3 mx-auto pt-24 mt-8 -mb-20">
                <h1 className="uppercase text-3xl font-semibold pt-6 lg:pt-0 mb-6 text-center lg:text-left">Sign up</h1>
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
                    <button className="uppercase bg-black text-white font-semibold px-3 py-2 rounded self-center lg:self-start mt-4 lg:mt-0">register</button>
                </form>
                <div className="flex justify-start mt-6 lg:mt-2.5">
                    <p className="capitalize mr-1 text-gray-800"> have an account?</p>
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        <p className="capitalize font-semibold cursor-pointer hover:text-gray-800">Login</p>
                    </Link>
                </div>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
                {loading && <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' />}
            </div>
            <Footer />
        </>
    )
}

export default RegisterScreen