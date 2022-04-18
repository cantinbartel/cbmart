import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { BsFillPersonFill, BsFillCartFill } from "react-icons/bs"


const Header = () => {
    return (
        <div className='bg-graphit text-white h-20 w-full flex justify-center items-center'>
            <div className='flex justify-between items-center w-10/12'>
                <div className='flex justify-center items-end'>
                    <p className='text-3xl'>CB-Market.</p>
                    <p className='text-base'>マーケット</p>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center'>
                        <BsFillCartFill className='text-white text-lg mr-2' />
                        <p>CART</p>
                    </div>
                    <div className='flex justify-center items-center ml-6'>
                        <BsFillPersonFill className='text-white text-xl mr-2' />
                        <p>SIGN IN</p>
                    </div>
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