const MenuItem = require('../models/MenuItem');

// Create a new menu item (single)
exports.createMenuItem = async (req, res) => {
    try {
        const menuItem = new MenuItem(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk create multiple menu items
exports.bulkCreateMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.insertMany(req.body);  // Insert array of items
        res.status(201).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};