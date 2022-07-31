import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, updateProduct  } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants'


const ProductEditScreen = () => {
    const dispatch = useDispatch() 
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
     } = productUpdate
 
    const [name, setName] = useState(product?.name || '')
    const [price, setPrice] = useState(product?.price || 0)
    const [image, setImage] = useState(product?.image || '')
    const [brand, setBrand] = useState(product?.brand || '')
    const [category, setCategory] = useState(product?.category || '')
    const [countInStock, setCountInStock] = useState(product?.countInStock || 0)
    const [description, setDescription] = useState(product?.description || '')
    const [uploading, setUploading] = useState(false)
 
    const { id } = useParams()
    const navigate = useNavigate()
 
    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch({type: PRODUCT_DETAILS_SUCCESS})
            navigate('/admin/productlist')
        } else {
            if(!product?.name || product?._id != id) {
                dispatch(listProductDetails(id))
            } else { 
                setName(product.name) 
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setBrand(product.brand)
            } 
        }  
    }, [product, id, dispatch, navigate, successUpdate]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('Image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config) 
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
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
        <>
            <Link to='/admin/productlist'>
                    <span className='font-bold mb-8'>GO BACK</span>
            </Link>
            { loadingUpdate && <p>Loading ...</p> }
            { errorUpdate && <p>{errorUpdate}</p> }
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <div className="h-full w-1/3 mx-auto my-8">
                    <h1 className="uppercase text-3xl font-semibold mb-6">Edit Product</h1>
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
                             className="capitalize text-gray-600 font-semibold mb-1.5"
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
                        <input
                            className="w-full px-4 py-2 bg-gray-100 font-semibold mb-4"
                            id="description" 
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                        <button className="uppercase bg-black text-white font-semibold px-3 py-2 rounded">update</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default ProductEditScreen