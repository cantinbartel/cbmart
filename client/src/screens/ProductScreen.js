import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { productDails } from '../actions/productAction'
import { FiLoader } from "react-icons/fi"

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    console.log(id)

    useEffect(() => {
        dispatch(productDails(id))
    }, [])

    const addToCart = () => {
        navigate(`/cart/${id}?qty=${qty}`)
        console.log('added to cart')
    }

    return (
        <div className='flex flex-col items-start w-10/12 mx-auto mt-12'>
            <Link to='/'>
                <span className='font-bold mb-8'>GO BACK</span>
            </Link>
            {loading ? (
                <FiLoader className='text-5xl rotating mt-36 mb-60' />
            ) : error ? (
                <h3 className='text-2xl mt-36 mb-60'>{error}</h3>
            ) : (
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
                        {product.countInStock > 0 && (
                            <label>
                                quantity:
                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                        <button
                            className='uppercase bg-black text-white font-semibold rounded py-2 w-40'
                            onClick={addToCart}
                            disabled={product.countInStock === 0}>Add to cart</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductScreen