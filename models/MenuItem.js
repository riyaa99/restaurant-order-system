const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: [String],
    tags: [String],
    availability: { type: Boolean, default: true }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);