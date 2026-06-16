// ==========================================
// Smart Interio Consolidated JavaScript File
// ==========================================

// Global variables / functions first (so they are available immediately)

// --- 1. Global Page Switcher (2D/3D) & General Utilities ---
let total = 49496;

function show2D() {
  const roomImage = document.getElementById("roomImage");
  const btn2d = document.getElementById("btn2d");
  const btn3d = document.getElementById("btn3d");
  if (roomImage) roomImage.src = "img/plainroom2d.png";
  if (btn2d) btn2d.classList.add("active-btn");
  if (btn3d) btn3d.classList.remove("active-btn");
}

function show3D() {
  const roomImage = document.getElementById("roomImage");
  const btn2d = document.getElementById("btn2d");
  const btn3d = document.getElementById("btn3d");
  if (roomImage) roomImage.src = "img/room.png";
  if (btn3d) btn3d.classList.add("active-btn");
  if (btn2d) btn2d.classList.remove("active-btn");
}

function removeitem(button, price) {
  const item = button.closest(".room-item, .room-item4");
  if (item) {
    item.remove();
  }
  total -= price;
  const totalpriceEl = document.getElementById("totalprice");
  if (totalpriceEl) {
    totalpriceEl.textContent = "₹" + total;
  }
  const remainingItems = document.querySelectorAll(".room-item, .room-item4");
  if (remainingItems.length === 0) {
    const emptyMsg = document.getElementById("emptymessage");
    if (emptyMsg) {
      emptyMsg.style.display = "block";
    }
  }
}

function addsofa() { alert("Sofa Added"); }
function addlamp() { alert("Lamp Added"); }
function addtable() { alert("Table Added"); }
function addpouf() { alert("Pouf Added"); }

window.show2D = show2D;
window.show3D = show3D;
window.removeitem = removeitem;
window.addsofa = addsofa;
window.addlamp = addlamp;
window.addtable = addtable;
window.addpouf = addpouf;

// --- 2. Room Builder Database & Global State ---
const products = {
  sofa: [
    { id: "luna_sofa", name: "Luna 3 Seater Sofa", price: 49999, img: "img/luna-sofa.png", colors: ["#D7C4B7", "#8E5A36", "#545454", "#FAF6F0"], isWishlist: false },
    { id: "monti_sofa", name: "Monti Leather Sofa", price: 59999, img: "img/montisofa.png", colors: ["#8E5A36", "#545454", "#D7C4B7", "#C49A7E"], isWishlist: false },
    { id: "viera_sofa", name: "Viera Fabric Sofa", price: 44999, img: "img/vierasofa.png", colors: ["#545454", "#8E5A36", "#D7C4B7", "#C49A7E"], isWishlist: false },
    { id: "haven_sofa", name: "Haven 3 Seater Sofa", price: 39999, img: "img/havensofa.png", colors: ["#1E3A8A", "#545454", "#8E5A36", "#D7C4B7"], isWishlist: false },
    { id: "western_sofa", name: "Western Corner Sofa", price: 64999, img: "img/westernsofa.png", colors: ["#FAF6F0", "#545454", "#8E5A36", "#D7C4B7"], isWishlist: false },
  ],
  chair: [
    { id: "armchair", name: "Modern Armchair", price: 18750, img: "img/armchair.png", colors: ["#D7C4B7", "#8E5A36", "#545454"], isWishlist: false },
    { id: "dining_chair", name: "Dining Chair", price: 12500, img: "img/dining-chair.png", colors: ["#8E5A36", "#545454"], isWishlist: false },
  ],
  table: [
    { id: "coffee_table", name: "Coffee Table", price: 19999, img: "img/coffee-table.png", colors: ["#8E5A36", "#FAF6F0"], isWishlist: false },
    { id: "dining_table", name: "Dining Table", price: 21600, img: "img/dining-table.png", colors: ["#8E5A36", "#545454"], isWishlist: false },
    { id: "black_side_table", name: "Black Side Table", price: 12000, img: "img/black-side-table.png", colors: ["#1A1A1A", "#545454"], isWishlist: false },
  ],
  bed: [
    { id: "cozy_bed", name: "Cozy Bedroom Bed", price: 43900, img: "img/cozybed.png", colors: ["#D7C4B7", "#FAF6F0"], isWishlist: false },
    { id: "luxury_bed", name: "Luxury King Bed", price: 47000, img: "img/luxurybed.png", colors: ["#8E5A36", "#1A1A1A"], isWishlist: false },
  ],
  storage: [
    { id: "storage_cabinet", name: "Wooden Storage Cabinet", price: 28000, img: "img/storage.svg", colors: ["#8E5A36", "#545454"], isWishlist: false },
  ],
  decor: [
    { id: "fabric_pouf", name: "Fabric Pouf", price: 5999, img: "img/pouf.png", colors: ["#FAF6F0", "#C49A7E", "#545454"], isWishlist: false },
  ],
  lighting: [
    { id: "floor_lamp", name: "Floor Lamp", price: 6479, img: "img/floorlamp.png", colors: ["#FAF6F0", "#1A1A1A"], isWishlist: false },
  ],
  rug: [
    { id: "classic_rug", name: "Rug", price: 8999, img: "img/rug.png", colors: ["#D7C4B7", "#C49A7E"], isWishlist: false },
  ],
  plants: [
    { id: "potted_plant", name: "Potted Plant", price: 2499, img: "img/plant.svg", colors: ["#1E3A8A"], isWishlist: false },
  ],
  wall_art: [
    { id: "modern_painting", name: "Western Wall Art", price: 7500, img: "img/art.svg", colors: ["#FAF6F0"], isWishlist: false },
  ],
};

const templates = {
  modern_living: {
    name: "Modern Living Room",
    img: "img/modernliving.png",
    items: [
      { id: "western_sofa", name: "Western Corner Sofa", img: "img/westernsofa.png", price: 64999 },
      { id: "coffee_table", name: "Coffee Table", img: "img/coffee-table.png", price: 19999 },
      { id: "fabric_pouf", name: "Fabric Pouf", img: "img/pouf.png", price: 5999 },
      { id: "classic_rug", name: "Rug", img: "img/rug.png", price: 8999 },
      { id: "floor_lamp", name: "Floor Lamp", img: "img/floorlamp.png", price: 6479 },
    ],
  },
  cozy_bed: {
    name: "Cozy Bedroom",
    img: "img/cozybed.png",
    items: [
      { id: "cozy_bed", name: "Cozy Bedroom Bed", img: "img/cozybed.png", price: 43900 },
      { id: "floor_lamp", name: "Floor Lamp", img: "img/floorlamp.png", price: 6479 },
      { id: "black_side_table", name: "Black Side Table", img: "img/black-side-table.png", price: 12000 },
    ],
  },
  minimal_office: {
    name: "Minimal Office",
    img: "img/office.png",
    items: [
      { id: "armchair", name: "Modern Armchair", img: "img/armchair.png", price: 18750 },
      { id: "black_side_table", name: "Black Side Table", img: "img/black-side-table.png", price: 12000 },
      { id: "potted_plant", name: "Potted Plant", img: "img/plant.svg", price: 2499 },
    ],
  },
  classical_dining: {
    name: "Classical Dining",
    img: "img/classicaldining.png",
    items: [
      { id: "dining_table", name: "Dining Table", img: "img/dining-table.png", price: 21600 },
      { id: "dining_chair", name: "Dining Chair", img: "img/dining-chair.png", price: 12500 },
    ],
  },
  luxury_bed: {
    name: "Luxury Bedroom",
    img: "img/luxurybed.png",
    items: [
      { id: "luxury_bed", name: "Luxury King Bed", img: "img/luxurybed.png", price: 47000 },
      { id: "floor_lamp", name: "Floor Lamp", img: "img/floorlamp.png", price: 6479 },
    ],
  },
  scandinavian_living: {
    name: "Scandinavian Living",
    img: "img/scandinavian.png",
    items: [
      { id: "luna_sofa", name: "Luna 3 Seater Sofa", img: "img/luna-sofa.png", price: 49999 },
      { id: "coffee_table", name: "Coffee Table", img: "img/coffee-table.png", price: 19999 },
      { id: "classic_rug", name: "Rug", img: "img/rug.png", price: 8999 },
      { id: "potted_plant", name: "Potted Plant", img: "img/plant.svg", price: 2499 },
    ],
  },
};

let currentCategory = "sofa";
let currentStyle = "Modern";
let currentSize = "Medium";
let currentThemeColor = "Tan";
let myRoomItems = [];
let history = [];
let historyIndex = -1;
let cartItemsCount = 0;

// Expose builder functions globally for inline HTML event attributes
window.scrollProducts = function(direction) {
  const productsTrack = document.getElementById("products-track");
  if (productsTrack) {
    const scrollAmount = 300;
    productsTrack.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
};

window.changeCardColor = function(prodId, color) {
  showToast(`Selected color ${color} for item!`, "info");
  const cardImg = document.getElementById(`img-${prodId}`);
  if (cardImg) {
    cardImg.style.opacity = "0.7";
    setTimeout(() => { cardImg.style.opacity = "1"; }, 150);
  }
};

window.toggleWishlist = function(btn, prodId) {
  const categoryList = products[currentCategory] || [];
  const prod = categoryList.find((p) => p.id === prodId);
  if (prod) {
    prod.isWishlist = !prod.isWishlist;
    if (prod.isWishlist) {
      btn.classList.add("active");
      showToast(`${prod.name} added to wishlist!`, "success");
    } else {
      btn.classList.remove("active");
      showToast(`${prod.name} removed from wishlist.`, "info");
    }
  }
};

window.removeFromRoom = function(index) {
  const removedItem = myRoomItems[index];
  myRoomItems.splice(index, 1);
  pushState(myRoomItems);
  renderMyRoom();
  if (removedItem) {
    showToast(`Removed ${removedItem.name} from room layout.`, "info");
  }
};

window.addToRoom = function(prodId) {
  let foundProduct = null;
  for (const cat in products) {
    const prod = products[cat].find((p) => p.id === prodId);
    if (prod) {
      foundProduct = prod;
      break;
    }
  }
  if (foundProduct) {
    myRoomItems.push({
      id: foundProduct.id,
      name: foundProduct.name,
      img: foundProduct.img,
      price: foundProduct.price,
    });
    pushState(myRoomItems);
    renderMyRoom();
    showToast(`Added ${foundProduct.name} to room layout!`, "success");
  }
};

window.applyTemplate = function(tempId) {
  const template = templates[tempId];
  const designedRoomImg = document.getElementById("designed-room-img");
  const designedRoomBadge = document.getElementById("designed-room-badge");
  const sliderRange = document.getElementById("slider-range");
  if (template) {
    if (designedRoomImg) designedRoomImg.src = template.img;
    if (designedRoomBadge) designedRoomBadge.textContent = template.name.toUpperCase();
    myRoomItems = JSON.parse(JSON.stringify(template.items));
    pushState(myRoomItems);
    renderMyRoom();
    if (window.updateRoomImagesWidth) {
      window.updateRoomImagesWidth();
    }
    if (sliderRange) {
      sliderRange.value = 40;
      sliderRange.dispatchEvent(new Event("input"));
    }
    showToast(`Applied ${template.name} template!`, "success");
    const comparisonSlider = document.getElementById("comparison-slider");
    if (comparisonSlider) {
      comparisonSlider.scrollIntoView({ behavior: "smooth" });
    }
  }
};

window.saveDesign = function() {
  showToast("Design layout saved successfully to your profile!", "success");
};

window.shareDesign = function() {
  const dummyUrl = window.location.href + "?room=" + btoa(JSON.stringify(myRoomItems.map((i) => i.id)));
  navigator.clipboard.writeText(dummyUrl)
    .then(() => { showToast("Shareable design link copied to clipboard!", "success"); })
    .catch(() => { showToast("Design link prepared for sharing!", "success"); });
};

window.addRoomToCart = function() {
  if (myRoomItems.length === 0) {
    showToast("Cannot add empty room to cart.", "warning");
    return;
  }
  let totalCost = 0;
  myRoomItems.forEach((i) => (totalCost += i.price));
  cartItemsCount += myRoomItems.length;
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.textContent = cartItemsCount;
    cartBadge.classList.remove("d-none");
  }
  showToast(`Added ${myRoomItems.length} items to your cart! Total: ₹ ${totalCost.toLocaleString("en-IN")}`, "success");
};

window.undo = function() {
  if (historyIndex > 0) {
    historyIndex--;
    myRoomItems = JSON.parse(JSON.stringify(history[historyIndex]));
    renderMyRoom();
    updateUndoRedoButtons();
    showToast("Undone last change.", "info");
  }
};

window.redo = function() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    myRoomItems = JSON.parse(JSON.stringify(history[historyIndex]));
    renderMyRoom();
    updateUndoRedoButtons();
    showToast("Redone change.", "info");
  }
};

window.resetRoom = function() {
  if (myRoomItems.length === 0) {
    showToast("Room is already empty.", "info");
    return;
  }
  myRoomItems = [];
  pushState(myRoomItems);
  renderMyRoom();
  showToast("Room layout reset.", "warning");
};

window.startFromEmpty = function() {
  myRoomItems = [];
  pushState(myRoomItems);
  renderMyRoom();
  const designedRoomImg = document.getElementById("designed-room-img");
  const designedRoomBadge = document.getElementById("designed-room-badge");
  if (designedRoomImg) designedRoomImg.src = "img/emptyroom.png";
  if (designedRoomBadge) designedRoomBadge.textContent = "EMPTY ROOM";
  if (window.updateRoomImagesWidth) {
    window.updateRoomImagesWidth();
  }
  showToast("Room cleared. Designing from scratch!", "warning");
};

window.scrollToTemplates = function() {
  const section = document.getElementById("templates-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

// Builder local helper functions
function pushState(newItems) {
  history = history.slice(0, historyIndex + 1);
  history.push(JSON.parse(JSON.stringify(newItems)));
  historyIndex++;
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById("btn-undo");
  const redoBtn = document.getElementById("btn-redo");
  if (undoBtn) undoBtn.disabled = historyIndex <= 0;
  if (redoBtn) redoBtn.disabled = historyIndex >= history.length - 1;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const bgClass =
    type === "success"
      ? "bg-success"
      : type === "warning"
        ? "bg-warning text-dark"
        : type === "info"
          ? "bg-info text-dark"
          : "bg-dark";
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white ${bgClass} border-0 show m-2`;
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";
  toast.innerHTML = `
          <div class="d-flex">
              <div class="toast-body fw-medium">
                  ${message}
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
      `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderProducts() {
  const productsTrack = document.getElementById("products-track");
  if (!productsTrack) return;
  productsTrack.innerHTML = "";
  const list = products[currentCategory] || [];
  if (list.length === 0) {
    productsTrack.innerHTML = '<p class="text-muted w-100 text-center py-4">No products found in this category.</p>';
    return;
  }
  list.forEach((prod) => {
    const colorsHtml = prod.colors
      .map(
        (col) => `
              <span class="swatch-dot" style="background-color: ${col};" onclick="event.stopPropagation(); changeCardColor('${prod.id}', '${col}')"></span>
          `
      )
      .join("");
    const heartIconClass = prod.isWishlist ? "active" : "";
    const card = document.createElement("div");
    card.className = "product-card-builder";
    card.onclick = () => addToRoom(prod.id);
    card.innerHTML = `
              <button class="wishlist-btn ${heartIconClass}" onclick="event.stopPropagation(); toggleWishlist(this, '${prod.id}')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
              </button>
              <div class="product-img-box">
                  <img src="${prod.img}" alt="${prod.name}" id="img-${prod.id}">
              </div>
              <h4 class="product-title">${prod.name}</h4>
              <p class="product-price">₹ ${prod.price.toLocaleString("en-IN")}</p>
              <div class="product-swatches">
                  ${colorsHtml}
              </div>
          `;
    productsTrack.appendChild(card);
  });
}

function renderMyRoom() {
  const myRoomTrack = document.getElementById("my-room-track");
  const myRoomCountLabel = document.getElementById("my-room-count");
  if (!myRoomTrack) return;
  myRoomTrack.innerHTML = "";
  myRoomItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "my-room-item-box";
    itemDiv.innerHTML = `
              <button class="remove-btn" onclick="removeFromRoom(${index})" title="Remove item">✕</button>
              <div class="item-thumb">
                  <img src="${item.img}" alt="${item.name}">
              </div>
              <span class="item-name">${item.name}</span>
          `;
    myRoomTrack.appendChild(itemDiv);
  });

  const addMoreDiv = document.createElement("div");
  addMoreDiv.className = "my-room-item-box add-more-box";
  addMoreDiv.onclick = () => {
    const categoryToolbar = document.getElementById("category-toolbar");
    if (categoryToolbar) {
      categoryToolbar.scrollIntoView({ behavior: "smooth" });
    }
    showToast("Choose a category to browse and add items!", "info");
  };
  addMoreDiv.innerHTML = `
          <div class="add-circle">
              <span>+</span>
          </div>
          <span class="item-name">Add More</span>
      `;
  myRoomTrack.appendChild(addMoreDiv);

  if (myRoomCountLabel) {
    myRoomCountLabel.textContent = `(${myRoomItems.length} Items)`;
  }
}

// jQuery / DOM Ready block
if (typeof jQuery !== 'undefined') {
  $(document).ready(function () {
    
    // --- FROM ORIGINAL style.js ---
    
    // 1. Mobile Menu Open/Close Toggle
    $(".mobile-menu").click(function () {
      $(this).toggleClass("clicked");
      $(".nav2-mobile").toggleClass("menu");
    });

    // 1b. Close mobile menu when a nav link is clicked
    $(".nav-ul-mobile a").click(function () {
      $(".mobile-menu").removeClass("clicked");
      $(".nav2-mobile").removeClass("menu");
    });

    // 2. Mobile Search Input Toggle
    $(".mobile-search").click(function (e) {
      e.preventDefault();
      $(".mobile-input").toggleClass("active");
    });

    // 3. Product Gallery Switcher with Smooth Transition
    $(".gallery img").click(function () {
      const newSrc = $(this).attr("src");
      const mainImg = $(".detaile-hero-image img");
      if (mainImg.length > 0 && mainImg.attr("src") !== newSrc) {
        mainImg.fadeOut(200, function () {
          mainImg.attr("src", newSrc);
          mainImg.fadeIn(200);
        });
      }
      $(".gallery img").removeClass("active-thumb");
      $(this).addClass("active-thumb");
    });
    $(".gallery img").first().addClass("active-thumb");

    // 4. Color Swatch Selector
    $(".detaile-colors .color").click(function () {
      $(".detaile-colors .color").removeClass("active-color");
      $(this).addClass("active-color");
    });

    // 5. Size Selection Toggle
    $(".detaile-sizes button").click(function () {
      $(".detaile-sizes button").removeClass("active-size");
      $(this).addClass("active-size");
    });

    // 6. Quantity Controls (generic and robust)
    $(".quantity button").click(function (e) {
      e.preventDefault();
      const parent = $(this).closest(".quantity");
      let valueEl = parent.find(".qty-value");
      if (valueEl.length === 0) {
        valueEl = parent.find("button").eq(1);
      }
      let qty = parseInt(valueEl.text() || valueEl.val()) || 1;
      if ($(this).hasClass("qty-plus") || $(this).text() === "+") {
        qty++;
      } else if ($(this).hasClass("qty-minus") || $(this).text() === "-") {
        if (qty > 1) {
          qty--;
        }
      }
      if (valueEl.is("input")) {
        valueEl.val(qty);
      } else {
        valueEl.text(qty);
      }
    });

    // 7. Shop Filters Toggle for Mobile
    $(".filter-toggle-btn").click(function () {
      $(".left-card").slideToggle(300);
    });

    // --- FROM ORIGINAL cart.js ---
    
    // Only run if cart elements exist
    if ($(".cart-item").length > 0 || $(".empty-cart-view").length > 0) {
      let appliedPromo = "";
      let discountPercent = 0;
      const shippingThreshold = 40000;

      function formatCurrency(amount) {
        return "₹" + Math.round(amount).toLocaleString("en-IN");
      }

      function parsePrice(text) {
        return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
      }

      function updateCartTotals() {
        let subtotal = 0;
        const cartItems = $(".cart-item");
        cartItems.each(function () {
          const lineTotalText = $(this).find(".line-total").text();
          subtotal += parsePrice(lineTotalText);
        });

        const discount = subtotal * discountPercent;
        let shipping = 0;
        if (subtotal > 0 && subtotal < shippingThreshold) {
          shipping = 499;
          $(".shipping-cost").removeClass("green-text").text(formatCurrency(shipping));
        } else if (subtotal >= shippingThreshold) {
          shipping = 0;
          $(".shipping-cost").addClass("green-text").text("Free");
        } else {
          shipping = 0;
          $(".shipping-cost").addClass("green-text").text("Free");
        }

        const grandTotal = subtotal - discount + shipping;
        $(".cart-subtotal").text(formatCurrency(subtotal));
        if (discount === 0) {
          $(".cart-discount").addClass("green-text").text("₹0");
        } else {
          $(".cart-discount").removeClass("green-text").text("-" + formatCurrency(discount));
        }
        $(".cart-total").text(formatCurrency(grandTotal));

        if (cartItems.length === 0) {
          $(".cart-box").fadeOut(300, function () {
            $(".empty-cart-view").fadeIn(300);
          });
        } else {
          $(".cart-box").show();
          $(".empty-cart-view").hide();
        }
      }

      $(".cart-item").each(function () {
        const item = $(this);
        const unitPrice = parsePrice(item.find(".unit-price").text());

        // Clear generic handlers from style.js to prevent double triggers
        item.find(".quantity button").off("click");

        item.find(".qty-plus").click(function () {
          let qtyVal = parseInt(item.find(".qty-val").text()) || 1;
          qtyVal++;
          item.find(".qty-val").text(qtyVal);
          const lineTotal = qtyVal * unitPrice;
          item.find(".line-total").text(formatCurrency(lineTotal));
          updateCartTotals();
        });

        item.find(".qty-minus").click(function () {
          let qtyVal = parseInt(item.find(".qty-val").text()) || 1;
          if (qtyVal > 1) {
            qtyVal--;
            item.find(".qty-val").text(qtyVal);
            const lineTotal = qtyVal * unitPrice;
            item.find(".line-total").text(formatCurrency(lineTotal));
            updateCartTotals();
          }
        });

        item.find(".remove-btn").click(function () {
          item.css({
            transition: "all 0.5s ease",
            transform: "scale(0.8)",
            opacity: "0"
          });
          setTimeout(function () {
            item.remove();
            updateCartTotals();
            showNotification("Item removed from cart", "info");
          }, 400);
        });
      });

      $(".clear-cart").click(function () {
        if (confirm("Are you sure you want to clear your shopping cart?")) {
          const items = $(".cart-item");
          items.css({
            transition: "all 0.5s ease",
            transform: "scale(0.8)",
            opacity: "0"
          });
          setTimeout(function () {
            items.remove();
            updateCartTotals();
            showNotification("Cart cleared", "warning");
          }, 400);
        }
      });

      $("#apply-promo").click(function () {
        const promoCodeInput = $("#promo-code").val().trim().toUpperCase();
        const msgEl = $(".promo-msg");
        if (promoCodeInput === "") {
          msgEl.removeClass("success").addClass("error").text("Please enter a coupon code.");
          return;
        }
        if (promoCodeInput === "SMART20") {
          appliedPromo = "SMART20";
          discountPercent = 0.20;
          msgEl.removeClass("error").addClass("success").text("Coupon applied! 20% discount applied to your order.");
          updateCartTotals();
          showNotification("20% Discount Applied!", "success");
        } else if (promoCodeInput === "WELCOME10") {
          appliedPromo = "WELCOME10";
          discountPercent = 0.10;
          msgEl.removeClass("error").addClass("success").text("Coupon applied! 10% discount applied to your order.");
          updateCartTotals();
          showNotification("10% Discount Applied!", "success");
        } else {
          msgEl.removeClass("success").addClass("error").text("Invalid coupon code. Try SMART20 or WELCOME10.");
        }
      });

      $(".proceed-btn").click(function () {
        const subtotalText = $(".cart-subtotal").text();
        const subtotalVal = parsePrice(subtotalText);
        if (subtotalVal === 0) {
          showNotification("Your cart is empty. Cannot checkout.", "error");
          return;
        }
        showCheckoutModal(subtotalVal);
      });

      function showNotification(message, type = "success") {
        $(".cart-toast").remove();
        let bgColor = "#8b5e3c";
        if (type === "error") bgColor = "#c62828";
        if (type === "info") bgColor = "#5c3d2e";
        if (type === "warning") bgColor = "#e65100";
        const toast = $(`<div class="cart-toast" style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${bgColor};
          color: #fff;
          padding: 14px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          z-index: 99999;
          font-weight: 600;
          font-size: 14px;
          display: none;
          align-items: center;
          gap: 10px;
        ">
          <span>${message}</span>
        </div>`);
        $("body").append(toast);
        toast.fadeIn(300).delay(2500).fadeOut(300, function () {
          $(this).remove();
        });
      }

      function showCheckoutModal(finalAmount) {
        $(".checkout-modal-overlay").remove();
        const modal = $(`
          <div class="checkout-modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
            opacity: 0;
            transition: opacity 0.3s ease;
          ">
            <div class="checkout-modal-card" style="
              background: #fff;
              padding: 40px;
              border-radius: 16px;
              max-width: 450px;
              width: 90%;
              text-align: center;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              transform: translateY(20px);
              transition: transform 0.3s ease;
            ">
              <div style="
                width: 70px;
                height: 70px;
                background: #e8f5e9;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
              ">
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="#2e7d32" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 style="color: #2e7d32; font-weight: 700; margin-bottom: 10px;">Order Placed Successfully!</h3>
              <p style="color: #666; line-height: 1.5; margin-bottom: 25px;">
                Thank you for shopping with Smart Interio. Your order of <strong>${formatCurrency(finalAmount)}</strong> has been processed securely.
              </p>
              <button class="modal-close-btn" style="
                background: #8b5e3c;
                color: #fff;
                border: none;
                padding: 12px 30px;
                font-weight: 600;
                border-radius: 6px;
                cursor: pointer;
                width: 100%;
                transition: background 0.2s ease;
              ">Done</button>
            </div>
          </div>
        `);
        $("body").append(modal);
        setTimeout(() => {
          modal.css("opacity", "1");
          modal.find(".checkout-modal-card").css("transform", "translateY(0)");
        }, 50);
        modal.find(".modal-close-btn").click(function () {
          modal.css("opacity", "0");
          modal.find(".checkout-modal-card").css("transform", "translateY(20px)");
          setTimeout(() => {
            modal.remove();
            window.location.href = "index.html";
          }, 300);
        });
      }

      // Initial calculation run
      updateCartTotals();
    }

    // --- FROM INLINE SCRIPT index.html (Swiper) ---
    if (typeof Swiper !== 'undefined' && $('.trending-swiper').length > 0) {
      const trendingSwiper = new Swiper('.trending-swiper', {
        slidesPerView: 1,
        spaceBetween: 15,
        slidesPerGroup: 1,
        loop: true,
        speed: 600,
        grabCursor: true,
        navigation: {
          nextEl: '.trending-next',
          prevEl: '.trending-prev',
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          425: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 }
        }
      });
    }

    // --- FROM INLINE SCRIPT room.builder.html (Filters & Sliders) ---
    if (document.getElementById("products-track")) {
      
      // Setup default My Room items matching mockup:
      myRoomItems = [
        { id: "western_sofa", name: "Western Corner Sofa", img: "img/westernsofa.png", price: 64999 },
        { id: "coffee_table", name: "Coffee Table", img: "img/coffee-table.png", price: 19999 },
        { id: "fabric_pouf", name: "Fabric Pouf", img: "img/pouf.png", price: 5999 },
        { id: "classic_rug", name: "Rug", img: "img/rug.png", price: 8999 },
        { id: "floor_lamp", name: "Floor Lamp", img: "img/floorlamp.png", price: 6479 },
      ];

      pushState(myRoomItems);
      renderProducts();
      renderMyRoom();

      // COMPARE SLIDER
      const sliderRange = document.getElementById("slider-range");
      const sliderHandleLine = document.getElementById("slider-handle-line");
      const designedRoomImg = document.getElementById("designed-room-img");
      const designedRoomBadge = document.getElementById("designed-room-badge");
      const leftBadge = document.querySelector(".left-badge");
      const rightBadge = document.querySelector(".right-badge");

      if (sliderRange && sliderHandleLine && designedRoomImg) {
        const leftPaneImg = document.querySelector(".left-pane img");
        const rightPaneImg = document.querySelector(".right-pane img");
        const comparisonSlider = document.getElementById("comparison-slider");

        const updateImagesWidth = () => {
          if (comparisonSlider && leftPaneImg && rightPaneImg) {
            const totalW = comparisonSlider.offsetWidth || comparisonSlider.getBoundingClientRect().width;
            if (totalW > 0) {
              leftPaneImg.style.width = totalW + "px";
              rightPaneImg.style.width = totalW + "px";
            }
          }
        };

        const updateSlider = () => {
          const val = sliderRange.value;
          sliderHandleLine.style.left = `${val}%`;
          if (comparisonSlider) {
            comparisonSlider.style.setProperty("--split-pos", `${val}%`);
          }
          if (val < 12) {
            if (leftBadge) leftBadge.style.opacity = Math.max(0, (val - 3) / 9);
          } else {
            if (leftBadge) leftBadge.style.opacity = 1;
          }
          if (val > 88) {
            if (rightBadge) rightBadge.style.opacity = Math.max(0, (97 - val) / 9);
          } else {
            if (rightBadge) rightBadge.style.opacity = 1;
          }
        };

        sliderRange.addEventListener("input", updateSlider);
        window.addEventListener("resize", updateImagesWidth);
        window.addEventListener("load", updateImagesWidth);
        window.updateRoomImagesWidth = updateImagesWidth;

        // Use ResizeObserver for robust layout updates
        if (typeof ResizeObserver !== "undefined" && comparisonSlider) {
          const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
              const rect = entry.contentRect;
              if (rect.width > 0) {
                leftPaneImg.style.width = rect.width + "px";
                rightPaneImg.style.width = rect.width + "px";
              } else {
                updateImagesWidth();
              }
            }
          });
          resizeObserver.observe(comparisonSlider);
        }

        // Trigger updates when images load
        if (leftPaneImg) leftPaneImg.addEventListener("load", updateImagesWidth);
        if (rightPaneImg) rightPaneImg.addEventListener("load", updateImagesWidth);

        updateImagesWidth();
        updateSlider();
        setTimeout(updateImagesWidth, 100);
        setTimeout(updateImagesWidth, 300);
        setTimeout(updateImagesWidth, 1000);
      }

      // FILTERS SETUP
      const sidebarCategoryItems = document.querySelectorAll(".sidebar-category-item");
      const categoryTabs = document.querySelectorAll(".category-tab");
      const styleButtons = document.querySelectorAll(".style-btn");
      const colorDots = document.querySelectorAll(".color-dot");
      const sizeButtons = document.querySelectorAll(".size-btn");

      sidebarCategoryItems.forEach((item) => {
        item.addEventListener("click", () => {
          const cat = item.getAttribute("data-category");
          switchCategory(cat);
        });
      });

      categoryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const cat = tab.getAttribute("data-category");
          switchCategory(cat);
        });
      });

      styleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          styleButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentStyle = btn.getAttribute("data-style");
          showToast(`Style updated to: ${currentStyle}`, "info");
          renderProducts();
        });
      });

      colorDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          colorDots.forEach((d) => d.classList.remove("active"));
          dot.classList.add("active");
          currentThemeColor = dot.getAttribute("data-color");
          showToast(`Color Theme updated to: ${currentThemeColor}`, "info");
          renderProducts();
        });
      });

      sizeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          sizeButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentSize = btn.getAttribute("data-size");
          showToast(`Room Size scaled to: ${currentSize}`, "info");
        });
      });

      function switchCategory(cat) {
        currentCategory = cat;
        sidebarCategoryItems.forEach((item) => {
          if (item.getAttribute("data-category") === cat) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        categoryTabs.forEach((tab) => {
          if (tab.getAttribute("data-category") === cat) {
            tab.classList.add("active");
          } else {
            tab.classList.remove("active");
          }
        });
        renderProducts();
      }
    }
  });
}
