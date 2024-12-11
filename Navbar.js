import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure you create Navbar styles if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Deals</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
