const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: { type: Number, default: 1 },
        notes: { type: String }
    }],
    status: { 
        type: String, 
        enum: ['Placed', 'In Preparation', 'Ready', 'Delivered'], 
        default: 'Placed' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);