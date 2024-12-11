import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import DealsPage from './components/DealsPage';
import Menu from './components/Menu';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import ContactPage from './components/ContactPage';
import OrderPage from './components/OrderPage';
import TrackOrderPage from './components/TrackOrderPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/" element={<DealsPage />} /> {/* Home page now points to the DealsPage */}
        <Route path="/deals" element={<DealsPage />} /> {/* Ensure the route for DealsPage exists */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order/:category" element={<OrderPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
