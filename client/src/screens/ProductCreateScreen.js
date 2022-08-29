import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, createProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const ProductCreateScreen = (props) => {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: productCreated
     } = productCreate
 
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
 
    const navigate = useNavigate()

    console.log('producproductCreated', productCreated)

    useEffect(() => {
        if(successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            navigate('/admin/productlist')
        }  
        console.log('productCreated', productCreated)
    }, [productCreated, dispatch, navigate, successCreate])
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProduct({
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock  
        })) 
    }

    return (
        <div className='mt-24 w-screen overflow-hidden lg:w-10/12 mx-auto'>
            <Link to='/admin/productlist'>
                    <span className='font-bold mb-8 ml-4 lg:ml-0'>GO BACK</span>
            </Link>
            { loadingCreate && <p>Loading ...</p> }
            { errorCreate && <p>{errorCreate}</p> }
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <div className="h-full w-10/12 lg:w-1/2 mx-auto my-8">
                    <h1 className="uppercase text-3xl font-semibold mb-6 text-center lg:text-left">Create Product</h1>
                    <form className="flex flex-col justify-center items-start" onSubmit={handleSubmit}>
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="name">name</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="name" 
                             type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="price">Price</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="price" 
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={e => setPrice(e.target.value)} />
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="image">Image</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="image" 
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={e => setImage(e.target.value)} />
                         <label
                        className="capitalize text-gray-600 font-semibold mb-1.5"
                        htmlFor="image-file">Choose File</label>
                        <input 
                            id="image-file"
                            type="file"
                            onChange={uploadFileHandler}/>
                        {uploading && <p>loading...</p>}
                        <label
                             className="capitalize text-gray-600 font-semibold mb-1.5 mt-4"
                            htmlFor="brand">Brand</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="brand" 
                            type="text"
                            placeholder="Enter brand"
                            value={brand}
                            onChange={e => setBrand(e.target.value)} />
                        <label
                             className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="countInStock">Count in stcok</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="countInStock" 
                            type="number"
                            placeholder="Enter stock number"
                            value={countInStock}
                            onChange={e => setCountInStock(e.target.value)} />
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="category">Category</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="category" 
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={e => setCategory(e.target.value)} />
                        <label
                            className="capitalize text-gray-600 font-semibold mb-1.5"
                            htmlFor="description">Description</label>
                        <textarea
                            className="w-full h-40 px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="description" 
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <button className="uppercase bg-black text-white font-semibold px-3 py-2 rounded mt-4 lg:mt-0 self-center lg:self-start">Create</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ProductCreateScreen