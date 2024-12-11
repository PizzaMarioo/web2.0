// src/components/DealsPage.js 
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './DealsPage.css';

const DealsPage = () => {
  const { addItemToCart } = useCart();

  const deals = [
    {
      name: 'Pizza Deal',
      description: 'Any Pizza + Side + Drink for €18',
      options: ['Pizza', 'Side', 'Drink'],
      price: 18.0,
    },
    {
      name: 'Pasta Deal',
      description: 'Any Pasta + Side + Drink for €16',
      options: ['Pasta', 'Side', 'Drink'],
      price: 16.0,
    },
    {
      name: 'Kapsalon Deal',
      description: 'Any Large Kapsalon + Side + Drink for €20',
      options: ['Kapsalon', 'Side', 'Drink'],
      price: 20.0,
    },
  ];

  const [selectedDeal, setSelectedDeal] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);

  const pizzas = [
    { name: 'Pizza BBQ', price: 11.95 },
    { name: 'Pizza Margherita', price: 9.95 },
    // Add other pizza options...
  ];

  const sides = [
    { name: 'Look Brood Natuur', price: 3.0 },
    { name: 'Onion Rings', price: 5.0 },
    // Add other side options...
  ];

  const drinks = [
    { name: 'Coca Cola', price: 1.5 },
    { name: 'Fanta', price: 1.5 },
    // Add other drink options...
  ];

  const toppings = [
    { name: 'Uien', price: 1.0 },
    { name: 'Paprika', price: 1.5 },
    // Add other topping options...
  ];

  const sauces = [
    { name: 'Kaas Saus', price: 1.0 },
    { name: 'Ketchup', price: 1.0 },
    // Add other sauce options...
  ];

  const handleSelectDeal = (deal) => {
    setSelectedDeal(deal);
    setSelectedItems({});
    setSelectedToppings([]);
    setSelectedSauces([]);
  };

  const handleItemSelection = (category, item) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [category]: item,
    }));
  };

  const handleToppingChange = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    );
  };

  const handleSauceChange = (sauce) => {
    setSelectedSauces((prev) =>
      prev.includes(sauce) ? prev.filter((s) => s !== sauce) : [...prev, sauce]
    );
  };

  const handleAddToCart = () => {
    if (selectedDeal && Object.keys(selectedItems).length === selectedDeal.options.length) {
      const totalPrice =
        selectedDeal.price +
        selectedToppings.reduce((acc, topping) => acc + topping.price, 0) +
        selectedSauces.reduce((acc, sauce) => acc + sauce.price, 0);

      const itemWithExtras = {
        dealName: selectedDeal.name,
        items: selectedItems,
        toppings: selectedToppings,
        sauces: selectedSauces,
        price: totalPrice,
      };

      addItemToCart(itemWithExtras);
      setSelectedDeal(null);
      setSelectedItems({});
      setSelectedToppings([]);
      setSelectedSauces([]);
    } else {
      alert('Please select all items for the deal!');
    }
  };

  return (
    <div className="deals-page">
      <h1>Deals</h1>
      <div className="deals-items">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="red-frame"
            onClick={() => handleSelectDeal(deal)}
          >
            <h3>{deal.name}</h3>
            <p>{deal.description}</p>
            <p className="price">€{deal.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {selectedDeal && (
        <div className="customization-modal">
          <h2>Customize {selectedDeal.name}</h2>

          {selectedDeal.options.map((option) => (
            <div key={option} className="customization-section">
              <h3>Select {option}:</h3>
              <div className="options-list">
                {(option === 'Pizza' ? pizzas : option === 'Side' ? sides : drinks).map(
                  (item, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={`${option}-${index}`}
                        name={option}
                        value={item.name}
                        onChange={() => handleItemSelection(option, item)}
                      />
                      <label htmlFor={`${option}-${index}`}>
                        {item.name} (€{item.price.toFixed(2)})
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="customization-section">
            <h3>Choose Toppings:</h3>
            {toppings.map((topping, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`topping-${index}`}
                  onChange={() => handleToppingChange(topping)}
                />
                <label htmlFor={`topping-${index}`}>
                  {topping.name} (€{topping.price.toFixed(2)})
                </label>
              </div>
            ))}
          </div>

          <div className="customization-section">
            <h3>Choose Sauces:</h3>
            {sauces.map((sauce, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`sauce-${index}`}
                  onChange={() => handleSauceChange(sauce)}
                />
                <label htmlFor={`sauce-${index}`}>
                  {sauce.name} (€{sauce.price.toFixed(2)})
                </label>
              </div>
            ))}
          </div>

          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={() => setSelectedDeal(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
