import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import Product from '../components/Product'

import { FiLoader } from "react-icons/fi"
import { BiLoaderAlt } from "react-icons/bi"

const HomeScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    return (
        <div className='w-10/12 mx-auto'>
            <h1 className='text-4xl mt-6 mb-10'>Latest Products</h1>
            <div className={`w-full flex flex-wrap ${loading || error ? 'justify-center items-center' : 'justify-start'}`}>
                {loading ? (
                    <FiLoader className='text-5xl rotating mt-36 mb-60' />
                ) : error ? (
                    <h3 className='text-2xl mt-36 mb-60'>{error}</h3>
                ) : (
                    products.map((product, i) => (
                        <Product key={product._id} product={product} index={i} />
                    ))
                )}
            </div>
        </div>
    )
}

export default HomeScreen