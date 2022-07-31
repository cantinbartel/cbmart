import React from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'

const Rating = ({ text, value, color = '#f1c40f', className }) => {
    const stars = [1, 2, 3, 4, 5].map((starNb, i) => {
        if (starNb == i + 1) {
            return value >= starNb
                ? <BsStarFill key={i} className='mr-1' />
                : value >= starNb - 0.5
                    ? <BsStarHalf key={i} className='mr-1' />
                    : <BsStar key={i} className='mr-1' />
        }
    })
    return (
        <div className='flex justify-start items-center w-10/12'>
            <div
                style={{ color }}
                className={`flex justify-start items-center ${className}`}>{stars}</div>
            <span className='ml-2'>{text && text}</span>
        </div>
    );
};

export default Rating;