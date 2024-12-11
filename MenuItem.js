const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },  // Pizzas, Kapsalon, etc.
  options: [{ type: String }]  // Options for items like toppings
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
