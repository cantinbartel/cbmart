import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Paginate from '../components/Paginate'
import { 
    listProducts, 
    deleteProduct,
    createProduct
} from '../actions/productAction'
import { PRODUCT_CREATE_RESET  } from '../constants/productConstants'
import { FaTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import Footer from '../components/Footer'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pageNumber = 1 } = useParams()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete 

    const productCreate = useSelector(state => state.productCreate)
    console.log('productCreate', productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    console.log('createdProduct', createdProduct)
    
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin) { 
            navigate('/login')
        } 
        dispatch(listProducts('', pageNumber))
    }, [userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const createProductHandler = ()   => {
        dispatch(createProduct())
    }
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

  return (
    <>
        <div className="w-10/12 mx-auto pt-24" style={{ minHeight: `calc(100vh - 9.5rem)`}}>
            <div className="w-full flex justify-between items-center mb-8 lg:mb-0 pt-6">
                <h1 className="uppercase text-3xl font-semibold mb-6 mt-4 lg:mt-0">Products</h1>
                <button className="capitalize bg-black text-white py-2 px-4 rounded -mt-2 lg:-mt-0" onClick={() => navigate('/admin/products/create')}>
                    create product
                </button>
            </div>
            { errorDelete && <p>{errorDelete }</p> }
            { loadingDelete && <p>Loading... </p> }
            { errorCreate && <p>{errorCreate }</p> }
            { loadingCreate  && <p>Loading... </p> }
            { loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : (
                <>
                    <table className="w-full hidden lg:block">
                        <thead className="w-full border border-gray-200">
                            <tr className='py-4'>
                                <th className="px-2 py-3 text-left">ID</th>
                                <th className="px-2 text-left">NAME</th>
                                <th className="px-2 text-left">PRICE</th>
                                <th className="px-2 text-left">CATEGORY</th>
                                <th className="px-2 text-left">BRAND</th>
                                <th className="px-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(product => (
                                <tr key={product._id} className="bg-gray-100 hover:bg-gray-50 border border-gray-200">
                                    <td className="px-2 text-left py-2">{product._id}</td>
                                    <td className="px-2 text-left">{product.name}</td>
                                    <td className="px-2 text-left">${product.price}</td>
                                    <td className="px-2 text-left">{product.category}</td>
                                    <td className="px-2 text-left">{product.brand}</td>
                                    <td className="px-2 text-left">
                                        <Link to={`/admin/product/${product?._id}/edit`}>
                                            <button className="px-2 py-1 mx-auto cursor-pointer"><FiEdit /></button>
                                        </Link>
                                        <button 
                                            className="px-2 py-1 mx-auto cursor-pointer"
                                            onClick={() => deleteHandler(product._id)}><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="lg:hidden">
                        {console.log('products', products)}
                        {products?.map((product, i) => (
                            <div key={product._id}>
                                <div className='w-20 h-20 mx-auto mb-4' style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                                <p>ID: {product._id}</p>
                                <p>NAME: {product.name}</p>
                                <p>PRICE: {product.price}</p>
                                <p>CATEGORY: {product.category}</p>
                                <p>BRAND: {product.brand}</p>
                                <Link to={`/admin/product/${product?._id}/edit`}>
                                    <button className="px-2 py-1 text-xl mx-auto cursor-pointer mt-6 mr-2"><FiEdit /></button>
                                </Link>
                                <button 
                                    className="px-2 py-1 mx-auto text-xl cursor-pointer"
                                    onClick={() => deleteHandler(product._id)}><FaTrashAlt /></button>
                                {i + 1 !== products.length && (
                                    <hr className='w-full border mt-2 mb-8' />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='w-full flex justify-center mt-8 mb-12'>
                        <Paginate page={page} pages={pages} isAdmin={true} />
                    </div>
                </>
            )}
        </div>
        <Footer />
    </>
  )
}

export default ProductListScreen

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { 
//     listProducts, 
//     deleteProduct,
//     createProduct
// } from '../actions/productAction'
// import { PRODUCT_CREATE_RESET  } from '../constants/productConstants'
// import { FaTrashAlt } from 'react-icons/fa'
// import { FiEdit } from 'react-icons/fi'

// const ProductListScreen = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const productList = useSelector(state => state.productList)
//     const { loading, error, products } = productList

//     const productDelete = useSelector(state => state.productDelete)
//     const {
//         loading: loadingDelete,
//         error: errorDelete,
//         success: successDelete
//     } = productDelete 

//     const productCreate = useSelector(state => state.productCreate)
//     console.log('productCreate', productCreate)
//     const {
//         loading: loadingCreate,
//         error: errorCreate,
//         success: successCreate,
//         product: createdProduct
//     } = productCreate

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     console.log('createdProduct', createdProduct)
    
//     useEffect(() => {
//         dispatch({ type: PRODUCT_CREATE_RESET })
//         if(!userInfo.isAdmin) { 
//             navigate('/login')
//         } 
//         if(successCreate) {
//             // navigate(`/admin/product/1234/edit`)
//             navigate(`/admin/product/${createdProduct?._id}/edit`)
//         } else {
//             dispatch(listProducts())
//         }
//     }, [userInfo, successDelete, successCreate, createdProduct])

//     // useEffect(() => {
//     //     dispatch({ type: PRODUCT_CREATE_RESET })
//     //     if(userInfo && userInfo.isAdmin) { 
//     //         dispatch(listProducts())
//     //     } else {
//     //         navigate('/login')
//     //     }
//     // }, [userInfo, successDelete ])

//     const createProductHandler = ()   => {
//         dispatch(createProduct())
//     }
    
//     const deleteHandler = (id) => {
//         if(window.confirm('Are you sure?')) {
//             dispatch(deleteProduct(id))
//         }
//     }

//   return (
//     <div className="w-10/12 mx-auto mt-6" style={{ minHeight: `calc(100vh - 10rem)`}}>
//         <div className="w-full flex justify-between items-center">
//             <h1 className="uppercase text-3xl font-semibold mb-6">Products</h1>
//             <button className="capitalize bg-black text-white py-2 px-4 rounded" onClick={createProductHandler}>
//                 create product
//             </button>
//         </div>
//         { errorDelete && <p>{errorDelete }</p> }
//         { loadingDelete && <p>Loading... </p> }
//         { errorCreate && <p>{errorCreate }</p> }
//         { loadingCreate  && <p>Loading... </p> }
//         { loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : (
//             <table className="w-full">
//                 <thead className="w-full border border-gray-200">
//                     <tr className='py-4'>
//                         <th className="px-2 py-3 text-left">ID</th>
//                         <th className="px-2 text-left">NAME</th>
//                         <th className="px-2 text-left">PRICE</th>
//                         <th className="px-2 text-left">CATEGORY</th>
//                         <th className="px-2 text-left">BRAND</th>
//                         <th className="px-2"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products?.map(product => (
//                         <tr key={product._id} className="bg-gray-100 hover:bg-gray-50 border border-gray-200">
//                             <td className="px-2 text-left py-2">{product._id}</td>
//                             <td className="px-2 text-left">{product.name}</td>
//                             <td className="px-2 text-left">${product.price}</td>
//                             <td className="px-2 text-left">{product.category}</td>
//                             <td className="px-2 text-left">{product.brand}</td>
//                             <td className="px-2 text-left">
//                                 <Link to={`/admin/product/${product?._id}/edit`}>
//                                     <button className="px-2 py-1 mx-auto cursor-pointer"><FiEdit /></button>
//                                 </Link>
//                                 <button 
//                                     className="px-2 py-1 mx-auto cursor-pointer"
//                                     onClick={() => deleteHandler(product._id)}><FaTrashAlt /></button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         )}
//     </div>
//   )
// }

// export default ProductListScreen