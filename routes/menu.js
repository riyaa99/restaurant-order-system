const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// POST /api/menu - create a single menu item
router.post('/', menuController.createMenuItem);

// POST /api/menu/bulk - create multiple menu items at once
router.post('/bulk', menuController.bulkCreateMenuItems);

// GET /api/menu - get all menu items
router.get('/', menuController.getMenuItems);

// PUT /api/menu/:id - update a menu item by ID
router.put('/:id', menuController.updateMenuItem);

// DELETE /api/menu/:id - delete a menu item by ID
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
