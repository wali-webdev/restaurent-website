const header = document.getElementById("header");
const backTop = document.getElementById("backTop");
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");
const navOverlay = document.getElementById("navOverlay");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
  backTop.classList.toggle("show", window.scrollY > 400);
});
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

function toggleMenu(open) {
  const isOpen =
    open !== undefined ? open : !navList.classList.contains("active");
  navList.classList.toggle("active", isOpen);
  navOverlay.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
  menuToggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}
menuToggle.addEventListener("click", () => toggleMenu());
navOverlay.addEventListener("click", () => toggleMenu(false));
navList
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) toggleMenu(false);
});

const menuItems = [
  {
    id: 1,
    name: "Truffle Pasta",
    cat: "mains",
    desc: "Handmade pasta with black truffle and parmesan",
    price: 24,
    rating: 4.9,
    icon: "fa-bowl-food",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
    badge: "Chef's Pick",
  },
  {
    id: 2,
    name: "Caesar Salad",
    cat: "starters",
    desc: "Crisp romaine with grilled chicken and croutons",
    price: 14,
    rating: 4.7,
    icon: "fa-leaf",
    color: "linear-gradient(135deg,#10b981,#059669)",
    badge: null,
  },
  {
    id: 3,
    name: "Grilled Salmon",
    cat: "mains",
    desc: "Atlantic salmon with lemon butter sauce",
    price: 28,
    rating: 4.8,
    icon: "fa-fish",
    color: "linear-gradient(135deg,#06b6d4,#0891b2)",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    cat: "desserts",
    desc: "Warm chocolate cake with vanilla ice cream",
    price: 12,
    rating: 4.9,
    icon: "fa-ice-cream",
    color: "linear-gradient(135deg,#8b5cf6,#6366f1)",
    badge: "Best Seller",
  },
  {
    id: 5,
    name: "Spicy Wings",
    cat: "starters",
    desc: "Crispy chicken wings with our secret hot sauce",
    price: 16,
    rating: 4.6,
    icon: "fa-drumstick-bite",
    color: "linear-gradient(135deg,#ef4444,#f97316)",
    badge: null,
  },
  {
    id: 6,
    name: "Beef Steak",
    cat: "mains",
    desc: "Premium ribeye with garlic butter and herbs",
    price: 34,
    rating: 4.9,
    icon: "fa-drumstick-bite",
    color: "linear-gradient(135deg,#dc2626,#991b1b)",
    badge: "Premium",
  },
  {
    id: 7,
    name: "Tiramisu",
    cat: "desserts",
    desc: "Classic Italian coffee-flavored dessert",
    price: 10,
    rating: 4.8,
    icon: "fa-cake-candles",
    color: "linear-gradient(135deg,#ec4899,#f43f5e)",
    badge: null,
  },
  {
    id: 8,
    name: "Fresh Lemonade",
    cat: "drinks",
    desc: "Freshly squeezed lemons with mint",
    price: 6,
    rating: 4.7,
    icon: "fa-glass-water",
    color: "linear-gradient(135deg,#fbbf24,#f59e0b)",
    badge: null,
  },
  {
    id: 9,
    name: "Iced Coffee",
    cat: "drinks",
    desc: "Cold brew coffee with cream and ice",
    price: 7,
    rating: 4.8,
    icon: "fa-mug-hot",
    color: "linear-gradient(135deg,#78350f,#451a03)",
    badge: null,
  },
];

const menuGrid = document.getElementById("menuGrid");

function renderMenu(cat = "all") {
  menuGrid.innerHTML = "";
  const list =
    cat === "all" ? menuItems : menuItems.filter((m) => m.cat === cat);
  if (list.length === 0) {
    menuGrid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:40px;">No items in this category.</p>';
    return;
  }
  list.forEach((m, i) => {
    const stars = "★".repeat(Math.floor(m.rating));
    menuGrid.innerHTML += `
      <div class="menu-item" style="animation-delay:${i * 0.05}s">
        <div class="menu-item-img" style="background:${m.color}">
          ${m.badge ? `<span class="badge">${m.badge}</span>` : ""}
          <i class="fas ${m.icon}"></i>
        </div>
        <div class="menu-item-body">
          <h3>${m.name}</h3>
          <p>${m.desc}</p>
          <div class="menu-item-footer">
            <span class="menu-price">$${m.price}</span>
            <span class="menu-rating">${stars} <span style="color:#94a3b8;margin-left:4px;">(${m.rating})</span></span>
          </div>
        </div>
      </div>`;
  });
}

document.querySelectorAll(".menu-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".menu-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.cat);
  });
});

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target,
          target = +el.dataset.count;
        let n = 0;
        const step = target / 50;
        const tick = () => {
          n += step;
          if (n < target) {
            el.textContent = Math.floor(n) + (target === 10 ? "K+" : "+");
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + (target === 10 ? "K+" : "+");
          }
        };
        tick();
        counterObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll("[data-count]")
  .forEach((el) => counterObs.observe(el));

renderMenu();
