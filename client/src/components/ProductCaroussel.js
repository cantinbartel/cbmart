import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productAction'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel

// const ProductCaroussel = () => {
//     const dispatch = useDispatch()
//     const productTopRated = useSelector((state) => state.productTopRated)
//     const { loading, error, products } = productTopRated
//     useEffect(() => {
//         console.log('productTopRated', productTopRated)
//         dispatch(listTopProducts())
//     }, [dispatch])
//     console.log('products', products)
//   return loading ? <p>Loading...</p> : error ? <p>{error}</p> :( 
//     <div id="default-carousel" className="relative bg-red-100 w-6/12 top-20" data-carousel="static">
//         <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
//             {products.map((product, i) => {
//                 if (i == 1) {
//                     return (
//                         <div
//                         key={product._id}  
//                         className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" 
//                         data-carousel-item='active'>
//                             <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">{product.name} - {product.price}</span>
//                             {/* <img 
//                                 src={product.image} 
//                                 alt={product.name}
//                                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" /> */}
//                         </div>
//                     )
//                 } else {
//                     <div
//                         key={product._id}  
//                         className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0 z-20" 
//                         data-carousel-item>
//                             <span className="absolute text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:text-3xl dark:text-gray-800">{product.name} - {product.price}</span>
//                             {/* <img 
//                                 src={product.image} 
//                                 alt={product.name}
//                                 className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" /> */}
//                         </div>
//                 }
//             })}
//         </div>
//         <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
//             <button type="button" className="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
//             <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
//             <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
//         </div>
//         <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev="">
//             <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                 <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
//                 <span className="sr-only">Previous</span>
//             </span>
//         </button>
//         <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next="">
//             <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                 <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
//                 <span className="sr-only">Next</span>
//             </span>
//         </button>
//     </div>

// )}

// export default ProductCaroussel