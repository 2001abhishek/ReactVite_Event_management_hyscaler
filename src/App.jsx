import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Dashboard from './pages/admin/dashboard/Dashboard';
import Order from './pages/order/Order';
import PollSection from './pages/pollsection/PollSection';
import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ForgetPass from './pages/registration/ForgetPass';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';

function App() {
  
  return (
    <MyState><Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/order" element={
        <ProtectedRoute>
          <Order/>
        </ProtectedRoute>
      }/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/dashboard" element={
        <ProtectedRouteForAdmin>
          <Dashboard/>
        </ProtectedRouteForAdmin>
      }/>
      <Route path="/poll" element={<PollSection/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgetpass' element={<ForgetPass/>}/>
      <Route path="/productinfo/:id" element={<ProductInfo />} />
      <Route path= "/addproduct" element={
        <ProtectedRouteForAdmin>
          <AddProduct/>
        </ProtectedRouteForAdmin>
      }/>
      <Route path= "/updateproduct" element={
        <ProtectedRouteForAdmin>
          <UpdateProduct/>
        </ProtectedRouteForAdmin>
      }/>
      <Route path="/*" element={<Nopage/>}/>
      <Route path="/allproducts" element={<Allproducts />} />
    </Routes>
     <ToastContainer/>
  </Router>
  </MyState>
    
  )
}

export default App

//user

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem('user')) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}

//admin

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  const adminEmails = JSON.parse(import.meta.env.VITE_ADMIN_EMAILS);

  if (admin && admin.user && admin.user.email && adminEmails.includes(admin.user.email)) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
};
