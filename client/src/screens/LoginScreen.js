import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../actions/userActions'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (!userInfo) return
        if (userInfo) {
            navigate(redirect)
            console.log(redirect)
        }
    }, [navigate, userInfo, redirect])

    // useEffect(() => {
    //     console.log(userInfo)
    // }, [userInfo])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="h-full w-1/3 mx-auto my-8" style={{ height: `calc(100vh - 12rem)`}}>
            <h1 className="uppercase text-3xl font-semibold mb-6">Sign in</h1>
            <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                <label
                    className="capitalize text-gray-600 font-semibold mb-1.5"
                    htmlFor="email">email address</label>
                <input
                    className="w-full px-4 py-2 bg-gray-100 font-semibold"
                    id="email" type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <label
                    className="capitalize text-gray-600 font-semibold mb-1.5 mt-4"
                    htmlFor="password">password</label>
                <input
                    className="w-full px-4 py-2 mb-4 bg-gray-100 font-semibold"
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button className="uppercase bg-black text-white font-semibold px-3 py-2 rounded">sign in</button>
            </form>
            <div className="flex justify-start mt-2.5">
                <p className="capitalize mr-1 text-gray-800"> New customer?</p>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    <p className="capitalize font-semibold cursor-pointer hover:text-gray-800">Register</p>
                </Link>
            </div>
            {error && <p>{error}</p>}
            {loading && <p>Loading</p>}
        </div>
    )
}

export default LoginScreen