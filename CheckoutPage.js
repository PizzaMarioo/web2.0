// src/components/CheckoutPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cart } = useCart();

  // Calculate total price of all items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map((item, index) => (
              <div key={index} className="order-item">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                {item.toppings && item.toppings.length > 0 && (
                  <div className="extra-toppings">
                    <h4>Extra Toppings:</h4>
                    <ul>
                      {item.toppings.map((topping, i) => (
                        <li key={i}>{topping.name} (€{topping.price.toFixed(2)})</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="price">Price: €{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <h3>Total Price: €{totalPrice}</h3>
          <button className="confirm-order-button">Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
