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
import Dashboard from './vasanth/Dashboard';
import AdminAuth from './vasanth/AdminLogin';
import { ssrImportKey } from 'vite/module-runner';
import EmbedPopularProducts from "./pages/EmbedPopularProducts";
import PageTracker from "./components/PageTracker";
import MyBag from "./pages/MyBag";
import Login2 from "./Husk2/Login2";
import Dashboard2 from "./Husk2/Dashboard2";
import NotFound from './pages/NotFound'; // import 404 page
import About from './pages/About';
import HowToUse from './pages/HowToUse';
import Contact from './pages/Contact';









function App() {
  return (
    <div className="">
      <Router>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home/*" element={<NotFound />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/products/:category/*" element={<NotFound />} /> {/* ✅ invalid subpaths */}
          <Route path="/product/:asin" element={<ProductDetails />} />
          <Route path="/product/:asin/*" element={<NotFound />} />
          <Route path="/brand/:brandName" element={<BrandProducts />} />
          <Route path="/brand/:brandName/*" element={<NotFound />} />
          <Route path="/popular-product/:id" element={<PopularProduct />} />
          <Route path="/popular-product/:id/*" element={<NotFound />} />
          <Route path='/vasanth' element={<AdminAuth />} />
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/embed/popular-products" element={<EmbedPopularProducts />} />
          <Route path="/my-bag" element={<MyBag />} />
          <Route path="/husktwo/login" element={<Login2 />} />

          {/* Dashboard */}

          <Route path="/dashboard2" element={<Dashboard2 />} />
          {/* default route redirects to login */}
          <Route path="*" element={<Login2 />} />


        </Routes>
      </Router>

    </div>

  )
}

export default App