// Grab elements
const menuSection = document.getElementById('menu');
const orderSummary = document.getElementById('orderSummary');
const orderForm = document.getElementById('orderForm');
const cartCount = document.getElementById('cartCount');
const themeToggle = document.getElementById('themeToggle');
const startOrderingBtn = document.getElementById('startOrderingBtn');

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const vegFilter = document.getElementById('vegFilter');

let menuItems = [];
let cart = [];

// Fetch menu from backend
async function fetchMenu() {
  try {
    const res = await fetch('http://localhost:5010/api/menu');
    const data = await res.json();
    
    // 🔥 Remove duplicates by 'name'
    const uniqueByName = [...new Map(data.map(item => [item.name.toLowerCase(), item])).values()];
    
    menuItems = uniqueByName;
    renderMenu();
  } catch (err) {
    console.error('Error fetching menu:', err);
  }
}

// Render Menu
function renderMenu() {
  menuSection.innerHTML = '';

  let filteredItems = menuItems;

  // Apply search filter
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  // Apply category filter
  if (categoryFilter.value !== 'All') {
    filteredItems = filteredItems.filter(item =>
      item.category === categoryFilter.value
    );
  }

  // Apply veg filter
  if (vegFilter.value !== 'All') {
    if (vegFilter.value === 'Vegetarian') {
      filteredItems = filteredItems.filter(item =>
        item.tags.includes('vegetarian')
      );
    } else if (vegFilter.value === 'Non-Vegetarian') {
      filteredItems = filteredItems.filter(item =>
        item.tags.includes('non-vegetarian')
      );
    }
  }

  filteredItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';

    const name = document.createElement('h3');
    name.textContent = item.name;

    const price = document.createElement('p');
    price.textContent = `₹${item.price}`;

    const ingredients = document.createElement('p');
    ingredients.textContent = item.ingredients.join(', ');

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => addToCart(item));

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(ingredients);
    card.appendChild(addButton);

    menuSection.appendChild(card);
  });
}

// Add to Cart
function addToCart(item) {
  const foundItem = cart.find(cartItem => cartItem.menuItemId === item._id);
  if (foundItem) {
    foundItem.quantity += 1;
  } else {
    cart.push({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }
  updateCartCount();
  renderCart();
}

// Render Cart
function renderCart() {
  orderSummary.innerHTML = '';

  if (cart.length === 0) {
    orderSummary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';

    const name = document.createElement('span');
    name.textContent = item.name;

    const quantityControl = document.createElement('div');
    quantityControl.className = 'quantity-control';

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.addEventListener('click', () => updateQuantity(item.menuItemId, -1));

    const quantity = document.createElement('span');
    quantity.textContent = item.quantity;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', () => updateQuantity(item.menuItemId, 1));

    quantityControl.appendChild(minusBtn);
    quantityControl.appendChild(quantity);
    quantityControl.appendChild(plusBtn);

    const price = document.createElement('span');
    price.textContent = `₹${item.price * item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => removeFromCart(item.menuItemId));

    div.appendChild(quantityControl);
    div.appendChild(name);
    div.appendChild(price);
    div.appendChild(removeBtn);

    orderSummary.appendChild(div);
  });

  // Total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement('div');
  totalDiv.style.textAlign = 'center';
  totalDiv.style.marginTop = '20px';
  totalDiv.innerHTML = `<h3>Total: ₹${total}</h3>`;
  orderSummary.appendChild(totalDiv);
}

// Update Quantity
function updateQuantity(id, change) {
  const item = cart.find(cartItem => cartItem.menuItemId === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(cartItem => cartItem.menuItemId !== id);
  }
  updateCartCount();
  renderCart();
}

// Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(cartItem => cartItem.menuItemId !== id);
  updateCartCount();
  renderCart();
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Submit order
orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const order = {
    customerName: name,
    address: address,
    phone: phone,
    items: cart.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      notes: ''
    }))
  };

  try {
    const res = await fetch('http://localhost:5010/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    if (res.ok) {
      alert('Order placed successfully!');
      cart = [];
      updateCartCount();
      renderCart();
      orderForm.reset();
    } else {
      alert('Failed to place order. Try again!');
    }
  } catch (error) {
    console.error(error);
    alert('Error placing order.');
  }
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Start Ordering Button Scroll
startOrderingBtn.addEventListener('click', () => {
  document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' });
});

// Filters
searchInput.addEventListener('input', renderMenu);
categoryFilter.addEventListener('change', renderMenu);
vegFilter.addEventListener('change', renderMenu);

// Load menu on page load
fetchMenu();