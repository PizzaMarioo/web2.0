// src/components/CartPage.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeItemFromCart, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    if (!fullName || !address || !phoneNumber || !paymentMethod) {
      alert('Please fill out all fields and select a payment method');
    } else {
      alert('Order placed successfully!');
      clearCart();
      // Reset form fields
      setFullName('');
      setAddress('');
      setPhoneNumber('');
      setPaymentMethod('');
      setIsCheckout(false);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.name}</h3>
                {item.items && (
                  <div className="cart-item-details">
                    {Object.entries(item.items).map(([category, selectedItem], i) => (
                      <p key={i}>
                        {category}: {selectedItem.name}
                      </p>
                    ))}
                  </div>
                )}
                {item.toppings && item.toppings.length > 0 && (
                  <div className="cart-item-toppings">
                    <p>Extra Toppings:</p>
                    <ul>
                      {item.toppings.map((topping, i) => (
                        <li key={i}>{topping.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.sauces && item.sauces.length > 0 && (
                  <div className="cart-item-sauces">
                    <p>Extra Sauces:</p>
                    <ul>
                      {item.sauces.map((sauce, i) => (
                        <li key={i}>{sauce.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="price">€{item.price.toFixed(2)}</p>
                <button onClick={() => removeItemFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total Price: €{totalPrice.toFixed(2)}</h2>
          </div>
          {!isCheckout ? (
            <button className="checkout-button" onClick={() => setIsCheckout(true)}>
              Proceed to Checkout
            </button>
          ) : (
            <div className="checkout-form">
              <h2>Checkout</h2>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Payment Method:</label>
                <div className="payment-options">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Card
                  </label>
                </div>
              </div>
              <button className="place-order-button" onClick={handleCheckout}>
                Place Order
              </button>
              <button className="cancel-checkout-button" onClick={() => setIsCheckout(false)}>
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;