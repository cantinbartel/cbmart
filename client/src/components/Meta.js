 import React from 'react'
 import { Helmet  } from 'react-helmet'
 
 const Meta = ({ title, description, keywords  }) => {
   return (
    <Helmet>
        <title>{title}</title>
        <metadata name='description' content={description} />
        <metadata name='keywords' content={keywords} />
    </Helmet>
   )
 }

Meta.defaultProps = {
    title: 'Welcome to CBMarket',
    description: 'Find the best electronics for cheap',
    keywords: 'electronics, buy electronics, cheap electronics'
}
 
 export default Meta