import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { FaTrash } from 'react-icons/fa'
import emptyCart from '../assets/icons/empty-cart.png'
import Footer from '../components/Footer'

const CartScreen = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (id) dispatch(addToCart(id, qty))
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkout = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <>
        <div className="w-full lg:w-10/12 mx-auto font-semibold pt-24 overflow-hidden" style={{ minHeight: `calc(100vh - 4rem)`}}>
            <h1 className='text-3xl pt-6 mb-8 lg:mb-20 text-center lg:text-left'>SHOPPING CART</h1>
            {cartItems.length === 0 ? (
                <div className="flex flex-col justify-center items-center" style={{ height: '60vh' }}>
                    <p className="mb-6">Your shopping is empty :(</p>
                    <img 
                        className='h-20 pb-6'
                        src={emptyCart} />
                    <Link to='/'>
                        <button
                            className="uppercase bg-black text-white font-semibold rounded py-2 w-40"
                        >GO BACK</button>
                    </Link>
                </div>
                )
                : (
                    <div className="flex flex-col lg:flex-row flex-start items-center lg:items-start w-full">
                        <div className="w-full lg:w-6/10">
                            {cartItems.length > 0 && (
                                cartItems.map((item, i) => (
                                    <div key={item.product} className="w-full mx-auto">
                                        <div className={`flex flex-col lg:flex-row justify-start items-start w-full mt-4 ml-8 lg:ml-12 mx-auto ${i + 1 === cartItems.length ? 'mb-8' : 'mb-0'}`} key={item.product}>
                                            <img className="w-3/10 lg:w-1/10 rounded mr-6 mb-2 lg:mb-0" src={item.image} alt={item.name} />
                                            <Link to={`/roduct/${item.product}`}>
                                                <p className="w-full lg:w-36 mr-6 mb-2 lg:mb-0">{item.name}</p>
                                            </Link>
                                            <p className="self-start w-20 mr-6 mb-2 lg:mb-0">{item.price}€</p>
                                            <div className='flex lg:hidden'>
                                                <select
                                                    className="rounded bg-gray-100 w-12 h-8 mr-6"
                                                    value={item.qty}
                                                    // onChange={e => addToCartHandler(item.product, Number(e.target.value))}>
                                                    onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x, i) => (
                                                        <option key={i} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    className="text-graphit mt-1"
                                                    onClick={() => removeFromCartHandler(item.product)}>
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <select
                                                className="rounded bg-gray-100 w-12 h-8 mr-16 hidden lg:block"
                                                value={item.qty}
                                                // onChange={e => addToCartHandler(item.product, Number(e.target.value))}>
                                                onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map((x, i) => (
                                                    <option key={i} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="text-graphit mt-1 hidden lg:block"
                                                onClick={() => removeFromCartHandler(item.product)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <div>
                                            {i + 1 !== cartItems.length && (
                                                <hr className="border-gray-300 w-full lg:w-6/10 mt-6 ml-2" />
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div >
                        <div className="flex flex-col mx-auto lg:mx-0">
                            <div className="border border-gray-300 py-3 px-4">
                                <p className="font-semibold text-gray-600 text-xl uppercase">SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS</p>
                                <p className="text-gray-600 text-sm mt-3">{cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2)}€</p>
                            </div>
                            <div className="p-3" style={{ borderWidth: '0 1px 1px 1px', borderColor: 'rgb(209 213 219)' }}>
                                <button
                                    className='uppercase bg-black text-white text-sm font-semibold rounded py-2 w-full'
                                    disabled={cartItems.length === 0}
                                    onClick={checkout}>Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        <Footer />
        </>
    )
}

export default CartScreen


// const addToCartHandler = () => {
//     dispatch(addToCart(product._id, qty))
//     props.history.push('/cart')
// }