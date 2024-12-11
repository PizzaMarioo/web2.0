import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Menu.css';
import '../styles/style.css';

const Menu = () => {
  const { addItemToCart } = useCart();

  const categories = [
    { name: 'Pizzas', description: 'Delicious pizzas with a variety of toppings' },
    { name: 'Kapsalon', description: 'Loaded fries with meat, cheese, and more' },
    { name: 'Pastas', description: 'Pasta dishes with rich sauces and ingredients' },
    { name: 'Sides', description: 'Tasty side dishes to accompany your meal' },
    { name: 'Drinks', description: 'Refreshing beverages to quench your thirst' },
  ];

  const pizzas = [
    { name: 'Pizza BBQ', description: 'Kip, ham, salami, gehakt, kaas en tomaatsaus', price: 11.95 },
    { name: 'Pizza Creamy Chicken', description: 'Kip, ui, kaas en roomsaus', price: 11.95 },
    { name: 'Pizza Prosciutto', description: 'Ham, kaas en tomaatsaus', price: 9.95 },
    // Add all pizza items here...
  ];

  const kapsalon = [
    { name: 'Kapsalon Falafel', description: 'Large or Extra Large', price: 12.00 },
    // Add all kapsalon items here...
  ];

  const pastas = [
    { name: 'Pasta Bolognese', description: 'Pasta gebakken met bolognesesaus en knoflook', price: 9.95 },
    // Add all pasta items here...
  ];

  const sides = [
    { name: 'Look Brood Natuur', description: '4 pieces', price: 3.00 },
    // Add all side items here...
  ];

  const drinks = [
    { name: 'Coca Cola', description: '33 CL', price: 1.50 },
    { name: 'Sprite', description: '33 CL', price: 1.50 },
    // Add all drink items here...
  ];

  const toppings = [
    { name: 'Uien', price: 1.00 },
    { name: 'Paprika', price: 1.50 },
    // Add all toppings here...
  ];

  const sauces = [
    { name: 'Kaas Saus', price: 1.00 },
    { name: 'Ketchup', price: 1.00 },
    // Add all sauces here...
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToppings, setShowToppings] = useState(false);
  const [showSauces, setShowSauces] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      const totalPrice =
        selectedItem.price +
        selectedToppings.reduce((acc, topping) => acc + topping.price, 0) +
        selectedSauces.reduce((acc, sauce) => acc + sauce.price, 0);

      const itemWithExtras = {
        ...selectedItem,
        toppings: selectedToppings,
        sauces: selectedSauces,
        price: totalPrice,
      };
      addItemToCart(itemWithExtras);
      setSelectedItem(null);
      setSelectedToppings([]);
      setSelectedSauces([]);
      setShowToppings(false);
      setShowSauces(false);
    }
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

  const getCategoryItems = () => {
    switch (selectedCategory) {
      case 'Pizzas':
        return pizzas;
      case 'Kapsalon':
        return kapsalon;
      case 'Pastas':
        return pastas;
      case 'Sides':
        return sides;
      case 'Drinks':
        return drinks;
      default:
        return [];
    }
  };

  return (
    <div className="menu-page">
      <h1>Menu</h1>

      {!selectedCategory ? (
        // Display category selection
        <div className="menu-categories">
          {categories.map((category, index) => (
            <div key={index} className="menu-category red-frame" onClick={() => handleCategorySelect(category.name)}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      ) : (
        // Display items within the selected category
        <div className="menu-items">
          <button className="back-button" onClick={() => setSelectedCategory(null)}>Back to Categories</button>
          <h2>{selectedCategory}</h2>
          {getCategoryItems().map((item, index) => (
            <div key={index} className="menu-item red-frame">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">€{item.price.toFixed(2)}</p>
              {(selectedCategory === 'Pizzas' || selectedCategory === 'Kapsalon' || selectedCategory === 'Sides') && (
                <button onClick={() => setSelectedItem(item)}>Customize & Add to Cart</button>
              )}
              {(selectedCategory === 'Pastas' || selectedCategory === 'Drinks') && (
                <button onClick={() => addItemToCart(item)}>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="customization-modal">
          <h2>Customize {selectedItem.name}</h2>

          <div className="customize-options">
            {(selectedCategory === 'Pizzas' || selectedCategory === 'Kapsalon') && (
              <button onClick={() => setShowToppings((prev) => !prev)}>
                {showToppings ? 'Hide Toppings' : 'Extra Toppings'}
              </button>
            )}

            {(selectedCategory === 'Pizzas' || selectedCategory === 'Kapsalon' || selectedCategory === 'Sides') && (
              <button onClick={() => setShowSauces((prev) => !prev)}>
                {showSauces ? 'Hide Sauces' : 'Extra Sauces'}
              </button>
            )}
          </div>

          {showToppings && (
            <div className="toppings-section">
              <h3>Choose Toppings:</h3>
              {toppings.map((topping, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`topping-${index}`}
                    checked={selectedToppings.includes(topping)}
                    onChange={() => handleToppingChange(topping)}
                  />
                  <label htmlFor={`topping-${index}`}>{topping.name} (€{topping.price.toFixed(2)})</label>
                </div>
              ))}
            </div>
          )}

          {showSauces && (
            <div className="sauces-section">
              <h3>Choose Sauces:</h3>
              {sauces.map((sauce, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`sauce-${index}`}
                    checked={selectedSauces.includes(sauce)}
                    onChange={() => handleSauceChange(sauce)}
                  />
                  <label htmlFor={`sauce-${index}`}>{sauce.name} (€{sauce.price.toFixed(2)})</label>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={() => setSelectedItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Menu; 