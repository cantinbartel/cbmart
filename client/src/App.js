import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from "./screens/CartScreen"
import React from "react"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart'>
          <Route path=':id' element={<CartScreen />} />
          <Route path='' element={<CartScreen />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;
