import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from "./screens/CartScreen"
import React from "react"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/cart'>
          <Route path=':id' element={<CartScreen />} />
          <Route path='' element={<CartScreen />} />
        </Route>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
