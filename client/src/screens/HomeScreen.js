import React, { useState, useEffect } from 'react'
import Product from '../components/Product'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err.message))
    }, [])
    return (
        <div className='w-10/12 mx-auto'>
            <h1 className='text-4xl mt-6 mb-10'>Latest Products</h1>
            <div className='w-full flex flex-wrap justify-start'>
                {products.map((product, i) => (
                    <Product key={product._id} product={product} index={i} />
                ))}
            </div>
        </div>
    )
}

export default HomeScreen