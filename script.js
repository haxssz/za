/* ===== APEX MOBILE — Vanilla JS ===== */
const WHATSAPP = "5511999999999";
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* PRODUCTS DATA */
const products = [
    {
        id: "ip17pm", brand: "apple", name: "iPhone 17 Pro Max", price: 11499, oldPrice: 12999,
        desc: "Titânio polido • 6.9\" ProMotion • Câmera periscópica 10x", image: "assets/17promax2.jpeg", badge: "Lançamento",
        specs: ["Tela ProMotion 6.9\" 120Hz", "Chip A19 Bionic", "Câmera tripla 48MP + zoom 10x", "Titânio polido aeroespacial", "Bateria até 32h de vídeo", "256GB"]
    },
    {
        id: "ip17pro", brand: "apple", name: "iPhone 17 Pro", price: 9499, oldPrice: 10499,
        desc: "Titânio • 6.3\" ProMotion • ProRes 4K", image: "assets/17pro.jpeg", badge: "Mais Vendido",
        specs: ["Tela ProMotion 6.3\" 120Hz", "Chip A19 Bionic", "Câmera tripla profissional", "Gravação ProRes 4K", "Estrutura em titânio", "256GB"]
    },
    {
        id: "ip17", brand: "apple", name: "iPhone 17", price: 6499,
        desc: "Alumínio • 6.1\" Super Retina • Câmera dupla", image: "assets/17.jpeg",
        specs: ["Tela Super Retina XDR 6.1\"", "Chip A19", "Câmera dupla 48MP", "Alumínio aeroespacial", "Dynamic Island", "128GB"]
    },
    {
        id: "ip16pm", brand: "apple", name: "iPhone 16 Pro Max", price: 8499, oldPrice: 9799,
        desc: "Titânio • 6.7\" ProMotion • Câmera 48MP", image: "assets/16promax.jpeg", badge: "Oferta",
        specs: ["Tela ProMotion 6.7\"", "Chip A18 Pro", "Câmera 48MP", "Titânio", "256GB"]
    },
    {
        id: "gt7pro", brand: "realme", name: "Realme GT 7 Pro", price: 4299, oldPrice: 4799,
        desc: "Snapdragon 8 Elite • 144Hz AMOLED • Carga 120W", image: "assets/gt7.jpeg", badge: "Lançamento",
        specs: ["Snapdragon 8 Elite", "AMOLED 144Hz 6.78\"", "Carregamento 120W", "Câmera Sony LYT-808", "Bateria 5800mAh", "512GB"]
    },
    {
        id: "r13proplus", brand: "realme", name: "Realme 13 Pro+", price: 2899,
        desc: "Câmera Sony 200MP • Curved Display • IA", image: "assets/13pro.jpeg", badge: "Mais Vendido",
        specs: ["Câmera Sony 200MP com IA", "Curved AMOLED 120Hz", "Snapdragon 7s Gen 3", "Carga rápida 80W", "Bateria 5200mAh", "512GB"]
    },
    {
        id: "narzo70", brand: "realme", name: "Realme Narzo 70", price: 1599, oldPrice: 1899,
        desc: "Dimensity 7050 • 120Hz • Bateria 5000mAh", image: "assets/narzo70.jpeg", badge: "Oferta",
        specs: ["Dimensity 7050", "AMOLED 120Hz", "Câmera 50MP Sony", "Bateria 5000mAh", "Carga rápida 45W", "256GB"]
    },
    {
        id: "r12", brand: "realme", name: "Realme 12 Pro", price: 1999,
        desc: "Snapdragon 6 Gen 1 • Câmera periscópica • Design premium", image: "assets/12pro.jpeg",
        specs: ["Snapdragon 6 Gen 1", "Câmera periscópica 32MP", "AMOLED 120Hz", "Bateria 5000mAh", "256GB"]
    },
];

/* HERO SLIDER */
const slidesData = [
    {
        image: "assets/17promax.jpeg", eyebrow: "Lançamento 2025", title: "iPhone 17 Pro Max",
        subtitle: "O ápice da inovação Apple. Tela ProMotion 6.9\", chip A19 Bionic e zoom periscópico de 10x. Titânio polido, performance sem limites."
    },
    {
        image: "assets/apple.jpeg", eyebrow: "Coleção Premium", title: "Apple. Realme.",
        subtitle: "As marcas mais desejadas reunidas em um só lugar — com preços que impressionam e garantia premium."
    },
    {
        image: "assets/hero-3.jpg", eyebrow: "Oferta exclusiva", title: "Parcele em 12x sem juros",
        subtitle: "Aprovação imediata, entrega rápida para todo Brasil e suporte humano via WhatsApp."
    },
];

const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
let currentSlide = 0;

slidesData.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "slide";
    div.style.setProperty("--bg-img", `url(${s.image})`);
    div.innerHTML = `
    <div class="slide-content">
      <span class="eyebrow">✦ ${s.eyebrow}</span>
      <h1>${s.title}</h1>
      <p>${s.subtitle}</p>
      <div class="slide-actions">
        <a class="btn btn-primary btn-lg" href="#produtos">Ver Produtos →</a>
        <a class="btn btn-whatsapp btn-lg" href="${waLink("Olá! Quero conhecer os celulares disponíveis.")}" target="_blank">💬 WhatsApp</a>
      </div>
    </div>
    <div class="slide-img"><img src="${s.image}" alt="${s.title}" loading="lazy" /></div>
  `;
    slidesEl.appendChild(div);

    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => goSlide(i));
    dotsEl.appendChild(dot);
});

function goSlide(i) {
    currentSlide = i;
    slidesEl.style.transform = `translateX(-${i * 100}%)`;
    document.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === i));
}
setInterval(() => goSlide((currentSlide + 1) % slidesData.length), 5500);

/* PRODUCTS RENDER */
const grid = document.getElementById("productsGrid");
function renderProducts(filter = "all") {
    grid.innerHTML = "";
    const list = filter === "all" ? products : products.filter(p => p.brand === filter);
    list.forEach(p => {
        const el = document.createElement("article");
        el.className = "card";
        el.innerHTML = `
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <div class="card-img"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price-row">
          <span class="price">${formatBRL(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatBRL(p.oldPrice)}</span>` : ""}
        </div>
        <div class="card-actions">
          <button class="btn btn-outline btn-sm" data-detail="${p.id}">Saiba mais</button>
          <a class="btn btn-whatsapp btn-sm" target="_blank" href="${waLink(`Olá! Tenho interesse no ${p.name} (${formatBRL(p.price)}).`)}">Comprar</a>
        </div>
      </div>
    `;
        grid.appendChild(el);
    });
    grid.querySelectorAll("[data-detail]").forEach(b => b.addEventListener("click", () => openModal(b.dataset.detail)));
}
renderProducts();

/* TABS */
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderProducts(tab.dataset.brand);
    });
});

/* MODAL */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    modalBody.innerHTML = `
    <div class="modal-grid">
      <img src="${p.image}" alt="${p.name}" />
      <div>
        <span class="eyebrow">${p.brand === "apple" ? "Apple" : "Realme"}</span>
        <h3>${p.name}</h3>
        <p class="muted">${p.desc}</p>
        <div class="price-row">
          <span class="price">${formatBRL(p.price)}</span>
          ${p.oldPrice ? `<span class="old-price">${formatBRL(p.oldPrice)}</span>` : ""}
        </div>
        <ul class="specs">${(p.specs || []).map(s => `<li>${s}</li>`).join("")}</ul>
        <div class="modal-actions">
          <a class="btn btn-whatsapp btn-lg" target="_blank" href="${waLink(`Olá! Quero comprar o ${p.name} (${formatBRL(p.price)}).`)}">💬 Comprar via WhatsApp</a>
          <a class="btn btn-outline btn-lg" target="_blank" href="${waLink(`Olá! Tenho dúvidas sobre o ${p.name}.`)}">Tirar dúvidas</a>
        </div>
      </div>
    </div>
  `;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}
function closeModal() { modal.classList.remove("open"); document.body.style.overflow = ""; }
modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* CONTACT FORM */
document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const model = document.getElementById("model").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name) return;
    const msg = `Olá! Sou ${name}.${phone ? ` Telefone: ${phone}.` : ""}${model ? ` Tenho interesse no ${model}.` : ""}${message ? `\n\n${message}` : ""}`;
    window.open(waLink(msg), "_blank");
    document.getElementById("feedback").textContent = `Obrigado, ${name}! Redirecionando para o WhatsApp...`;
    e.target.reset();
    setTimeout(() => document.getElementById("feedback").textContent = "", 6000);
});

/* MOBILE MENU */
const ham = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
ham.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* NAVBAR SCROLL */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 50 ? "rgba(5,5,5,0.92)" : "rgba(5,5,5,0.7)";
});

/* YEAR */
document.getElementById("year").textContent = new Date().getFullYear();
