// Base de datos de productos electrónicos NOVATECH (8 productos en total)
const products = [
  { id: 1, category: "laptops", name: "Laptop Ultrabook Pro 15", price: 899.00, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80" },
  { id: 2, category: "monitores", name: "Monitor Studio Display 27", price: 450.00, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80" },
  { id: 3, category: "perifericos", name: "Teclado Mecánico RGB Slim", price: 79.00, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80" },
  { id: 4, category: "perifericos", name: "Mouse Inalámbrico Gaming Pro", price: 49.00, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80" },
  { id: 5, category: "perifericos", name: "Audífonos Inalámbricos Hi-Fi", price: 120.00, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80" },
  { id: 6, category: "perifericos", name: "Silla Gamer Ergonómica RGB", price: 250.00, img: "https://versusperu.com/wp-content/uploads/2023/12/V10-N1.jpg" },
  { id: 7, category: "perifericos", name: "Cámara Web Logitech Ultra-Wide 4K", price: 65.00, img: "https://tse4.mm.bing.net/th/id/OIP.o1rvi7BLm3fcANwJvWKh-QHaF7?r=0&pid=Api&h=220&P=0" },
  { id: 8, category: "laptops", name: "Disco Duro SSD M.2 1TB 760 PRO", price: 110.00, img: "https://m.media-amazon.com/images/I/61JR-7uSBiL._AC_.jpg" }
];

let cart = [];

// Menú Móvil
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

function closeMenu() {
  if (navLinks) navLinks.classList.remove('active');
}

// Mostrar Productos
function renderProducts(items) {
  const container = document.getElementById('products-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  container.innerHTML = items.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <div>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-price">$${p.price.toFixed(2)}</p>
      </div>
      <button class="btn-add" onclick="addToCart(${p.id})">Agregar al carrito</button>
    </div>
  `).join('');
}

// Filtros y Búsqueda
function filterProducts() {
  const selectedCategory = document.getElementById('filter-select').value;
  if (selectedCategory === 'todos') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === selectedCategory);
    renderProducts(filtered);
  }
}

function filterByCategory(categoryName) {
  document.getElementById('filter-select').value = categoryName;
  filterProducts();
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

function searchProducts() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
}

// Lógica de Carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartUI();
  alert(`¡${product.name} ha sido añadido al carrito!`);
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  const itemsContainer = document.getElementById('cart-items');
  let total = 0;

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    itemsContainer.innerHTML = cart.map((item, index) => {
      total += item.price;
      return `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong><br>
            <small>$${item.price.toFixed(2)}</small>
          </div>
          <button style="background:red; color:white; border:none; padding: 2px 8px; border-radius:4px; cursor:pointer;" onclick="removeFromCart(${index})">✕</button>
        </div>
      `;
    }).join('');
  }

  document.getElementById('cart-total').innerText = total.toFixed(2);
  document.getElementById('checkout-total').innerText = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCartModal() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  document.getElementById('cart-view').classList.remove('hidden');
  document.getElementById('checkout-view').classList.add('hidden');
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Agrega al menos un producto para proceder al pago.");
    return;
  }
  document.getElementById('cart-view').classList.add('hidden');
  document.getElementById('checkout-view').classList.remove('hidden');
}

function backToCart() {
  document.getElementById('cart-view').classList.remove('hidden');
  document.getElementById('checkout-view').classList.add('hidden');
}

function processPayment(e) {
  e.preventDefault();
  alert("¡Pago procesado con éxito! Tu pedido ha sido registrado. Muchas gracias por comprar en NOVATECH.");
  cart = [];
  updateCartUI();
  toggleCartModal();
}

// Modales de Usuario
function openAuthModal() { document.getElementById('auth-modal').style.display = 'flex'; }
function closeAuthModal() { document.getElementById('auth-modal').style.display = 'none'; }

function switchAuthTab(tab) {
  if (tab === 'login') {
    document.getElementById('tab-login').classList.add('active');
    document.getElementById('tab-register').classList.remove('active');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
  } else {
    document.getElementById('tab-register').classList.add('active');
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
  }
}

function handleLogin(e) { e.preventDefault(); alert("¡Sesión iniciada correctamente!"); closeAuthModal(); }
function handleRegister(e) { e.preventDefault(); alert("¡Cuenta creada exitosamente!"); closeAuthModal(); }

function handleContact(e) {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
  e.target.reset();
}

function handleSubscribe(e) {
  e.preventDefault();
  alert("¡Gracias por suscribirte! Recibirás nuestras promociones exclusivas.");
  e.target.reset();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});