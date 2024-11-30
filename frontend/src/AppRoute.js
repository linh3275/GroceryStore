import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/homepage'
import ProductPage from './pages/Product/productpage'
import CartPage from './pages/Cart/cartpage'
import LoginPage from './pages/Login/loginpage'
import RegisterPage from './pages/Register/registerpage'
import AuthRoute from './components/authroute/authroute'
import CheckoutPage from './pages/CheckOut/Checkout'
import PaymentPage from './pages/Payment/payment'
import ProfilePage from './pages/Profile/profilepage'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminRoute from './components/authroute/adminroute'
import ProductManagementPage from './pages/ProductManagement/productmanagementpage'
import ProductEdit from './pages/ProductManagement/productedit'
import UserManagement from './pages/ManagementPage/UserManagement/userManagement'
import UserEdit from './pages/ManagementPage/UserManagement/userEdit'
import OrderPage from './pages/Order/orderPage'
import OrderTrack from './pages/OrderTrack/orderTrack'

export default function AppRoute() {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/search/:searchStore' element={<HomePage />} />
    <Route path='/tag/:tag' element={<HomePage />} />
    <Route path='/product/:id' element={<ProductPage />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/checkout'
       element={
        <AuthRoute>
          <CheckoutPage />
        </AuthRoute>
        }
    />
    <Route path='/payment'
       element={
        <AuthRoute>
          <PaymentPage />
        </AuthRoute>
        }
    />
    <Route path='/track/:orderId'
       element={
        <AuthRoute>
          <OrderTrack />
        </AuthRoute>
        }
    />
    <Route path='/orders'
       element={
        <AuthRoute>
          <OrderPage />
        </AuthRoute>
        }
    />
    <Route path='/profile'
       element={
        <AuthRoute>
          <ProfilePage />
        </AuthRoute>
        }
    />
    <Route path='/dashboard'
       element={
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
        }
    />;
    <Route path='/admin/products/:searchTerm?'
       element={
        <AdminRoute>
          <ProductManagementPage />
        </AdminRoute>
        }
    />
    <Route path='/admin/addProduct'
       element={
        <AdminRoute>
          <ProductEdit />
        </AdminRoute>
        }
    />
    <Route path='/admin/editProduct/:productId'
       element={
        <AdminRoute>
          <ProductEdit />
        </AdminRoute>
        }
    />
    <Route path='/admin/users/:searchTerm?'
       element={
        <AdminRoute>
          <UserManagement />
        </AdminRoute>
        }
    />
    <Route path='/admin/editUser/:userId'
       element={
        <AdminRoute>
          <UserEdit />
        </AdminRoute>
        }
    />
  </Routes>
}
