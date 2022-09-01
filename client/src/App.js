import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Drawer from "./components/Drawer"
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from "./screens/CartScreen"
import React from "react"
import RegisterScreen from "./screens/RegisterScreen"
import LoginScreen from "./screens/LoginScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import ProductCreateScreen from "./screens/ProductCreateScreen"
import OrderListScreen from "./screens/OrderListScreen"

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Drawer menuOpen={menuOpen} />
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route path='/cart'>
          <Route path=':id' element={<CartScreen />} />
          <Route path='' element={<CartScreen />} />
        </Route>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} exact />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} exact />
        <Route path='/admin/products/create' element={<ProductCreateScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/orderList' element={<OrderListScreen />} />
        <Route path='/search/:keyword' element={<HomeScreen />} exact />
        <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
        <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} exact />
        <Route path='/' element={<HomeScreen />} exact />
      </Routes>
    </>
  )
}

export default App;
