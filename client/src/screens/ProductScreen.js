import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating'

const ProductScreen = (props) => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err.message))
    }, [])

    return (
        <div className='flex flex-col items-start w-10/12 mx-auto mt-12'>
            <Link to='/'>
                <span className='font-bold mb-8'>GO BACK</span>
            </Link>
            <div className='flex justify-start items-start'>
                <img src={product.image} alt={product.name} className='w-4/10' />
                <div className='flex flex-col justify-start items-start w-3/10 px-6'>
                    <p className='text-2xl font-semibold uppercase'>{product.name}</p>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    <p>{product.description}</p>
                </div>
                <div className='flex flex-col justify-start w-3/10 px-6'>
                    <p className='flex justify-between'>Price: {product.price}&nbsp;€</p>
                    <p>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    <button
                        className='uppercase bg-black text-white font-semibold rounded py-2 w-40'
                        disabled={product.countInStock === 0}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductScreen