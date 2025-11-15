import React from 'react'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetails from "./pages/ProductDetails";
import BrandProducts from "./pages/BrandProducts";
import PopularProduct from "./pages/PopularProduct";
import Dashboard from './admin/Dashboard';
import AdminAuth from './admin/AdminLogin';
import { ssrImportKey } from 'vite/module-runner';
import EmbedPopularProducts from "./pages/EmbedPopularProducts";
import PageTracker from "./components/PageTracker";
import MyBag from "./pages/MyBag";









function App() {
  return (
    <div className="">
      <Router>
         <PageTracker />
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/home" element={<Home />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/product/:asin" element={<ProductDetails />} />
           <Route path="/brand/:brandName" element={<BrandProducts />} />
           <Route path="/popular-product/:id" element={<PopularProduct />} />
           <Route path='/admin' element={<AdminAuth/>}/>
           <Route path='/dashboard'element={<Dashboard/>}></Route>
          <Route path="/" element={<Home />} />
         <Route path="/embed/popular-products" element={<EmbedPopularProducts />} />
         <Route path="/my-bag" element={<MyBag />} />



      </Routes>
    </Router>
      
    </div>

  )
}

export default App