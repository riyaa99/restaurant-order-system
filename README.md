# 🍔 QuickBite - Restaurant Ordering System

## 🚀 Project Overview

QuickBite is a web-based restaurant food ordering system where users can:
- Browse through an extensive menu.
- Search and filter dishes by category (Main Course, Snacks, Desserts, Beverages).
- Filter based on Vegetarian / Non-Vegetarian options.
- Add items to the cart, increase/decrease quantity.
- Place orders by providing name, address, and phone number.
- Toggle between Light Mode and Dark Mode for better user experience.

---

## 🏗️ Project Structure
RESTAURANT-ORDER-SYSTEM
├── controllers/
│   ├── menuController.js
│   └── orderController.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── models/
│   ├── MenuItem.js
│   └── Order.js
├── routes/
│   ├── menu.js
│   └── order.js
├── .env
├── package.json
├── server.js
└── README.md
---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
2. **Install Dependencies**
   npm install
3. **Setup Environment Variables**
Create a .env file in the root directory and add:
   MONGODB_URI=your_mongodb_connection_string
   PORT=5010
4. **Start thge Backend Server**
   node server.js
5. **Run Frontend**
	Open frontend/index.html in your browser manually.



Features: 
	🔍 Search and Filter Dishes
    🍕 Category Filter (Main Course, Snacks, Desserts, Beverages)
	🥦 Veg / Non-Veg Filter
	➕ Add to Cart, Update Quantity
	🛒 Cart and Total Price Display
	🌑 Light Mode / Dark Mode Toggle
	🚀 Place Order Form
	📱 Fully Responsive Design



🛠️ Tech Stack
	•	Frontend: HTML5, CSS3, JavaScript (Vanilla)
	•	Backend: Node.js, Express.js
	•	Database: MongoDB (NoSQL)



👩‍💻 Author
	•	Riya K 
	•	GitHub: https://github.com/riyaa99

📢 Notes
	•	Ensure the MongoDB URI is correct before starting.
	•	Make sure Node.js and npm are installed on your system.
	•	Recommended browser: Google Chrome / Safari / Edge.

