import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/homepage'
import ProductPage from './pages/Product/productpage'
import CartPage from './pages/Cart/cartpage'
import LoginPage from './pages/Login/loginpage'
import RegisterPage from './pages/Register/registerpage'

export default function AppRoute() {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/search/:searchStore' element={<HomePage />} />
    <Route path='/tag/:tag' element={<HomePage />} />
    <Route path='/product/:id' element={<ProductPage />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
  </Routes>
}
