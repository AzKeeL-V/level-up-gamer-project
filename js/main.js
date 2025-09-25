// ===== JAVASCRIPT PRINCIPAL PARA EL CLIENTE =====
// Este archivo maneja toda la funcionalidad del frontend de Level-Up Gamer

// ===== VARIABLES GLOBALES Y CATÁLOGO =====
// Carrito de compras almacenado en localStorage
const carrito = JSON.parse(localStorage.getItem("carrito")) || []
// Usuario actual logueado
let currentUser = null

// Catálogo principal de productos - Base de datos local
const productCatalog = {
  JM001: {
    id: "JM001",
    code: "JM001",
    name: "Catan",
    category: "Juegos de Mesa",
    brand: "Catan Studio",
    price: 29990,
    image: "catan.jpg",
    description: "El clásico juego de mesa de estrategia y comercio.",
    stock: 15,
  },
  JM002: {
    id: "JM002",
    code: "JM002",
    name: "Carcassonne",
    category: "Juegos de Mesa",
    brand: "Z-Man Games",
    price: 24990,
    image: "carcassonne.jpg",
    description: "Juego de mesa de construcción de territorios.",
    stock: 12,
  },
  AC001: {
    id: "AC001",
    code: "AC001",
    name: "Controlador Inalámbrico Xbox Series X",
    category: "Accesorios",
    brand: "Microsoft",
    price: 59990,
    image: "controlador-xbox.jpg",
    description: "Controlador inalámbrico con diseño modernizado.",
    stock: 20,
  },
  AC002: {
    id: "AC002",
    code: "AC002",
    name: "Auriculares Gamer HyperX Cloud II",
    category: "Accesorios",
    brand: "HyperX",
    price: 79990,
    image: "auriculares-hyperx.jpg",
    description: "Auriculares gaming con sonido envolvente 7.1.",
    stock: 25,
  },
  CO001: {
    id: "CO001",
    code: "CO001",
    name: "PlayStation 5 - Edición Estándar",
    category: "Consolas",
    brand: "Sony",
    price: 549990,
    image: "playstation-5.jpg",
    description: "La última consola de Sony con tecnología de vanguardia.",
    stock: 8,
  },
  CG001: {
    id: "CG001",
    code: "CG001",
    name: "PC Gamer ASUS ROG Strix GT15",
    category: "PC Gamer",
    brand: "ASUS",
    price: 1299990,
    image: "pc-gamer-asus.jpg",
    description: "Potente PC gamer para los juegos más exigentes.",
    stock: 5,
  },
  SG001: {
    id: "SG001",
    code: "SG001",
    name: "Silla Gamer Secretlab Titan Evo 2022",
    category: "Sillas",
    brand: "Secretlab",
    price: 349990,
    image: "silla-secretlab.jpg",
    description: "Silla gaming ergonómica de máxima comodidad.",
    stock: 10,
  },
  MS001: {
    id: "MS001",
    code: "MS001",
    name: "Mouse Logitech G502 HERO",
    category: "Mouse",
    brand: "Logitech",
    price: 49990,
    image: "mouse-logitech.jpg",
    description: "Mouse gaming con sensor HERO 25K de alta precisión.",
    stock: 30,
  },
  MP001: {
    id: "MP001",
    code: "MP001",
    name: "Mousepad Razer Goliathus Extended Chroma",
    category: "Mousepad",
    brand: "Razer",
    price: 29990,
    image: "mousepad-razer.jpg",
    description: "Mousepad gaming extendido con iluminación RGB.",
    stock: 18,
  },
  PP001: {
    id: "PP001",
    code: "PP001",
    name: "Polera Level-Up Gamer - Edición Clásica",
    category: "Poleras Personalizadas",
    brand: "Level-Up Gamer",
    price: 14990,
    image: "polera-personalizada.jpg",
    description: "Polera de algodón de alta calidad con diseño gamer.",
    stock: 50,
  },
}

// Sincroniza el catálogo local con el almacenamiento del navegador
function syncProductsWithStorage() {
  const storedProducts = localStorage.getItem("levelup_products")
  if (storedProducts) {
    // Si hay productos guardados, los carga al catálogo
    const parsedProducts = JSON.parse(storedProducts)
    Object.assign(productCatalog, parsedProducts)
  } else {
    // Si no hay productos guardados, guarda el catálogo inicial
    localStorage.setItem("levelup_products", JSON.stringify(productCatalog))
  }
}

// Obtiene todos los productos sincronizados
function getProducts() {
  syncProductsWithStorage()
  return productCatalog
}

// Actualiza el catálogo con nuevos productos (usado desde el admin)
function updateProducts(newProducts) {
  Object.assign(productCatalog, newProducts)
  localStorage.setItem("levelup_products", JSON.stringify(productCatalog))
}

// ===== FUNCIONES DE RENDERIZADO =====
// Renderiza los productos destacados en la página principal
function renderFeaturedProducts() {
  const container = document.getElementById("product-list-container")
  if (!container) return

  container.innerHTML = `
    <div class="product-carousel-container">
      <button class="carousel-btn prev-btn" id="prevBtn">&larr;</button>
      <div class="product-carousel" id="productCarousel">
      </div>
      <button class="carousel-btn next-btn" id="nextBtn">&rarr;</button>
    </div>
  `

  const carousel = document.getElementById("productCarousel")

  // Itera sobre cada producto del catálogo y crea su tarjeta HTML
  for (const productId in productCatalog) {
    const product = productCatalog[productId]
    const imagePath = getImagePath(product.image, product.imageData)

    // Crea la estructura HTML para cada producto
    const productCard = document.createElement("div")
    productCard.className = "product-card-modern"
    productCard.setAttribute("data-category", product.category)
    productCard.innerHTML = `
        <img src="${imagePath}" class="card-img-top" alt="${product.name}"
             onerror="this.src='${getImagePath("placeholder.svg")}'">
        <div class="card-body">
            <h5 class="product-title">${product.name}</h5>
            <p class="product-category">
                <i class="bi bi-tag me-1"></i>${product.category}
            </p>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="btn-add-to-cart" onclick="addToCart('${product.id}')">
                <i class="bi bi-cart-plus me-2"></i>Agregar al Carrito
            </button>
            <button class="btn btn-outline-primary btn-sm mt-2 w-100" onclick="showProductModal('${product.id}')">
                <i class="bi bi-eye me-2"></i>Ver Detalles
            </button>
        </div>
    `
    carousel.appendChild(productCard)
  }

  // Inicializa los filtros de productos después de renderizar
  initializeProductFilters()

  // Inicializa el carousel
  initializeProductCarousel()
}

// Inicializa los botones de filtro por categoría
function initializeProductFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const productCards = document.querySelectorAll(".product-card-modern")

  // Agrega evento click a cada botón de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category

      // Actualiza el estado visual de los botones
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.setAttribute("aria-pressed", "false")
      })
      this.classList.add("active")
      this.setAttribute("aria-pressed", "true")

      // Filtra los productos según la categoría seleccionada
      productCards.forEach((card) => {
        const cardCategory = card.dataset.category
        if (category === "all" || cardCategory === category) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Inicializa el carousel de productos
function initializeProductCarousel() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const carousel = document.getElementById("productCarousel")

  if (!prevBtn || !nextBtn || !carousel) return

  let currentIndex = 0
  const cards = carousel.querySelectorAll(".product-card-modern")
  const totalCards = cards.length
  let visibleCount = 4 // Default for desktop

  // Function to update visible count based on screen size
  function updateVisibleCount() {
    const width = window.innerWidth
    if (width < 576) {
      visibleCount = 1
    } else if (width < 768) {
      visibleCount = 2
    } else if (width < 992) {
      visibleCount = 3
    } else {
      visibleCount = 4
    }
  }

  // Function to update carousel position
  function updateCarousel() {
    const cardWidth = cards[0]?.offsetWidth || 280
    const gap = 15 // gap between cards
    const translateX = -(currentIndex * (cardWidth + gap))
    carousel.style.transform = `translateX(${translateX}px)`
  }

  // Function to move carousel
  function moveCarousel(direction) {
    const maxIndex = Math.max(0, totalCards - visibleCount)
    currentIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction))
    updateCarousel()
    updateButtons()
  }

  // Function to update button states
  function updateButtons() {
    const maxIndex = Math.max(0, totalCards - visibleCount)
    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= maxIndex
  }

  // Event listeners for buttons
  prevBtn.addEventListener("click", () => moveCarousel(-1))
  nextBtn.addEventListener("click", () => moveCarousel(1))

  // Handle window resize
  window.addEventListener("resize", () => {
    updateVisibleCount()
    updateCarousel()
    updateButtons()
  })

  // Initial setup
  updateVisibleCount()
  updateCarousel()
  updateButtons()
}

// ===== FUNCIONES DE AUTENTICACIÓN Y SESIÓN =====
// Verifica el estado de autenticación del usuario y actualiza la interfaz
function checkAuthStatus() {
  const authButtons = document.getElementById("authButtons")
  const userMenu = document.getElementById("userMenu")
  const levelUpDisplay = document.getElementById("levelUpDisplay")

  if (!authButtons || !userMenu) {
    return
  }

  // HTML para usuarios no autenticados
  const authHTML = `<a href="${getCorrectPath("login.html")}" class="btn btn-outline-light btn-sm">Iniciar Sesión</a> <a href="${getCorrectPath("registro.html")}" class="btn btn-success btn-sm">Registrarse</a>`

  // HTML para el menú de usuario autenticado
  const userMenuHTML = `
        <div class="dropdown">
            <button class="btn btn-outline-primary dropdown-toggle d-flex align-items-center gap-2" 
                    type="button" data-bs-toggle="dropdown" id="userDropdownToggle">
                <div class="user-avatar">
                    <i class="bi bi-person-fill"></i>
                </div>
                <span id="userName" class="d-none d-md-inline"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end user-dropdown-menu">
                <li class="user-info-header">
                    <div class="d-flex align-items-center gap-3 p-3">
                        <div class="user-avatar-large">
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <div class="user-details">
                            <div class="user-name-display" id="userNameDisplay"></div>
                            <div class="d-flex align-items-center gap-3 mt-2">
                                <div class="d-flex align-items-center gap-1">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    <span class="user-level-text">Nivel <span id="userLevel">1</span></span>
                                </div>
                                <div class="d-flex align-items-center gap-1">
                                    <i class="bi bi-coin text-success"></i>
                                    <span class="user-points-text"><span id="userPoints">0</span> pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="${getCorrectPath("perfil.html")}">Mi Perfil</a>
                </li>
                <li>
                    <a class="dropdown-item" href="#">Mis Pedidos</a>
                </li>
                <li id="adminMenuItem" class="d-none"><hr class="dropdown-divider"></li>
                <li id="adminMenuLink" class="d-none">
                    <a class="dropdown-item admin-panel-item" href="${getCorrectPath("admin.html")}">
                        <i class="bi bi-gear-fill me-2"></i>Panel de Administrador
                    </a>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="#" onclick="logout()">
                        <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>`

  // HTML para mostrar puntos y nivel del usuario
  const levelUpHTML = `
        <div class="d-flex align-items-center gap-2">
            <div class="levelup-badge">
                <i class="bi bi-star-fill"></i>
                <span id="userLevel">1</span>
            </div>
            <div class="text-light">
                <small class="d-block">Puntos LevelUp</small>
                <strong id="userPoints" class="text-neon">0</strong>
            </div>
        </div>`

  // Busca datos de sesión en localStorage o sessionStorage
  const sessionData = localStorage.getItem("levelup_session") || sessionStorage.getItem("levelup_session")
  currentUser = sessionData ? JSON.parse(sessionData) : null

  if (currentUser) {
    // Usuario autenticado - configura la interfaz de usuario logueado
    const userData = {
      ...currentUser,
      isLoggedIn: true,
      firstName:
        currentUser.firstName ||
        currentUser.fullName?.split(" ")[0] ||
        currentUser.nombreCompleto?.split(" ")[0] ||
        currentUser.nombre,
      lastName:
        currentUser.lastName ||
        currentUser.fullName?.split(" ").slice(1).join(" ") ||
        currentUser.nombreCompleto?.split(" ").slice(1).join(" ") ||
        "",
    }

    // Guarda los datos del usuario en múltiples formatos para compatibilidad
    localStorage.setItem("usuario_logueado", JSON.stringify(userData))
    localStorage.setItem("currentUser", JSON.stringify(userData))
    localStorage.setItem("sessionData", JSON.stringify(userData))

    // Actualiza la interfaz para usuario logueado
    authButtons.innerHTML = ""
    userMenu.innerHTML = userMenuHTML
    if (levelUpDisplay) {
      levelUpDisplay.innerHTML = levelUpHTML
      levelUpDisplay.classList.remove("d-none")
    }

    userMenu.classList.remove("d-none")

    // Actualiza los elementos con datos del usuario
    const userNameElement = document.getElementById("userName")
    const userLevelElement = document.getElementById("userLevel")
    const userPointsElement = document.getElementById("userPoints")
    const userNameDisplayElement = document.getElementById("userNameDisplay")

    if (userNameElement) {
      userNameElement.textContent = userData.firstName
    }
    if (userNameDisplayElement) {
      userNameDisplayElement.textContent = userData.firstName
    }
    if (userLevelElement) {
      userLevelElement.textContent = userData.level || 1
    }
    if (userPointsElement) {
      userPointsElement.textContent = (userData.levelUpPoints || userData.puntosReferidos || 0).toLocaleString()
    }

    // Muestra opciones de administrador si el usuario es admin
    if (userData.isAdmin) {
      const adminMenuItem = document.getElementById("adminMenuItem")
      const adminMenuLink = document.getElementById("adminMenuLink")
      if (adminMenuItem) adminMenuItem.classList.remove("d-none")
      if (adminMenuLink) adminMenuLink.classList.remove("d-none")
    }

    setupDropdownClickOutside()
  } else {
    // Usuario no autenticado - limpia datos y muestra botones de login
    localStorage.removeItem("usuario_logueado")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("sessionData")

    authButtons.innerHTML = authHTML
    userMenu.innerHTML = ""
    levelUpDisplay.innerHTML = ""
    userMenu.classList.add("d-none")
    levelUpDisplay.classList.add("d-none")
  }
}

// Obtiene la ruta correcta según la ubicación actual (páginas internas vs raíz)
function getCorrectPath(filename) {
  const isInPagesFolder = window.location.pathname.includes("/pages/")
  if (isInPagesFolder) {
    return filename
  } else {
    return `pages/${filename}`
  }
}

// Configura el cierre del dropdown al hacer click fuera
function setupDropdownClickOutside() {
  document.removeEventListener("click", handleDropdownClickOutside)
  document.addEventListener("click", handleDropdownClickOutside)
}

// Maneja el cierre del dropdown cuando se hace click fuera
function handleDropdownClickOutside(event) {
  const dropdown = document.querySelector(".dropdown")
  const dropdownMenu = document.querySelector(".user-dropdown-menu")

  if (dropdown && dropdownMenu) {
    if (!dropdown.contains(event.target)) {
      const dropdownToggle = document.getElementById("userDropdownToggle")
      if (dropdownToggle) {
        const bsDropdown = window.bootstrap.Dropdown.getInstance(dropdownToggle)
        if (bsDropdown) {
          bsDropdown.hide()
        }
      }
    }
  }
}

// ===== INICIALIZADORES DE PÁGINAS ESPECÍFICAS =====
// Inicializa la funcionalidad específica de la página de login
function initializeLoginPage() {
  const loginForm = document.getElementById("loginForm")
  if (!loginForm) {
    return
  }

  // Maneja el envío del formulario de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const remember = document.getElementById("remember").checked

    // Actualiza el botón durante el proceso de login
    const submitButton = loginForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent
    submitButton.textContent = "Ingresando..."
    submitButton.disabled = true

    try {
      // Simula delay de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Intenta autenticar al usuario usando la función externa
      if (typeof window.authenticateUser === "function") {
        const result = window.authenticateUser(email, password)

        if (result && typeof result === "object" && result.exito && result.usuario) {
          localStorage.setItem("levelup_session", JSON.stringify(result.usuario))
          console.log("[v0] Sesión guardada en localStorage:", JSON.stringify(result.usuario))

          // Si el usuario marcó "recordarme", también guardar en sessionStorage como respaldo
          if (remember) {
            sessionStorage.setItem("levelup_session", JSON.stringify(result.usuario))
            console.log("[v0] Sesión también guardada en sessionStorage como respaldo")
          }

          // Redirige según el tipo de usuario
          if (result.usuario.isAdmin) {
            showNotification("¡Bienvenido Administrador!", "success")
            setTimeout(() => {
              window.location.href = "../index.html"
            }, 500)
          } else {
            showNotification("¡Inicio de sesión exitoso!", "success")
            setTimeout(() => {
              window.location.href = "../index.html"
            }, 500)
          }
          return
        } else {
          showLoginError("Credenciales incorrectas")
        }
      } else {
        showLoginError("Sistema de autenticación no disponible. Verifica que usuario.js esté cargado.")
      }
    } catch (error) {
      showLoginError("Error en el proceso de autenticación")
    }

    // Restaura el botón después del proceso
    submitButton.textContent = originalText
    submitButton.disabled = false
  })

  // Muestra errores de login al usuario
  function showLoginError(message) {
    const errorDiv = document.getElementById("errorMessage")
    const errorText = document.getElementById("errorText")

    if (errorDiv && errorText) {
      errorText.textContent = message
      errorDiv.style.display = "block"

      setTimeout(() => {
        errorDiv.style.display = "none"
      }, 5000)
    } else {
      alert(message)
    }
  }
}

// Inicializa la página de registro (placeholder)
function initializeRegisterPage() {
  const registerForm = document.getElementById("registrationForm")
  if (!registerForm) return
}

// Inicializa la página de perfil del usuario
function initializeProfilePage() {
  const profileForm = document.getElementById("profileUpdateForm")
  if (!profileForm) return

  console.log("[v0] initializeProfilePage - Verificando autenticación...")

  // Verificar si ya tenemos currentUser establecido
  if (!currentUser) {
    // Intentar obtener datos de sesión de nuevo
    const sessionData = localStorage.getItem("levelup_session") || sessionStorage.getItem("levelup_session")
    if (sessionData) {
      try {
        currentUser = JSON.parse(sessionData)
        console.log("[v0] Usuario establecido desde sessionData:", currentUser)
      } catch (error) {
        console.error("[v0] Error parseando sessionData:", error)
        currentUser = null
      }
    }
  }

  if (currentUser) {
    console.log("[v0] Usuario autenticado, cargando perfil...")

    // Cargar datos del perfil del usuario
    if (typeof window.loadUserProfile === "function") {
      window.loadUserProfile(currentUser)
    }

    // Cargar preferencias de categorías
    if (typeof window.loadCategoryPreferences === "function") {
      window.loadCategoryPreferences()
    }

    // Cargar direcciones del usuario
    if (typeof window.loadUserAddresses === "function") {
      window.loadUserAddresses()
    }

    // Cargar historial de pedidos
    if (typeof window.loadOrderHistory === "function") {
      window.loadOrderHistory()
    }

    // Cargar métodos de pago
    if (typeof window.loadPaymentMethods === "function") {
      window.loadPaymentMethods()
    }

    // Configurar formulario de perfil
    if (typeof window.setupProfileForm === "function") {
      window.setupProfileForm()
    }

    // Configurar formulario de métodos de pago
    if (typeof window.setupPaymentMethodForm === "function") {
      window.setupPaymentMethodForm()
    }
  } else {
    console.log("[v0] Usuario no autenticado, redirigiendo a login...")
    // Redirige al login si no hay usuario autenticado
    const loginPath = window.location.pathname.includes("/pages/") ? "login.html" : "pages/login.html"
    window.location.href = loginPath
  }
}

// ===== FUNCIONES AUXILIARES =====
// Muestra notificaciones temporales al usuario
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999;"
  notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 3000)
}

// Formatea precios en formato chileno
function formatPrice(price) {
  return "$" + Number(price).toLocaleString("es-CL")
}

// Obtiene la ruta correcta para las imágenes según la ubicación actual
function getImagePath(imageName, imageData) {
  // If we have base64 image data, use it directly
  if (imageData && imageData.startsWith("data:image/")) {
    return imageData
  }

  const isInPagesFolder = window.location.pathname.includes("/pages/")
  if (imageName === "placeholder.svg" || imageName === "placeholder.jpg") {
    return isInPagesFolder ? "../img/placeholder.svg" : "img/placeholder.svg"
  }
  return (isInPagesFolder ? "../img/productos/" : "img/productos/") + imageName
}

// Maneja errores de carga de imágenes
function handleImageError(img) {
  img.onerror = null
  const placeholder = getImagePath("placeholder.svg")
  img.src = placeholder
}

// Actualiza el badge del carrito con la cantidad de productos
function updateCartBadge() {
  const cartBadges = [document.getElementById("cart-badge"), document.getElementById("cartBadge")]

  const cart = JSON.parse(localStorage.getItem("levelup_cart")) || []
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

  cartBadges.forEach((cartBadge) => {
    if (cartBadge) {
      cartBadge.textContent = totalItems
      if (totalItems > 0) {
        cartBadge.classList.remove("d-none")
        cartBadge.style.display = "inline-block"
      } else {
        cartBadge.classList.add("d-none")
        cartBadge.style.display = "none"
      }
    }
  })
}

// ===== FUNCIONALIDAD DEL CARRITO =====
// Agrega un producto al carrito con validación de stock
function addToCart(productId) {
  console.log("Agregando producto al carrito:", productId)

  const product = productCatalog[productId]
  if (!product) {
    console.error("Producto no encontrado:", productId)
    showNotification("Producto no encontrado", "error")
    return
  }

  // Validación de stock disponible
  if (product.stock <= 0) {
    console.log("Producto sin stock:", productId, "Stock:", product.stock)
    showNotification("Producto sin stock disponible", "error")
    return
  }

  const cart = JSON.parse(localStorage.getItem("levelup_cart")) || []
  const existingItem = cart.find((item) => String(item.id) === String(productId))

  if (existingItem) {
    // Producto ya existe en el carrito - incrementa cantidad
    const newQuantity = (existingItem.quantity || 0) + 1
    if (newQuantity > product.stock) {
      console.log("Stock insuficiente. Disponible:", product.stock, "Solicitado:", newQuantity)
      showNotification(`Stock insuficiente. Solo quedan ${product.stock} unidades disponibles`, "warning")
      return
    }
    existingItem.quantity = newQuantity
    console.log("Cantidad actualizada para producto existente:", existingItem)
  } else {
    // Nuevo producto - verifica stock antes de agregar
    if (product.stock < 1) {
      console.log("No hay stock suficiente para agregar producto:", productId)
      showNotification("No hay stock suficiente", "error")
      return
    }

    // Crea nuevo item en el carrito
    const newItem = {
      id: productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.price + 10000,
      image: product.image,
      description: product.description,
      quantity: 1,
    }
    cart.push(newItem)
    console.log("Nuevo producto agregado al carrito:", newItem)
  }

  // Guarda el carrito actualizado en localStorage
  localStorage.setItem("levelup_cart", JSON.stringify(cart))
  localStorage.setItem("carrito", JSON.stringify(cart))
  console.log("Carrito actualizado:", cart)
  updateCartBadge()
  showNotification(`${product.name} agregado al carrito`, "success")
}

// Función para mostrar modal de detalles del producto
function showProductModal(productId) {
  console.log('[v0] Mostrando modal para producto:', productId);

  const productCatalog = getProducts();
  const product = productCatalog[productId];
  if (!product) {
    console.error('[v0] Producto no encontrado:', productId);
    return;
  }

  // Actualizar contenido del modal
  document.getElementById('productModalTitle').textContent = product.name;

  // Usar getImagePath de main.js
  const imagePath = getImagePath(product.image, product.imageData);
  document.getElementById('productModalImage').src = imagePath;
  document.getElementById('productModalImage').alt = product.name;
  document.getElementById('productModalImage').onerror = function() {
    this.src = 'img/placeholder.svg';
  };

  document.getElementById('productModalCategory').textContent = product.category;
  document.getElementById('productModalBrand').textContent = product.brand || product.marca || '-';
  document.getElementById('productModalModel').textContent = product.model || product.modelo || '-';
  document.getElementById('productModalDescription').textContent = product.description;

  // Usar formatPrice de main.js
  document.getElementById('productModalPrice').textContent = formatPrice(product.price);

  // Actualizar stock con badge de color según disponibilidad
  const stockElement = document.getElementById('productModalStock');
  const stock = product.stock || 0;
  stockElement.textContent = stock;

  // Cambiar color del badge según el stock
  stockElement.className = 'badge ';
  if (stock === 0) {
    stockElement.className += 'bg-danger';
    stockElement.textContent = 'Sin stock';
  } else if (stock <= 5) {
    stockElement.className += 'bg-warning';
    stockElement.textContent = `${stock} unidades`;
  } else {
    stockElement.className += 'bg-success';
    stockElement.textContent = `${stock} unidades`;
  }

  // Configurar botón de agregar al carrito
  const addToCartBtn = document.getElementById('addToCartBtn');
  addToCartBtn.onclick = () => {
    if (window.addToCart) {
      window.addToCart(productId);
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    if (modal) modal.hide();
  };

  // Mostrar el modal
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  productModal.show();
}

// Función de logout
function logout() {
  localStorage.removeItem("levelup_session")
  sessionStorage.removeItem("levelup_session")
  localStorage.removeItem("usuario_logueado")
  localStorage.removeItem("currentUser")
  localStorage.removeItem("sessionData")

  showNotification("Sesión cerrada exitosamente", "success")
  setTimeout(() => {
    window.location.href = window.location.pathname.includes("/pages/") ? "../index.html" : "index.html"
  }, 1000)
}

// ===== INICIALIZACIÓN PRINCIPAL =====
// Expone funciones de autenticación al objeto window para compatibilidad
window.authenticateUser =
  window.authenticateUser ||
  ((email, password) => {
    console.log("Función de autenticación no disponible")
    return null
  })

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Funciones de autenticación expuestas al objeto window")

  // Sincroniza productos con el almacenamiento
  syncProductsWithStorage()

  // Verifica el estado de autenticación
  checkAuthStatus()

  // Renderiza productos si estamos en la página principal
  if (document.getElementById("product-list-container")) {
    renderFeaturedProducts()
  }

  // Inicializa páginas específicas según la URL actual
  const currentPath = window.location.pathname

  if (currentPath.includes("login.html")) {
    initializeLoginPage()
  } else if (currentPath.includes("registro.html")) {
    initializeRegisterPage()
  } else if (currentPath.includes("perfil.html")) {
    initializeProfilePage()
  }

  // Actualiza el badge del carrito
  updateCartBadge()

  // Configura eventos globales
  setupGlobalEvents()
})

// Configura eventos globales de la aplicación
function setupGlobalEvents() {
  // Manejo de errores de imágenes
  document.addEventListener(
    "error",
    (e) => {
      if (e.target.tagName === "IMG") {
        handleImageError(e.target)
      }
    },
    true,
  )

  // Actualización periódica del estado de autenticación
  setInterval(checkAuthStatus, 30000) // Cada 30 segundos
}

// Función para manejar el carrito desde otras páginas
window.addToCart = addToCart
window.updateCartBadge = updateCartBadge
window.showNotification = showNotification
window.formatPrice = formatPrice
window.getImagePath = getImagePath
window.getProducts = getProducts
window.logout = logout

// Declaración de funciones externas para evitar errores de lint
window.loadUserProfile = window.loadUserProfile || (() => {})
window.loadCategoryPreferences = window.loadCategoryPreferences || (() => {})
window.loadUserAddresses = window.loadUserAddresses || (() => {})
window.loadOrderHistory = window.loadOrderHistory || (() => {})
window.loadPaymentMethods = window.loadPaymentMethods || (() => {})
window.setupProfileForm = window.setupProfileForm || (() => {})
window.setupPaymentMethodForm = window.setupPaymentMethodForm || (() => {})

window.addEventListener("productsUpdated", (event) => {
  console.log("[v0] Products updated event received, refreshing catalog...")
  syncProductsWithStorage()
  if (document.getElementById("product-list-container")) {
    renderFeaturedProducts()
  }
})
