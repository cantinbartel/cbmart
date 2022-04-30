import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { FaShoppingBag } from 'react-icons/fa'
import { BsFillPersonFill, BsFillCartFill } from "react-icons/bs"
import { IoCaretDownSharp } from "react-icons/io5"

const Header = () => {
    const [open, setOpen] = useState(false)
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
    return (
        <div className='bg-graphit text-white h-20 w-full flex justify-center items-center' onClick={closeDropDown}>
            <div className='flex justify-between items-center w-10/12' onClick={closeDropDown}>
                <div className='flex justify-center items-end'>
                    <p className='text-3xl'>CB-Market.</p>
                    <p className='text-base'>マーケット</p>
                </div>
                <div className='flex justify-center items-center'>
                    <Link to='/cart'>
                        <div className='flex justify-center items-center cursor-pointer hover:text-gray-400'>
                            <BsFillCartFill className='text-lg mr-2' />
                            <p>CART</p>
                        </div>
                    </Link>
                    {userInfo ? (
                        <div className="relative ml-6" onClick={closeDropDown}>
                            <div
                                className="flex justify-start items-center"
                                onClick={() => setOpen(true)}>
                                <p className="text-lg uppercase mr-2">{userInfo.name}</p>
                                <IoCaretDownSharp className="text-xs" />
                            </div>
                            {open && (
                                <div className="absolute -left-2 border border-gray-200 text-gray-800 bg-white w-32 px-4 py-2">
                                    <Link className="hover:bg-gray-100 w-full" to="/profile">
                                        Profile
                                    </Link>
                                    <div className="hover:bg-gray-100 w-full" onClick={logoutHandler}>
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
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className='bg-graphit text-white h-20 flex flex-start items-center'>
    //         <div className='flex justify-center items-end'>
    //             <p className='ml-16 text-2xl'>CB-Market.</p>
    //             <p className='text-base'>マーケット</p>
    //         </div>
    //         <div className=''>
    //             <div className='flex justify-center items-center'>
    //                 <BsFillCartFill className='text-white text-lg' />
    //                 <p>CART</p>
    //             </div>
    //             <div className='flex justify-center items-center'>
    //                 <BsFillPersonFill className='text-white text-lg' />
    //                 <p>SIGN IN</p>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Header