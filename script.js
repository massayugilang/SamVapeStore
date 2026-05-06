// Data Produk
const products = [
  {
    id: 1,
    name: "SMOK RPM 5 Pro",
    cat: "device",
    img: "images/SMOK RPM 5 Pro.jpg",
    price: 850000,
    desc: "Pod mod 80W dengan layar OLED. Compatible semua coil RPM.",
  },
  {
    id: 2,
    name: "Vaporesso XROS 3",
    cat: "device",
    img: "images/Vaporesso XROS 3.webp",
    price: 550000,
    desc: "Ultra-portable pod dengan teknologi COREX heating.",
  },
  {
    id: 3,
    name: "Saltnic Mango Ice 30ml",
    cat: "liquid",
    img: "images/Saltnic Mango Ice 30ml.png",
    price: 85000,
    desc: "Rasa mangga segar dengan sensasi dingin menyegarkan.",
  },
  {
    id: 4,
    name: "Freebase Strawberry 60ml",
    cat: "liquid",
    img: "images/Freebase Strawberry 60ml.webp",
    price: 110000,
    desc: "Rasa stroberi autentik untuk cloud chasing.",
  },
  {
    id: 5,
    name: "SMOK RPM 4 Pod",
    cat: "pod",
    img: "images/SMOK RPM 4 Pod.webp",
    price: 95000,
    desc: "Pod pengganti 5ml untuk perangkat SMOK RPM series.",
  },
  {
    id: 6,
    name: "Coil Meshed 0.2ohm",
    cat: "aksesoris",
    img: "images/Coil Meshed 0.2ohm.webp",
    price: 55000,
    desc: "Coil mesh premium untuk cloud maksimal dan rasa tajam.",
  },
  {
    id: 7,
    name: "Lost Vape Thelema Solo",
    cat: "device",
    img: "images/Lost Vape Thelema Solo.webp",
    price: 1250000,
    desc: "Single 18650 mod 100W dengan tampilan premium.",
  },
  {
    id: 8,
    name: "Saltnic Blueberry 30ml",
    cat: "liquid",
    img: "images/Saltnic Blueberry 30ml.webp",
    price: 85000,
    desc: "Blueberry segar dengan nic salt 30mg smooth hit.",
  },
];

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi Render
function renderFeatured() {
  const wrap = document.getElementById("featuredWrap");
  if (!wrap) return;

  const categories = [
    { key: "device", label: "VAPE DEVICES" },
    { key: "liquid", label: "LIQUID" },
    { key: "pod", label: "POD / CARTRIDGE" },
    { key: "aksesoris", label: "AKSESORIS" },
  ];

  wrap.innerHTML = categories.map(cat => {
    const items = products.filter(p => p.cat === cat.key).slice(0, 4);
    return `
      <div class="featured-block">
        <div class="featured-title">${cat.label}</div>
        <div class="grid">
          ${items.map(p => `
            <div class="prod-card">
              <img src="${p.img}" alt="${p.name}">
              <div class="prod-body">
                <div class="cat-tag">${p.cat.toUpperCase()}</div>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <div class="prod-price">Rp ${p.price.toLocaleString("id")} <span>/unit</span></div>
                <button class="btn btn-neon" onclick="addToCart(${p.id})" style="width:100%">+ KERANJANG</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>`;
  }).join("");
}

function renderCards(data, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = data.map(p => `
    <div class="prod-card">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="prod-body">
        <div class="cat-tag">${p.cat.toUpperCase()}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="prod-price">Rp ${p.price.toLocaleString("id")} <span>/unit</span></div>
        <button class="btn btn-neon" onclick="addToCart(${p.id})" style="width:100%;text-align:center;display:block;font-size:.78rem;padding:10px">+ KERANJANG</button>
      </div>
    </div>`).join("");
}

// Logika Keranjang
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const ex = cart.find(x => x.id === id);
  if (ex) ex.qty++;
  else cart.push({ ...p, qty: 1 });
  saveCart();
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  const count = cart.reduce((a, b) => a + b.qty, 0);
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = count;

  const ci = document.getElementById("cartItems");
  if (!ci) return;

  if (!cart.length) {
    ci.innerHTML = '<div class="cart-empty">KERANJANG KOSONG</div>';
    document.getElementById("cartTotal").style.display = "none";
    document.getElementById("checkoutBtn").style.display = "none";
    return;
  }

  ci.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img src="${i.img}" alt="${i.name}">
      <div class="cart-item-info">
        <h4>${i.name}</h4>
        <div class="c-price">Rp ${(i.price * i.qty).toLocaleString("id")} <span style="color:var(--gray);font-size:.75rem">x${i.qty}</span></div>
      </div>
      <span class="cart-item-del" onclick="removeFromCart(${i.id})">✖</span>
    </div>`).join("");

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const tp = document.getElementById("totalPrice");
  if (tp) tp.textContent = "Rp " + total.toLocaleString("id");

  document.getElementById("cartTotal").style.display = "flex";
  document.getElementById("checkoutBtn").style.display = "block";
}

// Navigasi & Sidebar
function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function toggleCart() {
  const panel = document.getElementById("cartPanel");
  panel.classList.contains("open") ? closeCart() : openCart();
}

// CHECKOUT LOGIC
function openCheckout() {
  closeCart();
  const modal = document.getElementById("checkoutModal");
  if (!modal) return;

  modal.classList.add("open");
  document.body.classList.add("no-scroll");
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  document.getElementById("sumTotal").textContent = "Rp " + total.toLocaleString("id");
}

function closeCheckout() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function processOrder(e) {
  e.preventDefault();

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const method = document.querySelector('input[name="payment"]:checked').value;
  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const orderId = "INV-" + Math.floor(Math.random() * 900000 + 100000);
  const date = new Date().toLocaleDateString("id-ID", {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Populate Receipt
  document.getElementById("receiptId").textContent = "#" + orderId;
  document.getElementById("receiptDate").textContent = date;
  document.getElementById("receiptName").textContent = name;
  document.getElementById("receiptPhone").textContent = phone;
  document.getElementById("receiptTotal").textContent = "Rp " + total.toLocaleString("id");

  const receiptItems = document.getElementById("receiptItems");
  receiptItems.innerHTML = cart.map(i => `
    <div class="receipt-item-row">
      <span>${i.name} (x${i.qty})</span>
      <span>Rp ${(i.price * i.qty).toLocaleString("id")}</span>
    </div>
  `).join("");

  // Show instructions
  document.getElementById("checkoutBody").style.display = "none";
  document.getElementById("successScreen").style.display = "block";
  document.getElementById("finalTotal").textContent = "Rp " + total.toLocaleString("id");

  let payDetail = "";
  if (method === "BCA") payDetail = "BCA (777218312)";
  else if (method === "DANA") payDetail = "DANA (0812-3456-7890)";
  else if (method === "GOPAY") payDetail = "GOPAY (0812-3456-7890)";

  document.getElementById("payMethodName").textContent = payDetail;

  // Scroll modal to top so user sees the success message
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.scrollTo({ top: 0, behavior: 'smooth' });

  // Clear cart
  cart = [];
  saveCart();
  updateCart();
}

function filterProd(cat, el) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  renderCards(cat === "all" ? products : products.filter(p => p.cat === cat), "allProducts");
}

// Inisialisasi
window.addEventListener("load", () => {
  updateCart(); // Sync cart on load
  renderFeatured();
  renderCards(products, "allProducts");

  setTimeout(() => {
    const l = document.getElementById("loader");
    if (l) {
      l.style.opacity = "0";
      setTimeout(() => l.remove(), 600);
    }
  }, 1000);
});
