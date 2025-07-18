import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import PlaceOrder from "./pages/PlaceOrder";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        
        {/* Redirect old routes to new dynamic route */}
        <Route path="/men" element={<CategoryPage />} />
        <Route path="/women" element={<CategoryPage />} />
        <Route path="/kids" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;