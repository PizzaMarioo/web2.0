// src/context/DealsContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const DealsContext = createContext();

// Create the provider component
export const DealsProvider = ({ children }) => {
  const [deals, setDeals] = useState([
    { title: 'Any Pizza + Side + Drink', price: '€18' },
    { title: 'Any Pasta + Side + Drink', price: '€16' },
    { title: 'Any Large Kapsalon + Side + Drink', price: '€20' },
  ]);

  return (
    <DealsContext.Provider value={{ deals }}>
      {children}
    </DealsContext.Provider>
  );
};

// Custom hook to use the DealsContext
export const useDeals = () => useContext(DealsContext);
