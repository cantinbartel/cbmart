import React from 'react'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return pages > 1 && (
    <div>
        {[...Array(pages).keys()].map(x => (
            <Link 
                key={x + 1} 
                to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` :`/page/${x + 1}` : `/admin/productlist/${x + 1}`}
                active={x + 1 === page}
                className={`${x + 1 === page ? 'bg-black text-white' : 'hover:bg-gray-100'} py-1 px-2`}>
                    {x + 1}
            </Link>
        ))}
    </div>
  )
}

export default Paginate