import React, { useEffect, version } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { listProducts } from '../actions/productAction'
import Product from '../components/Product'
import { useParams, Link } from 'react-router-dom'
import { FiLoader } from "react-icons/fi"
import Paginate from '../components/Paginate'
import { BiLoaderAlt } from "react-icons/bi"
import SearchBox from '../components/SearchBox'
import ProductCaroussel from '../components/ProductCaroussel'
import { listProducts } from '../actions/productAction'
import Carousel from 'react-bootstrap/Carousel'
import Slider from '../components/Slider'
import Meta  from '../components/Meta'

const HomeScreen = () => {
    console.log('React Version', version)
    const { keyword, pageNumber = 1 } = useParams()
    console.log('keyword', keyword)
    console.log('pageNumber', pageNumber)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    return (
        <>  
            <Meta />
            {/* {!keyword ? <Slider /> : (
                <Link to='/'>
                    <span className='font-bold mb-8'>GO BACK</span>
                </Link>
            )} */}
            {keyword && (
                <Link to='/'>
                    <span className='font-bold mb-8'>GO BACK</span>
                </Link>
            )}
            <div className='w-10/12 mx-auto' style={{ minHeight: `calc(100vh - 8rem)`}}>
                <div className='w-full flex justify-between'>
                    <h1 className='text-4xl mt-6 mb-10'>Latest Products</h1>
                    <SearchBox />
                </div>
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
                <div className='w-full flex justify-center'>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </div>
            </div>
        </>
    )
}

export default HomeScreen


// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { listProducts } from '../actions/productAction'
// import Product from '../components/Product'
// import { useParams } from 'react-router-dom'
// import { FiLoader } from "react-icons/fi"
// import Paginate from '../components/Paginate'
// import { BiLoaderAlt } from "react-icons/bi"
// import SearchBox from '../components/SearchBox'

// const HomeScreen = () => {
//     const { keyword, pageNumber = 1 } = useParams()
//     console.log('keyword', keyword)
//     console.log('pageNumber', pageNumber)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(listProducts(keyword, pageNumber))
//     }, [dispatch, keyword, pageNumber])

//     const productList = useSelector(state => state.productList)
//     const { loading, error, products, page, pages } = productList

//     return (
//         <div className='w-10/12 mx-auto'>
//             <div className='w-full flex justify-between'>
//                 <h1 className='text-4xl mt-6 mb-10'>Latest Products</h1>
//                 <SearchBox />
//             </div>
//             {/* <h1 className='text-4xl mt-6 mb-10'>Latest Products</h1> */}
//             <div className={`w-full flex flex-wrap ${loading || error ? 'justify-center items-center' : 'justify-start'}`}>
//                 {loading ? (
//                     <FiLoader className='text-5xl rotating mt-36 mb-60' />
//                 ) : error ? (
//                     <h3 className='text-2xl mt-36 mb-60'>{error}</h3>
//                 ) : (
//                     products.map((product, i) => (
//                         <Product key={product._id} product={product} index={i} />
//                     ))
//                 )}
//             </div>
//             <div className='w-full flex justify-center'>
//                 <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
//             </div>
//         </div>
//     )
// }

// export default HomeScreen