const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/order'); // (If you have orders too)

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes); // (If order APIs exist)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error(err));

// Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});