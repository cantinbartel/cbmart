import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Link, useNavigate, Route, useHistory } from 'react-router-dom'
import { BsFillPersonFill, BsFillCartFill } from 'react-icons/bs'
import { IoCaretDownSharp } from 'react-icons/io5'
import { FiShoppingCart, FiUser, FiLogOut, FiChevronRight } from 'react-icons/fi'

const Drawer = ({menuOpen}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }
  return (
    <div 
        className={`lg:hidden fixed text-white h-screen pt-24 w-6/12 right-0 ${menuOpen ? 'transition overscroll-none' : 'translate-x-full transition'} cursor-pointer`} 
        // className={`lg:hidden fixed text-white h-screen -mt-4 w-6/12 right-0 ${menuOpen ? 'transition overscroll-none' : 'translate-x-full transition'} cursor-pointer`} 
        style={{ backgroundColor: 'hsl(210, 10%, 38%)'}}>
        <div className="flex flex-col mt-6 ml-8">
            {userInfo && <p className="text-lg uppercase mr-2 my-3 mt-12">{userInfo.name}</p>}
            <Link to='/cart'>
                <div className={`flex my-2 ${userInfo ? 'ml-1' : 'mt-12' }`}>
                    <FiShoppingCart className='text-lg mr-2' />
                    <p>CART</p>
                </div>
            </Link>
            {userInfo ? (
                <>
                    <Link className="flex my-2 ml-1" to="/profile">
                        <FiUser className='text-lg mr-2' />
                        <p>Profile</p>
                    </Link>
                    <div className="flex my-2 ml-1" onClick={logoutHandler}>
                        <FiLogOut className='text-lg mr-2' />
                        Logout
                    </div>
                </>
            ) : (
                <Link to='/login'>
                    <div className='flex my-2'>
                        <FiUser className='text-xl mr-2' />
                        <p>SIGN IN</p>
                    </div>
                </Link>
            )}
        </div>
        {userInfo && userInfo.isAdmin && (
            <div className="flex flex-col mt-6 ml-8">
                <p className="text-lg uppercase mr-2 my-3">Admin</p>
                <Link className="flex my-2" to="/admin/userlist">
                    <FiChevronRight className='text-xl' />
                    <p>Users</p>
                </Link>
                <Link className="flex mr-2 my-2" to="/admin/productlist">
                    <FiChevronRight className='text-xl' />
                    <p>Products</p>
                </Link>
                <Link className="flex mr-2 my-2" to="/admin/orderlist">
                    <FiChevronRight className='text-xl' />
                    <p>Orders</p>
                </Link>
            </div>
        )}
    </div>
  )
}

export default Drawer