// ===== ADMIN PANEL JAVASCRIPT =====

// Variables globales del admin
const adminData = {
  products: {},
  users: {},
  blogEntries: [],
  news: [],
  stats: {
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalStockValue: 0,
  },
}

const bootstrap = window.bootstrap

// Inicialización del panel de administración
document.addEventListener("DOMContentLoaded", () => {
  initializeAdmin()
  loadAdminData()
  setupEventListeners()
  updateDashboard()
  startOrderNotificationSystem()

  // Clear new order notifications when user clicks on notification bell
  const notificationButton = document.querySelector('[data-bs-toggle="dropdown"]')
  if (notificationButton && notificationButton.querySelector(".bi-bell")) {
    notificationButton.addEventListener("click", () => {
      // Mark notifications as seen
      localStorage.setItem("admin_last_notification_check", Date.now().toString())

      // Update notifications after a short delay to show they've been seen
      setTimeout(() => {
        updateOrderNotifications()
      }, 1000)
    })
  }
})

// ===== INICIALIZACIÓN =====
function initializeAdmin() {
  // Verificar si el usuario tiene permisos de admin (simulado)
  const currentUser = JSON.parse(
    localStorage.getItem("levelup_session") || sessionStorage.getItem("levelup_session") || "{}",
  )

  if (!currentUser.email || !currentUser.email.includes("admin")) {
    // Crear usuario admin por defecto si no existe
    const adminUser = {
      email: "admin@levelup.com",
      fullName: "Administrador LevelUp",
      isAdmin: true,
    }
    localStorage.setItem("levelup_session", JSON.stringify(adminUser))
  }

  if (typeof window.productCatalog !== "undefined") {
    adminData.products = { ...window.productCatalog }
  }

  // Mostrar nombre del admin
  const adminNameElement = document.getElementById("adminName")
  if (adminNameElement && currentUser.fullName) {
    adminNameElement.textContent = currentUser.fullName
  }

  console.log("Admin inicializado correctamente")
}

function loadAdminData() {
  // Cargar entradas de blog
  const savedBlog = localStorage.getItem("admin_blog")
  if (savedBlog) {
    adminData.blogEntries = JSON.parse(savedBlog)
  } else {
    adminData.blogEntries = [
      {
        id: "blog1",
        title: "Las mejores estrategias para gaming competitivo",
        content: "En el mundo del gaming competitivo, la estrategia es clave...",
        author: "Admin LevelUp",
        date: "2024-03-15",
        status: "published",
      },
      {
        id: "blog2",
        title: "Guía completa de setup gamer 2024",
        content: "Descubre cómo armar el setup gamer perfecto...",
        author: "Admin LevelUp",
        date: "2024-03-10",
        status: "published",
      },
    ]
    localStorage.setItem("admin_blog", JSON.stringify(adminData.blogEntries))
  }

  // Cargar noticias
  const savedNews = localStorage.getItem("admin_news")
  if (savedNews) {
    adminData.news = JSON.parse(savedNews)
  } else {
    adminData.news = [
      {
        id: "news1",
        title: "Nuevos productos gaming disponibles",
        content: "Hemos agregado una nueva línea de productos gaming...",
        category: "Gaming",
        date: "2024-03-18",
        status: "published",
      },
      {
        id: "news2",
        title: "Promoción especial fin de mes",
        content: "Aprovecha nuestras ofertas especiales...",
        category: "Promociones",
        date: "2024-03-16",
        status: "published",
      },
    ]
    localStorage.setItem("admin_news", JSON.stringify(adminData.news))
  }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  const toggleSidebar = document.getElementById("toggleSidebar")
  const sidebar = document.getElementById("adminSidebar")

  if (toggleSidebar && sidebar) {
    toggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-link[data-section]")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const section = link.getAttribute("data-section")
      showSection(section)

      // Update active state
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    })
  })

  // Product management buttons (may not exist in dashboard)
  const saveProductBtn = document.getElementById("saveProduct")
  const searchProductsInput = document.getElementById("searchProducts")
  const categoryFilterSelect = document.getElementById("categoryFilter")

  if (saveProductBtn) {
    saveProductBtn.addEventListener("click", saveProduct)
  }

  if (searchProductsInput) {
    searchProductsInput.addEventListener("input", filterProducts)
  }

  if (categoryFilterSelect) {
    categoryFilterSelect.addEventListener("change", filterProducts)
  }

  // Blog management buttons (may not exist in dashboard)
  const saveBlogBtn = document.getElementById("saveBlog")

  if (saveBlogBtn) {
    saveBlogBtn.addEventListener("click", saveBlogEntry)
  }

  const saveNewsBtn = document.getElementById("saveNews")

  if (saveNewsBtn) {
    saveNewsBtn.addEventListener("click", saveNews)
  }

  // Refresh dashboard button
  const refreshDashboardBtn = document.getElementById("refreshDashboard")

  if (refreshDashboardBtn) {
    refreshDashboardBtn.addEventListener("click", () => {
      updateDashboard()
      showNotification("Dashboard actualizado", "success")
    })
  }
}

// ===== NAVIGATION =====
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show selected section
  const targetSection = document.getElementById(sectionName + "-section")
  if (targetSection) {
    targetSection.classList.add("active")

    // Load section-specific data
    switch (sectionName) {
      case "dashboard":
        updateDashboard()
        break
      case "productos":
        loadProductsTable()
        break
      case "blog":
        loadBlogEntries()
        break
      case "noticias":
        loadNews()
        break
    }
  }
}

// ===== PRODUCT MANAGEMENT =====
function loadProductsTable() {
  const tbody = document.getElementById("productsTableBody")
  let html = ""

  Object.values(adminData.products).forEach((product) => {
    const totalValue = product.price * product.stock
    html += `
            <tr data-product-id="${product.id}">
                <td><strong>${product.id}</strong></td>
                <td>
                    <img src="${getImagePath(product.image)}" class="product-image-small" alt="${product.name}" onerror="handleImageError(this);" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                </td>
                <td>${product.name}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td>${formatPrice(product.price)}</td>
                <td>
                    <span class="badge ${product.stock < 10 ? "bg-danger" : "bg-success"}">
                        ${product.stock}
                    </span>
                </td>
                <td><strong>${formatPrice(totalValue)}</strong></td>
                <td>
                    <button class="btn btn-warning btn-sm me-1" onclick="editProduct('${product.id}')" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.id}')" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `
  })

  tbody.innerHTML = html || '<tr><td colspan="8" class="text-center text-muted">No hay productos disponibles</td></tr>'
}

function filterProducts() {
  const searchTerm = document.getElementById("searchProducts").value.toLowerCase()
  const categoryFilter = document.getElementById("categoryFilter").value
  const rows = document.querySelectorAll("#productsTableBody tr[data-product-id]")

  rows.forEach((row) => {
    const code = row.cells[0].textContent.toLowerCase()
    const name = row.cells[2].textContent.toLowerCase()
    const category = row.cells[3].textContent

    const matchesSearch = code.includes(searchTerm) || name.includes(searchTerm)
    const matchesCategory = !categoryFilter || category.includes(categoryFilter)

    row.style.display = matchesSearch && matchesCategory ? "" : "none"
  })

  const visibleRows = Array.from(rows).filter((row) => row.style.display !== "none")
  const totalRows = rows.length

  let counter = document.getElementById("productCounter")
  if (!counter) {
    counter = document.createElement("small")
    counter.id = "productCounter"
    counter.className = "text-muted"
    const cardHeader = document.querySelector("#productos-section .card-header h5")
    if (cardHeader) {
      cardHeader.appendChild(counter)
    }
  }

  if (searchTerm || categoryFilter) {
    counter.textContent = ` (${visibleRows.length} de ${totalRows} productos)`
  } else {
    counter.textContent = ` (${totalRows} productos)`
  }
}

function editProduct(productId) {
  const product = adminData.products[productId]
  if (!product) return

  const productIdEl = document.getElementById("productId")
  const productCodeEl = document.getElementById("productCode")
  const productNameEl = document.getElementById("productName")
  const productCategoryEl = document.getElementById("productCategory")
  const productPriceEl = document.getElementById("productPrice")
  const productStockEl = document.getElementById("productStock")
  const productDescriptionEl = document.getElementById("productDescription")
  const productImageEl = document.getElementById("productImage")

  if (productIdEl) productIdEl.value = product.id
  if (productCodeEl) productCodeEl.value = product.id
  if (productNameEl) productNameEl.value = product.name
  if (productCategoryEl) productCategoryEl.value = product.category
  if (productPriceEl) productPriceEl.value = product.price
  if (productStockEl) productStockEl.value = product.stock
  if (productDescriptionEl) productDescriptionEl.value = product.description
  if (productImageEl) productImageEl.value = product.image

  // Mostrar modal
  const modalEl = document.getElementById("productModal")
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl)
    modal.show()
  }
}

function deleteProduct(productId) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    delete adminData.products[productId]

    // Actualizar productCatalog global si existe
    if (window.productCatalog) {
      delete window.productCatalog[productId]
    }

    loadProductsTable()
    updateDashboard()
    showNotification("Producto eliminado correctamente", "success")
  }
}

function saveProduct() {
  const form = document.getElementById("productForm")
  if (!form) return

  const productCodeEl = document.getElementById("productCode")
  const productIdEl = document.getElementById("productId")
  const productNameEl = document.getElementById("productName")
  const productCategoryEl = document.getElementById("productCategory")
  const productPriceEl = document.getElementById("productPrice")
  const productStockEl = document.getElementById("productStock")
  const productDescriptionEl = document.getElementById("productDescription")
  const productImageEl = document.getElementById("productImage")

  if (!productCodeEl || !productNameEl || !productCategoryEl || !productPriceEl || !productStockEl) {
    showNotification("Formulario incompleto", "danger")
    return
  }

  const productCode = productCodeEl.value.trim()
  const productId = productIdEl?.value || productCode || generateProductId()

  if (!productCode) {
    showNotification("El código del producto es obligatorio", "danger")
    return
  }

  const productData = {
    id: productId,
    name: productNameEl.value.trim(),
    category: productCategoryEl.value,
    price: Number.parseInt(productPriceEl.value),
    stock: Number.parseInt(productStockEl.value),
    description: productDescriptionEl?.value.trim() || "",
    image: productImageEl?.value.trim() || "placeholder.jpg",
  }

  if (!productData.name || !productData.category || !productData.price || productData.stock < 0) {
    showNotification("Por favor completa todos los campos requeridos correctamente", "danger")
    return
  }

  if (productData.price <= 0) {
    showNotification("El precio debe ser mayor a 0", "danger")
    return
  }

  const existingProductId = productIdEl?.value

  if (!existingProductId && adminData.products[productId]) {
    showNotification("Ya existe un producto con ese código. Por favor usa otro código.", "danger")
    return
  }

  if (existingProductId && existingProductId !== productId) {
    delete adminData.products[existingProductId]
    if (window.productCatalog) {
      delete window.productCatalog[existingProductId]
    }
  }

  adminData.products[productId] = productData

  if (window.productCatalog) {
    window.productCatalog[productId] = productData
  }

  const modalEl = document.getElementById("productModal")
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl)
    if (modal) modal.hide()
  }

  form.reset()
  loadProductsTable()
  updateDashboard()
  showNotification(
    existingProductId ? "Producto actualizado correctamente" : "Producto creado correctamente",
    "success",
  )
}

function generateProductId() {
  const categories = {
    Consolas: "CO",
    Computadores: "CG",
    Sillas: "SG",
    Accesorios: "AC",
    "Juegos de Mesa": "JM",
    Merchandising: "PP",
  }

  const category = document.getElementById("productCategory").value
  const prefix = categories[category] || "XX"
  const number = String(Object.keys(adminData.products).length + 1).padStart(3, "0")

  return prefix + number
}

// ===== DASHBOARD =====
function updateDashboard() {
  const totalUsersElement = document.getElementById("totalUsers")
  const normalUsersElement = document.getElementById("normalUsers")
  const duocUsersElement = document.getElementById("duocUsers")
  const todayUsersElement = document.getElementById("todayUsers")

  const storedProducts = localStorage.getItem("levelup_products")
  let realProducts = {}
  if (storedProducts) {
    realProducts = JSON.parse(storedProducts)
  } else if (typeof window.productCatalog !== "undefined") {
    realProducts = window.productCatalog
  }

  adminData.stats.totalProducts = Object.keys(realProducts).length

  const storedUsers = localStorage.getItem("usuarios")
  let realUsers = []
  if (storedUsers) {
    realUsers = JSON.parse(storedUsers)
  }
  adminData.stats.totalUsers = realUsers.length

  const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  adminData.stats.totalOrders = orders.length

  const completedOrders = orders.filter((order) => order.status === "entregado")
  adminData.stats.totalRevenue = completedOrders.reduce((total, order) => total + (order.total || 0), 0)

  const totalStock = Object.values(realProducts).reduce((total, product) => {
    return total + (product.stock || 0)
  }, 0)

  adminData.stats.totalStockValue = Object.values(realProducts).reduce((total, product) => {
    return total + (product.price || 0) * (product.stock || 0)
  }, 0)

  // Update DOM elements with real data
  const totalProductsEl = document.getElementById("totalProducts")
  const totalStockEl = document.getElementById("totalStock")
  const totalRevenueEl = document.getElementById("totalRevenue")

  if (totalProductsEl) totalProductsEl.textContent = adminData.stats.totalProducts
  if (totalUsersElement) totalUsersElement.textContent = adminData.stats.totalUsers

  if (normalUsersElement) normalUsersElement.textContent = realUsers.filter((user) => !user.beneficioDuoc).length
  if (duocUsersElement) duocUsersElement.textContent = realUsers.filter((user) => user.beneficioDuoc).length

  if (todayUsersElement)
    todayUsersElement.textContent = realUsers.filter((user) => {
      const userDate = new Date(user.fechaRegistro || user.registrationDate).toDateString()
      return userDate === new Date().toDateString()
    }).length
  if (totalStockEl) totalStockEl.textContent = totalStock.toLocaleString()
  if (totalRevenueEl) totalRevenueEl.textContent = formatPrice(adminData.stats.totalStockValue)

  updateTodayStatsWithRealData(orders, realUsers, realProducts)

  updateRecentActivity()
  updateOrderNotifications()

  showLowStockProducts(realProducts)

  const now = new Date()
  const timeString = now.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const lastUpdateEl = document.getElementById("lastUpdate")
  if (lastUpdateEl) lastUpdateEl.textContent = timeString
}

function updateTodayStatsWithRealData(orders, users, products) {
  const today = new Date().toDateString()

  // Calculate real orders from today
  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.date).toDateString()
    return orderDate === today
  }).length

  // Calculate real new users from today
  const todayUsers = users.filter((user) => {
    if (user.fechaRegistro || user.registrationDate) {
      const userDate = new Date(user.fechaRegistro || user.registrationDate).toDateString()
      return userDate === today
    }
    return false
  }).length

  const lowStockProducts = Object.values(products).filter((product) => (product.stock || 0) <= 5)

  const newProductsToday = document.getElementById("newProductsToday")
  const newUsersToday = document.getElementById("newUsersToday")
  const lowStockCount = document.getElementById("lowStockCount")

  if (newProductsToday) {
    // For new products today, we could track this in localStorage in the future
    // For now, show 0 since we don't have creation dates for products
    newProductsToday.textContent = "0"
  }

  if (newUsersToday) {
    newUsersToday.textContent = todayUsers
  }

  if (lowStockCount) {
    lowStockCount.textContent = lowStockProducts.length
  }
}

function updateRecentActivity() {
  const container = document.getElementById("recentActivity")
  if (!container) return

  const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  const recentOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  if (recentOrders.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-3">No hay actividad reciente</p>'
    return
  }

  let html = ""
  recentOrders.forEach((order) => {
    const timeAgo = getTimeAgo(new Date(order.date))
    const statusClass = getOrderStatusClass(order.status)

    html += `
      <div class="activity-item d-flex align-items-center mb-3">
        <div class="activity-icon me-3">
          <i class="bi bi-cart-check text-primary"></i>
        </div>
        <div class="flex-grow-1">
          <div class="activity-title">Pedido ${order.id}</div>
          <div class="activity-description">
            ${order.customer || order.customerInfo?.name || "Cliente"} - $${(order.total || 0).toLocaleString("es-CL")}
          </div>
          <small class="text-muted">${timeAgo}</small>
        </div>
        <span class="badge ${statusClass}">${getOrderStatusText(order.status)}</span>
      </div>
    `
  })

  container.innerHTML = html
}

function getOrderStatusClass(status) {
  const classes = {
    pendiente: "bg-warning",
    procesando: "bg-info",
    enviado: "bg-primary",
    entregado: "bg-success",
    cancelado: "bg-danger",
  }
  return classes[status] || "bg-secondary"
}

function getOrderStatusText(status) {
  const texts = {
    pendiente: "Pendiente",
    procesando: "Procesando",
    enviado: "Enviado",
    entregado: "Entregado",
    cancelado: "Cancelado",
  }
  return texts[status] || status
}

function getTimeAgo(date) {
  const now = new Date()
  const diffInMinutes = Math.floor((now - date) / (1000 * 60))

  if (diffInMinutes < 1) return "Hace un momento"
  if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `Hace ${diffInHours} horas`

  const diffInDays = Math.floor(diffInHours / 24)
  return `Hace ${diffInDays} días`
}

// ===== BLOG MANAGEMENT =====
function loadBlogEntries() {
  const container = document.getElementById("blogEntriesContainer")
  let html = ""

  adminData.blogEntries.forEach((entry) => {
    html += `
            <div class="content-card">
                <h5>${entry.title}</h5>
                <p>${entry.content.substring(0, 150)}...</p>
                <div class="content-meta">
                    <span><i class="bi bi-person"></i> ${entry.author}</span>
                    <span><i class="bi bi-calendar"></i> ${entry.date}</span>
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="editBlogEntry('${entry.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteBlogEntry('${entry.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
  })

  container.innerHTML = html || '<p class="text-muted">No hay entradas de blog disponibles.</p>'
}

function saveBlogEntry() {
  const entryId = generateBlogId()
  const entryData = {
    id: entryId,
    title: document.getElementById("blogTitle").value,
    content: document.getElementById("blogContent").value,
    author: document.getElementById("blogAuthor").value,
    date: new Date().toISOString().split("T")[0],
    status: "published",
  }

  if (!entryData.title || !entryData.content || !entryData.author) {
    showNotification("Por favor completa todos los campos", "danger")
    return
  }

  adminData.blogEntries.push(entryData)
  localStorage.setItem("admin_blog", JSON.stringify(adminData.blogEntries))

  const modalEl = document.getElementById("blogModal")
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl)
    if (modal) modal.hide()
  }

  document.getElementById("blogForm").reset()
  loadBlogEntries()
  showNotification("Entrada de blog publicada correctamente", "success")
}

function deleteBlogEntry(entryId) {
  if (confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
    adminData.blogEntries = adminData.blogEntries.filter((entry) => entry.id !== entryId)
    localStorage.setItem("admin_blog", JSON.stringify(adminData.blogEntries))
    loadBlogEntries()
    showNotification("Entrada eliminada correctamente", "success")
  }
}

function generateBlogId() {
  return "blog" + (adminData.blogEntries.length + 1)
}

// ===== NEWS MANAGEMENT =====
function loadNews() {
  const container = document.getElementById("newsContainer")
  let html = ""

  adminData.news.forEach((newsItem) => {
    html += `
            <div class="content-card">
                <h5>${newsItem.title}</h5>
                <p>${newsItem.content.substring(0, 150)}...</p>
                <div class="content-meta">
                    <span><i class="bi bi-tag"></i> ${newsItem.category}</span>
                    <span><i class="bi bi-calendar"></i> ${newsItem.date}</span>
                    <div>
                        <button class="btn btn-warning btn-sm" onclick="editNews('${newsItem.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteNews('${newsItem.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
  })

  container.innerHTML = html || '<p class="text-muted">No hay noticias disponibles.</p>'
}

function saveNews() {
  const newsId = generateNewsId()
  const newsData = {
    id: newsId,
    title: document.getElementById("newsTitle").value,
    content: document.getElementById("newsContent").value,
    category: document.getElementById("newsCategory").value,
    date: new Date().toISOString().split("T")[0],
    status: "published",
  }

  if (!newsData.title || !newsData.content || !newsData.category) {
    showNotification("Por favor completa todos los campos", "danger")
    return
  }

  adminData.news.push(newsData)
  localStorage.setItem("admin_news", JSON.stringify(adminData.news))

  const modalEl = document.getElementById("newsModal")
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl)
    if (modal) modal.hide()
  }

  document.getElementById("newsForm").reset()
  loadNews()
  showNotification("Noticia publicada correctamente", "success")
}

function deleteNews(newsId) {
  if (confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
    adminData.news = adminData.news.filter((news) => news.id !== newsId)
    localStorage.setItem("admin_news", JSON.stringify(adminData.news))
    loadNews()
    showNotification("Noticia eliminada correctamente", "success")
  }
}

function generateNewsId() {
  return "news" + (adminData.news.length + 1)
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return "$" + Number(price).toLocaleString("es-CL")
}

function getImagePath(imageName) {
  return "../img/productos/" + imageName
}

function handleImageError(img) {
  img.onerror = null
  img.src = "../img/placeholder.svg"
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999;"
  notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 3000)
}

// Responsive sidebar handling
window.addEventListener("resize", () => {
  const sidebar = document.getElementById("adminSidebar")
  if (window.innerWidth > 768) {
    sidebar.classList.remove("show")
  }
})

function updatePageTitleWithNotifications(newOrdersCount) {
  const originalTitle = "Panel de Administración - LevelUp Gaming"

  if (newOrdersCount > 0) {
    document.title = `(${newOrdersCount}) ${originalTitle}`

    // Reset title after 30 seconds
    setTimeout(() => {
      document.title = originalTitle
    }, 30000)
  } else {
    document.title = originalTitle
  }
}

function showLowStockProducts(products = null) {
  const tableContainer = document.getElementById("lowStockTable")
  const cardsContainer = document.getElementById("lowStockCards")

  if (!tableContainer && !cardsContainer) return

  // Use provided products or load from localStorage
  let realProducts = products
  if (!realProducts) {
    const storedProducts = localStorage.getItem("levelup_products")
    if (storedProducts) {
      realProducts = JSON.parse(storedProducts)
    } else if (window.productCatalog) {
      realProducts = window.productCatalog
    } else {
      realProducts = {}
    }
  }

  const lowStockProducts = Object.values(realProducts).filter((product) => (product.stock || 0) <= 5)

  if (lowStockProducts.length === 0) {
    const emptyMessage = `
      <div class="text-center py-4">
        <i class="bi bi-check-circle text-success fs-1 mb-3"></i>
        <h6 class="text-success mb-2">¡Excelente!</h6>
        <p class="text-muted mb-0">Todos los productos tienen stock suficiente</p>
      </div>
    `

    if (tableContainer) {
      tableContainer.innerHTML = `<tr><td colspan="6">${emptyMessage}</td></tr>`
    }

    if (cardsContainer) {
      cardsContainer.innerHTML = `<div class="col-12">${emptyMessage}</div>`
    }
    return
  }

  if (tableContainer) {
    let tableHtml = ""
    lowStockProducts.forEach((product) => {
      const stock = product.stock || 0
      const statusClass = stock === 0 ? "danger" : stock <= 2 ? "warning" : "info"
      const statusText = stock === 0 ? "Sin stock" : stock <= 2 ? "Stock crítico" : "Stock bajo"
      const statusIcon = stock === 0 ? "x-circle" : stock <= 2 ? "exclamation-triangle" : "info-circle"

      tableHtml += `
        <tr>
          <td>
            <div class="d-flex align-items-center">
              <div class="product-image me-3">
                <i class="bi bi-box-seam"></i>
              </div>
              <div>
                <div class="product-name">${product.name}</div>
                <small class="text-muted">${product.code || "N/A"}</small>
              </div>
            </div>
          </td>
          <td>
            <span class="badge bg-secondary">${product.category}</span>
          </td>
          <td>
            <span class="badge bg-${statusClass}">${stock}</span>
          </td>
          <td>
            <span class="text-muted">5</span>
          </td>
          <td>
            <span class="badge bg-${statusClass}">
              <i class="bi bi-${statusIcon} me-1"></i>${statusText}
            </span>
          </td>
          <td>
            <a href="adminProductos.html" class="btn btn-sm btn-primary">
              <i class="bi bi-pencil"></i> Actualizar
            </a>
          </td>
        </tr>
      `
    })
    tableContainer.innerHTML = tableHtml
  }

  if (cardsContainer) {
    let cardsHtml = ""
    lowStockProducts.forEach((product) => {
      const stock = product.stock || 0
      const statusClass = stock === 0 ? "stock-critico" : stock <= 2 ? "stock-critico" : "stock-bajo"
      const statusText = stock === 0 ? "Sin Stock" : stock <= 2 ? "Stock Crítico" : "Stock Bajo"
      const cardClass = stock === 0 ? "stock-critical" : stock <= 2 ? "stock-critical" : "stock-low"

      cardsHtml += `
        <div class="col-12">
          <div class="product-stock-card ${cardClass}">
            <div class="card-header">
              <h6 class="product-name">${product.name}</h6>
              <span class="product-category">${product.category}</span>
            </div>
            
            <div class="stock-info">
              <div class="stock-item">
                <div class="stock-label">Stock Actual</div>
                <div class="stock-value stock-current ${stock <= 2 ? "critical" : ""}">${stock}</div>
              </div>
              <div class="stock-item">
                <div class="stock-label">Stock Mínimo</div>
                <div class="stock-value stock-minimum">5</div>
              </div>
            </div>
            
            <div class="card-status">
              <span class="status-badge ${statusClass}">${statusText}</span>
              <div class="card-actions">
                <a href="adminProductos.html" class="btn btn-primary btn-sm">
                  <i class="bi bi-pencil"></i> Actualizar
                </a>
              </div>
            </div>
          </div>
        </div>
      `
    })
    cardsContainer.innerHTML = cardsHtml
  }
}

function startOrderNotificationSystem() {
  initOrderNotifications()
}

function initOrderNotifications() {
  const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  const lastCheck = localStorage.getItem("admin_last_order_check")
  const currentTime = Date.now()

  if (!lastCheck) {
    localStorage.setItem("admin_last_order_check", currentTime.toString())
    localStorage.setItem("admin_last_notification_check", currentTime.toString())
    return
  }

  const newOrders = orders.filter((order) => {
    const orderTime = new Date(order.date).getTime()
    return orderTime > Number.parseInt(lastCheck)
  })

  if (newOrders.length > 0) {
    newOrders.forEach((order) => {
      showOrderNotification(order)
    })

    updateOrderNotifications()
    updatePageTitleWithNotifications(newOrders.length)
  }

  localStorage.setItem("admin_last_order_check", currentTime.toString())

  // Verificar nuevos pedidos cada 30 segundos
  setInterval(() => {
    checkForNewOrders()
  }, 30000)
}

function checkForNewOrders() {
  const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  const lastCheck = localStorage.getItem("admin_last_order_check")
  const currentTime = Date.now()

  if (!lastCheck) {
    localStorage.setItem("admin_last_order_check", currentTime.toString())
    localStorage.setItem("admin_last_notification_check", currentTime.toString())
    return
  }

  const newOrders = orders.filter((order) => {
    const orderTime = new Date(order.date).getTime()
    const lastCheck = localStorage.getItem("admin_last_notification_check") || "0"
    return orderTime > Number.parseInt(lastCheck)
  })

  if (newOrders.length > 0) {
    newOrders.forEach((order) => {
      showOrderNotification(order)
    })

    updateOrderNotifications()
    updatePageTitleWithNotifications(newOrders.length)
  }

  localStorage.setItem("admin_last_order_check", currentTime.toString())
}

function showOrderNotification(order) {
  const notification = document.createElement("div")
  notification.className = "toast align-items-center text-white bg-success border-0"
  notification.setAttribute("role", "alert")
  notification.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong><i class="bi bi-cart-check me-2"></i>Nuevo Pedido!</strong><br>
        ${order.id} - ${order.customer}<br>
        <small>Total: $${order.total.toLocaleString("es-CL")}</small>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `

  // Agregar al contenedor de toasts
  let toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.id = "toastContainer"
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3"
    document.body.appendChild(toastContainer)
  }

  toastContainer.appendChild(notification)

  const toast = new bootstrap.Toast(notification)
  toast.show()

  // Remover después de 5 segundos
  setTimeout(() => notification.remove(), 5000)
}

function updateOrderNotifications() {
  const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  const pendingOrders = orders.filter((order) => order.status === "pendiente").length
  const newOrders = orders.filter((order) => {
    const orderTime = new Date(order.date).getTime()
    const lastCheck = localStorage.getItem("admin_last_notification_check") || "0"
    return orderTime > Number.parseInt(lastCheck)
  }).length

  // Actualizar badge de notificaciones
  const notificationBadge = document.getElementById("notificationCount")
  if (notificationBadge) {
    const totalNotifications = Math.max(pendingOrders, newOrders)
    notificationBadge.textContent = totalNotifications
    notificationBadge.style.display = totalNotifications > 0 ? "inline" : "none"

    if (newOrders > 0) {
      notificationBadge.classList.add("bg-danger")
      notificationBadge.classList.remove("bg-warning")
    } else {
      notificationBadge.classList.add("bg-warning")
      notificationBadge.classList.remove("bg-danger")
    }
  }

  // Actualizar badge en sidebar
  const ordersBadge = document.getElementById("ordersBadge")
  if (ordersBadge) {
    if (pendingOrders > 0) {
      ordersBadge.textContent = pendingOrders
      ordersBadge.style.display = "inline"
    } else {
      ordersBadge.style.display = "none"
    }
  }

  updateNotificationDropdown(orders, pendingOrders, newOrders)
}

function updateNotificationDropdown(orders, pendingOrders, newOrders) {
  const notificationDropdown = document.querySelector(".notification-dropdown")
  if (!notificationDropdown) return

  // Get recent orders for notifications
  const recentOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  let notificationItems = ""

  if (newOrders > 0) {
    notificationItems += `
      <li><a class="dropdown-item text-success" href="adminPedidos.html">
        <i class="bi bi-cart-check text-success"></i> ${newOrders} nuevos pedidos recibidos
      </a></li>
    `
  }

  if (pendingOrders > 0) {
    notificationItems += `
      <li><a class="dropdown-item text-warning" href="adminPedidos.html">
        <i class="bi bi-clock text-warning"></i> ${pendingOrders} pedidos pendientes
      </a></li>
    `
  }

  // Add recent order notifications
  recentOrders.forEach((order) => {
    const timeAgo = getTimeAgo(new Date(order.date))
    notificationItems += `
      <li><a class="dropdown-item" href="adminPedidos.html">
        <i class="bi bi-cart text-info"></i> Pedido ${order.id} - ${order.customer}
        <small class="d-block text-muted">${timeAgo}</small>
      </a></li>
    `
  })

  // Update dropdown content
  const dropdownMenu = notificationDropdown.querySelector("ul")
  if (dropdownMenu) {
    dropdownMenu.innerHTML = `
      <li><h6 class="dropdown-header">Notificaciones de Pedidos</h6></li>
      ${notificationItems || '<li><a class="dropdown-item text-muted" href="#"><i class="bi bi-check-circle text-success"></i> No hay notificaciones nuevas</a></li>'}
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-center" href="adminPedidos.html">Ver todos los pedidos</a></li>
    `
  }
}
