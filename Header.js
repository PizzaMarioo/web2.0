// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* Ensure the logo points to the home page */}
        <Link to="/">Pizza Mario</Link> {/* This will now point to the home page */}
      </div>
      <nav>
        <Link to="/menu">Menu</Link>
        <Link to="/deals">Deals</Link> {/* Corrected link for the Deals Page */}
        <Link to="/cart">Cart</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Header;
