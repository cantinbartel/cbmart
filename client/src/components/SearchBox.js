import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyWord] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  // useEffect(() => {
  //     if (keyword.trim()) {
  //       navigate(`/search/${keyword}`)
  //     } else {
  //       navigate('/')
  //     }
  // }, [keyword])
  return (
    <form onSubmit={submitHandler}>
      <div className='flex'>
        <input 
        type='text'
        value={keyword}
        onChange={e => setKeyWord(e.target.value)}
        placeholder='Search Products...'
        className='mr-3' />
        <button>Search</button>
      </div>
    </form>
  )
}

export default SearchBox