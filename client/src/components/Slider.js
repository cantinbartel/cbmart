import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Slider.css'
import BtnSlider from './BtnSlider'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productAction'

export default function Slider() {

    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== products.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === products.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(products.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {products.map((product, index) => {
                return (
                    <div
                        key={product._id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name}/>
                        </Link>
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: products.length}).map((item, index) => (
                    <div 
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}></div>
                ))}
            </div>
        </div>
    )
}