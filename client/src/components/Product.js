import React from 'react';
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <div
            key={product._id}
            className={`w-full md:w-6/12 lg:w-3/12 px-1`}>
            <div className={`border border-gray-200 rounded-md px-4 py-4 mb-8 mx-1 w-full h-110`}>
            <Link to={`/product/${product._id}`}>
                <div className='w-full h-60 mx-auto' style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
            </Link>
            <Link to={`/product/${product._id}`}>
                <p className='mt-2'>{product.name}</p>
            </Link>
            <Rating className='text-lg' value={product.rating} text={`${product.numReviews} reviews`} />
            <p className='font-semibold'>{product.price}&nbsp;€</p>
            </div>
        </div>
    )
}

export default Product




// import React from 'react';
// import { Link } from 'react-router-dom'
// import Rating from './Rating'

// const Product = ({ product, index }) => {
//     const width = 23.5
//     const mr = (100 - (4 * width)) / 3
//     const styles = (index + 1) % 4 === 0 ? {} : { marginRight: `${mr}%` }
//     return (
//         <div
//             className={`border border-gray-200 rounded-md px-4 py-4 mb-8 w-3/12`}
//             style={{ ...styles, width: `${width}%` }}>
//             <Link to={`/product/${product._id}`}>
//                 <div className='w-full h-72 mx-auto' style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
//             </Link>
//             <Link to={`/product/${product._id}`}>
//                 <p className='mt-2'>{product.name}</p>
//             </Link>
//             <Rating className='text-lg' value={product.rating} text={`${product.numReviews} reviews`} />
//             <p className='font-semibold'>{product.price}&nbsp;€</p>
//         </div>
//     );
// };

// export default Product;