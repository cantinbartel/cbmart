import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from '../actions/productAction'
import { FiLoader } from "react-icons/fi"
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import Footer from '../components/Footer'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview  } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('Review Submitted ')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(id))
    }, [dispatch, id, successProductReview])

    const addToCart = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        // e.preventDefault()
        dispatch(createProductReview(id, { rating, comment }))
        alert('Thanks for your review')
    }

    return (
        <div className="w-screen">  
            <div className='flex flex-col items-start w-11/12 lg:w-10/12 mx-auto pt-24'>
                <Link to='/'>
                    <span className='font-bold mb-8'>GO BACK</span>
                </Link>
                {loading ? (
                    <FiLoader className='text-5xl rotating mt-36 mb-60 mx-auto' />
                ) : error ? (
                    <h3 className='text-2xl mt-36 mb-60'>{error}</h3>
                ) : (
                    <>  
                        <Meta title={product.name} />
                        <div className='flex flex-col lg:flex-row justify-start items-center lg:items-start pt-6 lg:mt-0'>
                            <img src={product.image} alt={product.name} className='w-full lg:w-4/10' />
                            <div className='flex flex-col justify-start items-start w-full lg:w-3/10 px-0 lg:px-6 mt-6 lg:mt-0'>
                                <p className='text-2xl font-semibold uppercase'>{product.name}</p>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                <p>{product.description}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center lg:items-start w-5/10 lg:w-3/10 text-lg mt-8 lg:mt-0' style={{paddingLeft: '4%'}}>
                                <p className='flex'>Price:&nbsp;<span className='font-semibold'>{product.price}</span>&nbsp;€</p>
                                <p className='my-3 lg:my-0'>Status: <span className='font-semibold'>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                                {product.countInStock > 0 && (
                                    <label>
                                        quantity:
                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map((x, i) => (
                                                <option key={i} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                <button
                                    className='uppercase bg-black text-white font-semibold rounded py-2 w-40 mt-8 lg:mt-4'
                                    onClick={addToCart}
                                    disabled={product.countInStock === 0}>Add to cart</button>
                            </div>
                        </div>
                        <div className='flex flex-col items-start w-full mt-12'>
                            <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start w-full lg:w-10/12'>
                                <div className='w-full lg:w-4/10'>
                                    <p className='text-2xl font-semibold uppercase mb-4'>Reviews</p>
                                    {product.reviews.length === 0 && <p>No Reviews</p>}
                                    {product.reviews.map((review, i) => (
                                        <React.Fragment key={review._id}>
                                            <div>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} />
                                                <p className='mb-2'>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </div>
                                            {i + 1 !== product.reviews.length && (
                                                <hr className='w-full border mt-2 mb-4' />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div>
                                {userInfo && (
                                    <>
                                        <p className='text-2xl font-semibold uppercase mb-4 mt-12 lg:mt-0'>Write a Customer Review</p>
                                        {errorProductReview && <p>{errorProductReview}</p>}
                                        <form onSubmit={submitHandler}>
                                            <p className='mb-2'>Rating</p>
                                            <div className='flex justify-start mb-4'>
                                            {[...Array(5)].map((star, index) => {
                                                if (index + 1 <= (hover || rating)) {
                                                    return (
                                                        <BsStarFill 
                                                            key={index + 1} 
                                                            style={{ color: '#f1c40f', fontSize: '1.5rem' }}
                                                            className='mr-1' 
                                                            onClick={() => setRating(index + 1)}
                                                            onMouseEnter={() => setHover(index + 1)}
                                                            onMouseLeave={() => setHover(rating)} />
                                                    )
                                                } else {
                                                    return (
                                                        <BsStar 
                                                            key={index + 1}
                                                            style={{ color: '#f1c40f', fontSize: '1.5rem' }}
                                                            className='mr-1'
                                                            onClick={() => setRating(index + 1)}
                                                            onMouseEnter={() => setHover(index + 1)}
                                                            onMouseLeave={() => setHover(rating)} />
                                                    )
                                                }  
                                            })}
                                            </div>
                                            <label>Comment</label>
                                            <textarea
                                                className='w-full border-2 mt-2 px-3 py-2'
                                                style={{minHeight: '8rem'}} 
                                                value={comment} 
                                                onChange={(e) => setComment(e.target.value)} />
                                            <button 
                                                type="submit"
                                                className='uppercase bg-black text-white font-semibold rounded py-2 w-40 mt-4 mb-6'>Submit</button>
                                        </form>
                                    </>
                                )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
            </div>
            <Footer />
        </div>
    )
}

export default ProductScreen
