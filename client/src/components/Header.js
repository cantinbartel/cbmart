import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, Route, useHistory } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { BsFillPersonFill, BsFillCartFill } from "react-icons/bs"
import { IoCaretDownSharp } from "react-icons/io5"

const Header = ({menuOpen, setMenuOpen}) => {
    const [open, setOpen] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        console.log('Loged out')
    }
    const closeDropDown = () => {
        if (open) {
            setOpen(false)
        }
        console.log('close it')
    }

    const closeAdminDropDown = () => {
        if (adminOpen) {
            setAdminOpen(false)
        }
    }

    console.log('userInfo', userInfo)
    return (
        <div className='bg-graphit text-white h-20 w-full flex justify-center items-center fixed top-0 z-20' onClick={() => {closeDropDown(); closeAdminDropDown()}}>
            {/* <div 
                className='flex flex-col md:flex-row justify-center items-end cursor-pointer'
                onClick={() => navigate('/')}>
                <p className='text-3xl'>CB-Market.</p>
                <p className='text-base'>マーケット</p>
            </div>
            <div className="lg:hidden">
                <div className="w-8 flex flex-col" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? 'rotate-45 translate-y-1.5 transition' : 'transition'}`}></span>
                    <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? 'hidden transition' : 'transition'}`}></span>
                    <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? '-rotate-45 -translate-y-1 transition' : 'transition'}`}></span>
                </div>
            </div> */}
            <div className='flex justify-between items-center w-10/12' onClick={() => {closeDropDown(); closeAdminDropDown()}}>
                <div 
                    className='flex flex-col md:flex-row justify-center items-end cursor-pointer'
                    onClick={() => navigate('/')}>
                    <p className='text-3xl'>CB-Market.</p>
                    <p className='text-base'>マーケット</p>
                </div>
                <div className='hidden lg:flex justify-center items-center'>
                    <Link to='/cart'>
                        <div className='flex justify-center items-center cursor-pointer hover:text-gray-400'>
                            <BsFillCartFill className='text-lg mr-2' />
                            <p>CART</p>
                        </div>
                    </Link>
                    {userInfo ? (
                        <div className="relative ml-6 cursor-pointer" onClick={closeDropDown}>
                            <div
                                className="flex justify-start items-center"
                                onClick={() => {setOpen(true); closeAdminDropDown()}}>
                                <p className="text-lg uppercase mr-2">{userInfo.name}</p>
                                <IoCaretDownSharp className="text-xs" />
                            </div>
                            {open && (
                                <div className="absolute -left-2 border border-gray-200 text-gray-800 bg-white w-32 py-2">
                                    <Link className="w-full hover:bg-gray-100" to="/profile">
                                        <p className="w-full hover:bg-gray-100 pl-4">Profile</p>
                                    </Link>
                                    <div className="hover:bg-gray-100 w-full pl-4" onClick={logoutHandler}>
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/login'>
                            <div className='flex justify-center items-center ml-6 cursor-pointer hover:text-gray-400'>
                                <BsFillPersonFill className='text-xl mr-2' />
                                <p>SIGN IN</p>
                            </div>
                        </Link>
                    )}
                    { userInfo && userInfo.isAdmin && (
                        <div className="relative ml-6 cursor-pointer" onClick={closeDropDown}>
                            <div
                                className="flex justify-start items-center"
                                onClick={() => {setAdminOpen(true); closeDropDown()}}>
                                <p className="text-lg uppercase mr-2">Admin</p>
                                <IoCaretDownSharp className="text-xs" />
                            </div>
                            {adminOpen && (
                                <div className="absolute flex flex-col -left-2 border border-gray-200 text-gray-800 bg-white w-32 py-2">
                                    <Link to="/admin/userlist">
                                        <p className="hover:bg-gray-100 w-full pl-4">Users</p>
                                    </Link>
                                    <Link to="/admin/productlist">
                                        <p className="hover:bg-gray-100 w-full pl-4">Products</p>
                                    </Link>
                                    <Link to="/admin/orderlist">
                                        <p className="hover:bg-gray-100 w-full pl-4">Orders</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="block lg:hidden">
                    <div className="w-8 flex flex-col" onClick={() => setMenuOpen(!menuOpen)}>
                        <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? 'rotate-45 translate-y-1.5 transition' : 'transition'}`}></span>
                        <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? 'hidden transition' : 'transition'}`}></span>
                        <span className={`h-0.5 w-full bg-white my-1 ${menuOpen ? '-rotate-45 -translate-y-1 transition' : 'transition'}`}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
