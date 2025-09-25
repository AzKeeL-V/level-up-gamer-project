class AdminPedidos {
  constructor() {
    console.log("[v0] Constructor AdminPedidos iniciado")
    this.orders = []
    this.filteredOrders = []
    this.currentPage = 1
    this.itemsPerPage = 10
    console.log("[v0] Variables inicializadas, llamando init()")
    this.init()
  }

  init() {
    console.log("[v0] Inicializando AdminPedidos")
    console.log("[v0] Llamando loadOrders()")
    this.loadOrders()
    console.log("[v0] Llamando setupEventListeners()")
    this.setupEventListeners()
    console.log("[v0] Llamando updateLastUpdate()")
    this.updateLastUpdate()
    this.updateKPIs()
    console.log("[v0] Init completado")
  }

  setupEventListeners() {
    console.log("[v0] Configurando event listeners")
    const refreshBtn = document.getElementById("refreshOrders")
    console.log("[v0] Botón refresh encontrado:", !!refreshBtn)
    refreshBtn?.addEventListener("click", () => this.loadOrders())

    const exportBtn = document.getElementById("exportOrders")
    console.log("[v0] Botón export encontrado:", !!exportBtn)
    exportBtn?.addEventListener("click", () => this.exportOrders())

    // Filtros y búsqueda
    const statusFilter = document.getElementById("statusFilter")
    console.log("[v0] Status filter encontrado:", !!statusFilter)
    statusFilter?.addEventListener("change", () => this.applyFilters())

    const searchOrders = document.getElementById("searchOrders")
    console.log("[v0] Search input encontrado:", !!searchOrders)
    searchOrders?.addEventListener("input", () => this.applyFilters())

    const clearFilters = document.getElementById("clearFilters")
    console.log("[v0] Clear filters encontrado:", !!clearFilters)
    clearFilters?.addEventListener("click", () => this.clearFilters())

    // Paginación
    const prevPage = document.getElementById("prevPage")
    console.log("[v0] Prev page encontrado:", !!prevPage)
    prevPage?.addEventListener("click", () => this.changePage(-1))

    const nextPage = document.getElementById("nextPage")
    console.log("[v0] Next page encontrado:", !!nextPage)
    nextPage?.addEventListener("click", () => this.changePage(1))

    // Modal de detalles
    const updateOrderStatus = document.getElementById("updateOrderStatus")
    console.log("[v0] Update order status encontrado:", !!updateOrderStatus)
    updateOrderStatus?.addEventListener("click", () => this.updateOrderStatus())

    console.log("[v0] Event listeners configurados")
  }

  loadOrders() {
    console.log("[v0] Cargando pedidos...")
    console.log("[v0] Verificando localStorage...")

    const realOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []
    console.log("[v0] Pedidos reales encontrados:", realOrders.length)
    console.log("[v0] Datos de pedidos reales:", realOrders)

    console.log("[v0] Iniciando conversión de pedidos reales...")
    const convertedRealOrders = realOrders.map((order, index) => {
      console.log(`[v0] Convirtiendo pedido ${index + 1}:`, order)

      let customerName = "Cliente"
      if (typeof order.customer === "string") {
        customerName = order.customer
      } else if (typeof order.customer === "object" && order.customer) {
        customerName = order.customer.name || order.customer.nombre || "Cliente"
      } else if (order.customerInfo?.name) {
        customerName = order.customerInfo.name
      }

      const converted = {
        id: order.id,
        customer: customerName,
        email: order.email || order.customerInfo?.email || "sin-email@ejemplo.com",
        total: order.total || 0,
        date: order.date ? order.date.split("T")[0] : new Date().toISOString().split("T")[0],
        status: order.status || "pendiente",
        products: order.products || order.items || [],
        customerInfo: {
          name: customerName,
          email: order.email || order.customerInfo?.email || "sin-email@ejemplo.com",
          phone: order.customerInfo?.phone || order.customerInfo?.telefono || "+56900000000",
          rut: order.customerInfo?.rut || "11.111.111-1",
        },
        userId: order.userId || null,
      }
      console.log(`[v0] Pedido convertido ${index + 1}:`, converted)
      return converted
    })
    console.log("[v0] Conversión completada, pedidos convertidos:", convertedRealOrders.length)

    // Sample data for demonstration (keep existing sample orders)
    console.log("[v0] Agregando pedidos de muestra...")
    const sampleOrders = [
      {
        id: "PED-001",
        customer: "Carlos González Pérez",
        email: "carlos.gonzalez@gmail.com",
        total: 89990,
        date: "2025-01-18",
        status: "pendiente",
        products: [
          { name: "Controlador Xbox Series X", quantity: 1, price: 59990, subtotal: 59990 },
          { name: "Juego Catan", quantity: 1, price: 29990, subtotal: 29990 },
        ],
        customerInfo: {
          name: "Carlos González Pérez",
          email: "carlos.gonzalez@gmail.com",
          phone: "+56987654321",
          rut: "12.345.678-9",
        },
        userId: "user_001",
      },
      {
        id: "PED-002",
        customer: "María Rodríguez Silva",
        email: "maria.rodriguez@duocuc.cl",
        total: 349990,
        date: "2025-01-17",
        status: "procesando",
        products: [{ name: "Silla Gamer SecretLab Titan", quantity: 1, price: 349990, subtotal: 349990 }],
        customerInfo: {
          name: "María Rodríguez Silva",
          email: "maria.rodriguez@duocuc.cl",
          phone: "+56976543210",
          rut: "13.456.789-0",
        },
        userId: "user_002",
      },
      {
        id: "PED-003",
        customer: "Andrés López Martínez",
        email: "andres.lopez@outlook.com",
        total: 159980,
        date: "2025-01-16",
        status: "enviado",
        products: [
          { name: "Teclado Mecánico Razer", quantity: 1, price: 89990, subtotal: 89990 },
          { name: "Mouse Gaming Logitech", quantity: 1, price: 69990, subtotal: 69990 },
        ],
        customerInfo: {
          name: "Andrés López Martínez",
          email: "andres.lopez@outlook.com",
          phone: "+56965432109",
          rut: "14.567.890-1",
        },
        userId: "user_003",
      },
      {
        id: "PED-004",
        customer: "Valentina Morales Castro",
        email: "valentina.morales@duocuc.cl",
        total: 249990,
        date: "2025-01-15",
        status: "entregado",
        products: [
          { name: "Auriculares HyperX Cloud", quantity: 1, price: 129990, subtotal: 129990 },
          { name: "Webcam Logitech C920", quantity: 1, price: 119990, subtotal: 119990 },
        ],
        customerInfo: {
          name: "Valentina Morales Castro",
          email: "valentina.morales@duocuc.cl",
          phone: "+56954321098",
          rut: "15.678.901-2",
        },
        userId: "user_004",
      },
      {
        id: "PED-005",
        customer: "Diego Fernández Rojas",
        email: "diego.fernandez@gmail.com",
        total: 599990,
        date: "2025-01-14",
        status: "entregado",
        products: [
          { name: 'Monitor Gaming 27" 144Hz', quantity: 1, price: 399990, subtotal: 399990 },
          { name: "Cable HDMI 4K", quantity: 2, price: 19995, subtotal: 39990 },
        ],
        customerInfo: {
          name: "Diego Fernández Rojas",
          email: "diego.fernandez@gmail.com",
          phone: "+56943210987",
          rut: "16.789.012-3",
        },
        userId: "user_005",
      },
    ]

    console.log("[v0] Combinando pedidos...")
    this.orders = convertedRealOrders.concat(sampleOrders)
    console.log("[v0] Total de pedidos después de combinar:", this.orders.length)
    console.log("[v0] Pedidos finales:", this.orders)

    this.filteredOrders = this.orders
    console.log("[v0] Filtered orders establecidos:", this.filteredOrders.length)

    console.log("[v0] Llamando renderOrders()...")
    this.renderOrders()
  }

  applyFilters() {
    const statusFilter = document.getElementById("statusFilter").value
    const searchQuery = document.getElementById("searchOrders").value.toLowerCase()

    this.filteredOrders = this.orders.filter((order) => {
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery) || order.email.toLowerCase().includes(searchQuery)

      return matchesStatus && matchesSearch
    })

    this.currentPage = 1
    this.renderOrders()
  }

  clearFilters() {
    document.getElementById("statusFilter").value = "all"
    document.getElementById("searchOrders").value = ""

    this.filteredOrders = this.orders
    this.currentPage = 1
    this.renderOrders()
  }

  changePage(direction) {
    this.currentPage += direction
    if (this.currentPage < 1) this.currentPage = 1
    if (this.currentPage > Math.ceil(this.filteredOrders.length / this.itemsPerPage))
      this.currentPage = Math.ceil(this.filteredOrders.length / this.itemsPerPage)

    this.renderOrders()
  }

  updateOrderStatus() {
    const orderStatus = document.getElementById("orderStatus")
    const orderInfo = document.getElementById("orderInfo")

    if (!orderStatus || !orderInfo) {
      console.error("[v0] No se encontraron elementos necesarios para actualizar estado")
      return
    }

    // Obtener el ID del pedido desde la información mostrada
    const orderIdElement = orderInfo.querySelector("strong:contains('ID Pedido')")
    let orderId = null

    // Buscar el ID del pedido en el contenido del orderInfo
    const orderInfoText = orderInfo.textContent
    const idMatch = orderInfoText.match(/ID Pedido:\s*([^\s]+)/)
    if (idMatch) {
      orderId = idMatch[1]
    }

    if (!orderId) {
      console.error("[v0] No se pudo obtener el ID del pedido")
      alert("Error: No se pudo identificar el pedido")
      return
    }

    const newStatus = orderStatus.value
    console.log("[v0] Actualizando estado del pedido:", orderId, "a:", newStatus)

    // Buscar y actualizar el pedido en el array
    const orderIndex = this.orders.findIndex((order) => order.id === orderId)
    if (orderIndex === -1) {
      console.error("[v0] Pedido no encontrado en el array:", orderId)
      alert("Error: Pedido no encontrado")
      return
    }

    // Actualizar el estado
    this.orders[orderIndex].status = newStatus

    // Si es un pedido real (no de muestra), actualizar también en localStorage
    if (orderId.startsWith("ORDER-")) {
      const realOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []
      const realOrderIndex = realOrders.findIndex((order) => order.id === orderId)
      if (realOrderIndex !== -1) {
        realOrders[realOrderIndex].status = newStatus
        localStorage.setItem("levelup_orders", JSON.stringify(realOrders))
        console.log("[v0] Estado actualizado en localStorage")
      }
    }

    // Actualizar la información mostrada en el modal
    const orderInfoDiv = document.getElementById("orderInfo")
    if (orderInfoDiv) {
      const order = this.orders[orderIndex]
      orderInfoDiv.innerHTML = `
        <p class="mb-2"><strong>ID Pedido:</strong> ${order.id}</p>
        <p class="mb-2"><strong>Fecha:</strong> ${order.date || "Sin fecha"}</p>
        <p class="mb-2"><strong>Estado:</strong> <span class="badge bg-${this.getStatusColor(order.status)}">${order.status || "Sin estado"}</span></p>
        <p class="mb-0"><strong>Total:</strong> $${(order.total || 0).toLocaleString()}</p>
      `
    }

    // Actualizar la tabla principal
    this.applyFilters()
    this.updateKPIs()

    // Mostrar mensaje de éxito
    alert(`Estado del pedido ${orderId} actualizado a: ${newStatus}`)
    console.log("[v0] Estado actualizado exitosamente")
  }

  updateKPIs() {
    const totalOrders = this.orders.length
    const pendingOrders = this.orders.filter((order) => order.status === "pendiente").length
    const completedOrders = this.orders.filter((order) => order.status === "entregado").length
    const totalRevenue = this.orders.reduce((sum, order) => sum + (order.total || 0), 0)

    document.getElementById("totalOrders").textContent = totalOrders
    document.getElementById("pendingOrders").textContent = pendingOrders
    document.getElementById("completedOrders").textContent = completedOrders
    document.getElementById("totalRevenue").textContent = `$${totalRevenue.toLocaleString()}`
  }

  renderOrders() {
    console.log("[v0] === INICIANDO RENDER DE PEDIDOS ===")
    console.log("[v0] Página actual:", this.currentPage)
    console.log("[v0] Items por página:", this.itemsPerPage)
    console.log("[v0] Total pedidos filtrados:", this.filteredOrders.length)

    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    console.log("[v0] Rango de pedidos a mostrar:", start, "a", end)

    const ordersToDisplay = this.filteredOrders.slice(start, end)
    console.log("[v0] Pedidos a mostrar:", ordersToDisplay.length)
    console.log("[v0] Datos de pedidos a mostrar:", ordersToDisplay)

    this.renderDesktopOrders(ordersToDisplay)
    this.renderMobileOrders(ordersToDisplay)

    this.updateKPIs()
  }

  renderDesktopOrders(ordersToDisplay) {
    const ordersContainer = document.getElementById("ordersTableBody")
    console.log("[v0] Contenedor de pedidos encontrado:", !!ordersContainer)

    if (!ordersContainer) {
      console.error("[v0] ERROR: No se encontró el contenedor de pedidos con ID 'ordersTableBody'")
      return
    }

    console.log("[v0] Limpiando contenedor...")
    ordersContainer.innerHTML = ""

    console.log("[v0] Ocultando el loading row")
    const loadingRow = document.getElementById("loadingRow")
    if (loadingRow) {
      loadingRow.style.display = "none"
    }

    if (ordersToDisplay.length === 0) {
      console.log("[v0] No hay pedidos para mostrar")
      ordersContainer.innerHTML = '<tr><td colspan="7" class="text-center">No hay pedidos para mostrar</td></tr>'
      return
    }

    console.log("[v0] Generando HTML para cada pedido...")
    ordersToDisplay.forEach((order, index) => {
      const orderId = order.id || "Sin ID"
      const customerName = order.customer || "Sin nombre"
      const customerEmail = order.email || "Sin email"
      const orderTotal = order.total || 0
      const orderDate = order.date || "Sin fecha"
      const orderStatus = order.status || "Sin estado"

      const orderRow = document.createElement("tr")

      try {
        orderRow.innerHTML = `
          <td class="text-center">${orderId}</td>
          <td class="text-center">${customerName}</td>
          <td class="text-center d-none d-lg-table-cell">${customerEmail}</td>
          <td class="text-center">$${orderTotal.toLocaleString()}</td>
          <td class="text-center d-none d-md-table-cell">${orderDate}</td>
          <td class="text-center">
            <span class="badge bg-${this.getStatusColor(orderStatus)} px-3 py-2 fs-6">${orderStatus}</span>
          </td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary" onclick="viewOrderDetails('${orderId}')">
              <i class="bi bi-eye"></i>
            </button>
          </td>
        `

        ordersContainer.appendChild(orderRow)
      } catch (error) {
        console.error(`[v0] ERROR al procesar pedido ${index + 1}:`, error)
      }
    })
  }

  renderMobileOrders(ordersToDisplay) {
    const mobileContainer = document.getElementById("mobileOrdersCards")
    const mobileLoadingState = document.getElementById("mobileLoadingState")

    if (!mobileContainer) {
      console.error("[v0] ERROR: No se encontró el contenedor móvil de pedidos")
      return
    }

    // Ocultar loading state
    if (mobileLoadingState) {
      mobileLoadingState.style.display = "none"
    }

    console.log("[v0] Limpiando contenedor móvil...")
    mobileContainer.innerHTML = ""

    if (ordersToDisplay.length === 0) {
      mobileContainer.innerHTML = `
        <div class="text-center py-4">
          <i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i>
          <h6 class="text-muted mt-2">No hay pedidos para mostrar</h6>
        </div>
      `
      return
    }

    console.log("[v0] Generando tarjetas móviles...")
    ordersToDisplay.forEach((order) => {
      const orderId = order.id || "Sin ID"
      const customerName = order.customer || "Sin nombre"
      const customerEmail = order.email || "Sin email"
      const orderTotal = order.total || 0
      const orderDate = order.date || "Sin fecha"
      const orderStatus = order.status || "Sin estado"

      const orderCard = document.createElement("div")
      orderCard.className = "card mb-3 border-0 shadow-sm"

      orderCard.innerHTML = `
        <div class="card-body p-3">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 class="card-title mb-1 text-primary">${orderId}</h6>
              <p class="card-text mb-1 fw-semibold">${customerName}</p>
              <small class="text-muted">${customerEmail}</small>
            </div>
            <span class="badge bg-${this.getStatusColor(orderStatus)} px-2 py-1">${orderStatus}</span>
          </div>
          
          <div class="row g-2 mt-2">
            <div class="col-6">
              <small class="text-muted d-block">Total</small>
              <strong class="text-success">$${orderTotal.toLocaleString()}</strong>
            </div>
            <div class="col-6">
              <small class="text-muted d-block">Fecha</small>
              <strong>${orderDate}</strong>
            </div>
          </div>
          
          <div class="d-flex justify-content-end mt-3">
            <button class="btn btn-sm btn-outline-primary" onclick="viewOrderDetails('${orderId}')">
              <i class="bi bi-eye me-1"></i> Ver Detalles
            </button>
          </div>
        </div>
      `

      mobileContainer.appendChild(orderCard)
    })
  }

  exportOrders() {
    // Implement export orders logic here
  }

  updateLastUpdate() {
    const lastUpdateElement = document.getElementById("lastUpdate")
    lastUpdateElement.textContent = `Última actualización: ${new Date().toLocaleString()}`
  }

  getStatusColor(status) {
    switch (status) {
      case "pendiente":
        return "warning"
      case "procesando":
        return "info"
      case "enviado":
        return "primary"
      case "entregado":
        return "success"
      case "cancelado":
        return "danger"
      default:
        return "secondary"
    }
  }

  viewOrderDetails(orderId) {
    console.log("[v0] Mostrando detalles del pedido:", orderId)

    const order = this.orders.find((o) => o.id === orderId)
    if (!order) {
      console.error("[v0] Pedido no encontrado:", orderId)
      alert("Pedido no encontrado")
      return
    }

    console.log("[v0] Datos del pedido encontrado:", order)

    // Llenar información del cliente
    const customerInfo = document.getElementById("customerInfo")
    if (customerInfo) {
      customerInfo.innerHTML = `
        <p class="mb-2"><strong>Nombre:</strong> ${order.customer || "Sin nombre"}</p>
        <p class="mb-2"><strong>Email:</strong> ${order.email || "Sin email"}</p>
        <p class="mb-2"><strong>Teléfono:</strong> ${order.customerInfo?.phone || "Sin teléfono"}</p>
        <p class="mb-0"><strong>RUT:</strong> ${order.customerInfo?.rut || "Sin RUT"}</p>
      `
    }

    // Llenar información del pedido
    const orderInfo = document.getElementById("orderInfo")
    if (orderInfo) {
      orderInfo.innerHTML = `
        <p class="mb-2"><strong>ID Pedido:</strong> ${order.id}</p>
        <p class="mb-2"><strong>Fecha:</strong> ${order.date || "Sin fecha"}</p>
        <p class="mb-2"><strong>Estado:</strong> <span class="badge bg-${this.getStatusColor(order.status)}">${order.status || "Sin estado"}</span></p>
        <p class="mb-0"><strong>Total:</strong> $${(order.total || 0).toLocaleString()}</p>
      `
    }

    // Llenar la tabla de productos
    const orderProducts = document.getElementById("orderProducts")
    if (orderProducts) {
      orderProducts.innerHTML = ""
      if (order.products && order.products.length > 0) {
        order.products.forEach((product) => {
          const row = document.createElement("tr")
          row.innerHTML = `
            <td>${product.name || "Producto sin nombre"}</td>
            <td class="text-center">${product.quantity || 0}</td>
            <td class="text-center">$${(product.price || 0).toLocaleString()}</td>
            <td class="text-center">$${(product.subtotal || product.price * product.quantity || 0).toLocaleString()}</td>
          `
          orderProducts.appendChild(row)
        })
      } else {
        orderProducts.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos en este pedido</td></tr>'
      }
    }

    // Establecer el estado actual en el select
    const orderStatus = document.getElementById("orderStatus")
    if (orderStatus) {
      orderStatus.value = order.status || "pendiente"
    }

    const modalElement = document.getElementById("orderDetailModal")
    if (modalElement) {
      const Modal = window.bootstrap.Modal
      const modal = new Modal(modalElement)

      // Manejar el evento de cierre del modal para evitar el warning de aria-hidden
      modalElement.addEventListener(
        "hidden.bs.modal",
        () => {
          // Remover el foco de cualquier elemento dentro del modal
          const focusedElement = modalElement.querySelector(":focus")
          if (focusedElement) {
            focusedElement.blur()
          }
          // Devolver el foco al botón que abrió el modal si es posible
          const triggerButton = document.querySelector(`[onclick*="${orderId}"]`)
          if (triggerButton) {
            triggerButton.focus()
          }
        },
        { once: true },
      )

      modal.show()
    } else {
      console.error("[v0] Modal element not found")
    }
  }
}

window.viewOrderDetails = (orderId) => {
  if (window.adminPedidos) {
    window.adminPedidos.viewOrderDetails(orderId)
  } else {
    console.error("[v0] AdminPedidos no está inicializado")
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM cargado, inicializando AdminPedidos...")
  window.adminPedidos = new AdminPedidos()
  console.log("[v0] AdminPedidos inicializado exitosamente")
})

// También inicializar si el DOM ya está cargado
if (document.readyState === "loading") {
  console.log("[v0] DOM aún cargando, esperando DOMContentLoaded...")
} else {
  console.log("[v0] DOM ya cargado, inicializando AdminPedidos inmediatamente...")
  window.adminPedidos = new AdminPedidos()
  console.log("[v0] AdminPedidos inicializado exitosamente")
}
