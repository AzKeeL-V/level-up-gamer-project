// Gestión de productos - Página dedicada
class ProductManager {
  constructor() {
    this.products = []
    this.filteredProducts = []
    this.currentEditingId = null
    this.init()
  }

  init() {
    console.log("Inicializando ProductManager...")
    this.loadProducts()
    this.setupEventListeners()
    this.updateStats()
    this.loadProductsTable()
    this.updateOrdersBadge()
  }

  loadProducts() {
    console.log("Cargando productos desde localStorage...")
    const storedProducts = localStorage.getItem("levelup_products")

    const baseProducts = {
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

    if (storedProducts) {
      console.log("Productos encontrados en localStorage")
      const productCatalog = JSON.parse(storedProducts)
      this.products = Object.values(productCatalog)
      console.log("Productos cargados:", this.products.length)
    } else {
      console.log("No hay productos en localStorage, usando productos base")
      this.products = Object.values(baseProducts)
      this.saveProductsToStorage()
    }
    this.filteredProducts = [...this.products]
  }

  saveProductsToStorage() {
    console.log("Guardando productos en localStorage...")
    // Convertir array de productos a formato de main.js (objeto con keys por ID)
    const productCatalog = {}
    this.products.forEach((product) => {
      productCatalog[product.id] = {
        id: product.id,
        code: product.code,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        stock: product.stock,
        brand: product.brand,
        imageData: product.imageData,
      }
    })

    localStorage.setItem("levelup_products", JSON.stringify(productCatalog))
    console.log("Productos guardados correctamente")
  }

  setupEventListeners() {
    // Filtros y búsqueda
    document.getElementById("categoryFilter").addEventListener("change", () => this.filterProducts())
    document.getElementById("searchProducts").addEventListener("input", () => this.filterProducts())

    // Modal de producto
    document.getElementById("saveProduct").addEventListener("click", () => this.saveProduct())

    // Reset modal cuando se cierra
    document.getElementById("productModal").addEventListener("hidden.bs.modal", () => this.resetForm())

    // Confirmación de eliminación
    document.getElementById("confirmDelete").addEventListener("click", () => this.deleteProduct())

    document.getElementById("productImageFile").addEventListener("change", (e) => this.validateImage(e))

    document.getElementById("productCode").addEventListener("input", (e) => this.validateCodeRealTime(e))
    document.getElementById("productName").addEventListener("input", (e) => this.validateNameRealTime(e))

    document.getElementById("productStock").addEventListener("input", (e) => this.validateStockRealTime(e))
  }

  validateImage(event) {
    const file = event.target.files[0]
    const imagePreview = document.getElementById("imagePreview")
    const previewImg = document.getElementById("previewImg")
    const imageInfo = document.getElementById("imageInfo")
    const imageError = document.getElementById("imageError")

    // Reset states
    imagePreview.classList.add("d-none")
    imageError.classList.add("d-none")
    imageError.textContent = ""

    if (!file) return

    // Validate file type
    if (file.type !== "image/png") {
      imageError.textContent = "Error: Solo se permiten archivos PNG"
      imageError.classList.remove("d-none")
      event.target.value = ""
      return
    }

    const fileName = file.name.toLowerCase()
    const existingImageName = this.products.find((p) => {
      if (p.id === this.currentEditingId) return false // Skip current product when editing
      return p.image && p.image.toLowerCase() === fileName
    })

    if (existingImageName) {
      imageError.textContent = `Error: Ya existe una imagen con el nombre "${file.name}". Por favor renombra tu archivo.`
      imageError.classList.remove("d-none")
      event.target.value = ""
      return
    }

    // Create image to check dimensions
    const img = new Image()
    img.onload = () => {
      const maxWidth = 1920
      const maxHeight = 1080

      if (img.width > maxWidth || img.height > maxHeight) {
        imageError.textContent = `Error: La resolución máxima permitida es ${maxWidth}x${maxHeight}px. Tu imagen es ${img.width}x${img.height}px`
        imageError.classList.remove("d-none")
        event.target.value = ""
        return
      }

      // Show preview if validation passes
      previewImg.src = URL.createObjectURL(file)
      imageInfo.textContent = `Imagen válida: ${img.width}x${img.height}px, ${(file.size / 1024).toFixed(1)} KB`
      imagePreview.classList.remove("d-none")
    }

    img.onerror = () => {
      imageError.textContent = "Error: No se pudo cargar la imagen"
      imageError.classList.remove("d-none")
      event.target.value = ""
    }

    img.src = URL.createObjectURL(file)
  }

  updateStats() {
    const totalProducts = this.products.length
    const totalStock = this.products.reduce((sum, p) => sum + p.stock, 0)
    const lowStock = this.products.filter((p) => p.stock <= 5 && p.stock > 0).length
    const totalValue = this.products.reduce((sum, p) => sum + p.price * p.stock, 0)

    // Check if elements exist before trying to update them
    const totalProductsEl = document.getElementById("totalProducts")
    const productsInStockEl = document.getElementById("productsInStock")
    const lowStockProductsEl = document.getElementById("lowStockProducts")
    const totalStockValueEl = document.getElementById("totalStockValue")

    if (totalProductsEl) totalProductsEl.textContent = totalProducts
    if (productsInStockEl) productsInStockEl.textContent = totalStock
    if (lowStockProductsEl) lowStockProductsEl.textContent = lowStock
    if (totalStockValueEl) totalStockValueEl.textContent = this.formatPrice(totalValue)
  }

  filterProducts() {
    const categoryFilter = document.getElementById("categoryFilter")
    const searchProducts = document.getElementById("searchProducts")

    const category = categoryFilter ? categoryFilter.value : ""
    const search = searchProducts ? searchProducts.value.toLowerCase() : ""

    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = !category || product.category === category
      const matchesSearch =
        !search || product.name.toLowerCase().includes(search) || product.code.toLowerCase().includes(search)

      return matchesCategory && matchesSearch
    })

    this.loadProductsTable()
  }

  loadProductsTable() {
    const tbody = document.getElementById("productsTableBody")
    if (!tbody) {
      console.log("ERROR: productsTableBody not found!")
      return
    }

    if (this.filteredProducts.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-4">
                        <i class="bi bi-inbox display-4 text-muted"></i>
                        <p class="text-muted mt-2">No se encontraron productos</p>
                    </td>
                </tr>
            `
      return
    }

    tbody.innerHTML = this.filteredProducts
      .map(
        (product, index) => `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td class="text-center">
                    <code class="bg-light px-2 py-1 rounded">${product.code}</code>
                </td>
                <td class="text-center">${product.brand}</td>
                <td class="text-center">${product.name}</td>
                <td class="text-center">
                    <div class="product-description">${product.description}</div>
                </td>
                <td class="text-center">${this.formatPrice(product.price)}</td>
                <td class="text-center">${this.formatPrice(product.price * product.stock)}</td>
                <td class="text-center">
                    <span class="badge ${this.getStockBadgeClass(product.stock)}">
                        ${product.stock}
                    </span>
                </td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-primary" onclick="editProduct('${product.id}')" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-danger" onclick="confirmDeleteProduct('${product.id}')" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("")
  }

  getStockBadgeClass(stock) {
    if (stock === 0) return "bg-danger"
    if (stock <= 5) return "bg-warning"
    return "bg-success"
  }

  getStockStatus(stock) {
    if (stock === 0) {
      return '<span class="badge bg-danger">Sin Stock</span>'
    } else if (stock <= 5) {
      return '<span class="badge bg-warning">Stock Bajo</span>'
    } else {
      return '<span class="badge bg-success">Disponible</span>'
    }
  }

  editProduct(id) {
    console.log("editProduct called with id:", id)

    const product = this.products.find((p) => p.id === id)
    console.log("Found product:", product)

    if (!product) {
      console.log("Product not found!")
      return
    }

    this.currentEditingId = id
    console.log("Set currentEditingId to:", this.currentEditingId)

    const modalElement = document.getElementById("productModal")
    if (!modalElement) {
      console.log("ERROR: productModal element not found!")
      alert("Error: No se encontró el modal del producto")
      return
    }

    // Fill form fields
    const fields = {
      productId: product.id,
      productCode: product.code,
      productName: product.name,
      productCategory: product.category,
      productStock: product.stock,
      productDescription: product.description,
      productBrand: product.brand || "",
      productModel: product.name,
      productValue: product.price || "",
    }

    // Check and fill each field
    for (const [fieldId, value] of Object.entries(fields)) {
      const element = document.getElementById(fieldId)
      if (element) {
        element.value = value
      } else {
        console.log(`WARNING: Element ${fieldId} not found`)
      }
    }

    // Disable code field for editing
    const codeField = document.getElementById("productCode")
    if (codeField) codeField.disabled = true

    // Make image field optional for editing (remove required attribute)
    const imageField = document.getElementById("productImageFile")
    if (imageField) {
      imageField.removeAttribute("required")
    }

    // Update modal title
    const modalTitle = document.getElementById("modalTitle")
    if (modalTitle) modalTitle.textContent = "Editar Producto"

    console.log("All fields filled successfully")

    try {
      const bootstrap = window.bootstrap
      if (typeof bootstrap === "undefined") {
        console.log("ERROR: Bootstrap not loaded!")
        alert("Error: Bootstrap no está cargado")
        return
      }

      console.log("About to show modal...")
      const modal = new bootstrap.Modal(modalElement)
      console.log("Modal created successfully:", typeof modal)
      modal.show()
      console.log("Modal.show() called successfully")
    } catch (error) {
      console.log("ERROR showing modal:", error)
      alert("Error al mostrar el modal: " + error.message)
    }
  }

  confirmDeleteProduct(id) {
    const product = this.products.find((p) => p.id === id)
    if (!product) return

    this.currentEditingId = id
    document.getElementById("deleteProductName").textContent = product.name
    document.getElementById("deleteProductCode").textContent = product.code

    const bootstrap = window.bootstrap
    new bootstrap.Modal(document.getElementById("confirmDeleteModal")).show()
  }

  deleteProduct() {
    if (!this.currentEditingId) return

    console.log("Eliminando producto:", this.currentEditingId)
    this.products = this.products.filter((p) => p.id !== this.currentEditingId)
    this.saveProductsToStorage()
    this.filterProducts()
    this.updateStats()

    // Cerrar modal
    const bootstrap = window.bootstrap
    bootstrap.Modal.getInstance(document.getElementById("confirmDeleteModal")).hide()
    this.currentEditingId = null

    // Mostrar mensaje de éxito
    this.showAlert("Producto eliminado correctamente", "success")
  }

  saveProduct() {
    console.log("Guardando producto...")
    const form = document.getElementById("productForm")

    const codeInput = document.getElementById("productCode")
    const nameInput = document.getElementById("productName")
    const stockInput = document.getElementById("productStock")

    // Check if any field has validation errors
    if (
      codeInput.classList.contains("is-invalid") ||
      nameInput.classList.contains("is-invalid") ||
      stockInput.classList.contains("is-invalid")
    ) {
      this.showAlert("Por favor corrige los errores de validación antes de guardar", "danger")
      return
    }

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const imageFile = document.getElementById("productImageFile").files[0]
    let imageName = ""

    if (imageFile) {
      // New image selected
      imageName = imageFile.name

      const reader = new FileReader()
      reader.onload = (e) => {
        this.saveProductWithImage(imageName, e.target.result)
      }
      reader.readAsDataURL(imageFile)
      return
    } else if (this.currentEditingId) {
      // Editing existing product - check if it has an image
      const currentProduct = this.products.find((p) => p.id === this.currentEditingId)
      if (currentProduct && (currentProduct.image || currentProduct.imageData)) {
        // Product has existing image - conserve it automatically
        console.log("Conservando imagen existente del producto")
        this.saveProductWithImage("", "")
        return
      } else {
        // Existing product without image - require new one
        this.showAlert("Debe seleccionar una imagen para el producto", "danger")
        return
      }
    } else {
      // New product - image is required
      this.showAlert("Debe seleccionar una imagen para el producto", "danger")
      return
    }
  }

  saveProductWithImage(imageName, imageData) {
    const productData = {
      code: document.getElementById("productCode").value.trim(),
      name: document.getElementById("productName").value.trim(),
      category: document.getElementById("productCategory").value,
      price: Number.parseInt(document.getElementById("productValue").value) || 0,
      stock: Number.parseInt(document.getElementById("productStock").value),
      description: document.getElementById("productDescription").value.trim(),
      image:
        imageName || (this.currentEditingId ? this.products.find((p) => p.id === this.currentEditingId)?.image : ""),
      imageData:
        imageData ||
        (this.currentEditingId ? this.products.find((p) => p.id === this.currentEditingId)?.imageData : ""),
      brand: document.getElementById("productBrand").value.trim(),
    }

    if (this.currentEditingId) {
      // Editar producto existente
      console.log("Editando producto existente:", this.currentEditingId)
      const index = this.products.findIndex((p) => p.id === this.currentEditingId)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...productData }
      }
    } else {
      // Agregar nuevo producto - generar ID único
      console.log("Agregando nuevo producto")
      const newId = productData.code // Usar código como ID
      this.products.push({ id: newId, ...productData })
    }

    this.saveProductsToStorage()
    this.filterProducts()
    this.updateStats()

    this.syncWithCatalog()

    // Cerrar modal
    const bootstrap = window.bootstrap
    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide()

    // Mostrar mensaje de éxito
    const message = this.currentEditingId ? "Producto actualizado correctamente" : "Producto agregado correctamente"
    this.showAlert(message, "success")
  }

  syncWithCatalog() {
    // Trigger a custom event that main.js can listen to
    window.dispatchEvent(
      new CustomEvent("productsUpdated", {
        detail: { products: this.products },
      }),
    )
  }

  resetForm() {
    document.getElementById("productForm").reset()
    document.getElementById("productId").value = ""
    document.getElementById("modalTitle").textContent = "Agregar Producto"
    this.currentEditingId = null
    document.getElementById("productBrand").value = ""
    document.getElementById("productModel").value = ""
    document.getElementById("productValue").value = ""
    document.getElementById("productCode").disabled = false

    // Add back required attribute for image field when creating new products
    const imageField = document.getElementById("productImageFile")
    if (imageField) {
      imageField.setAttribute("required", "required")
    }

    document.getElementById("imagePreview").classList.add("d-none")
    document.getElementById("imageError").classList.add("d-none")
    document.getElementById("productImageFile").value = ""

    const inputs = ["productCode", "productName", "productStock"]
    inputs.forEach((inputId) => {
      const input = document.getElementById(inputId)
      if (input) {
        input.classList.remove("is-valid", "is-invalid")
      }
    })
  }

  validateCodeRealTime(event) {
    const input = event.target
    const code = input.value.trim()
    const feedback = document.getElementById("codeValidationFeedback")

    if (!feedback) {
      // Create feedback element if it doesn't exist
      const feedbackDiv = document.createElement("div")
      feedbackDiv.id = "codeValidationFeedback"
      feedbackDiv.className = "invalid-feedback"
      input.parentNode.appendChild(feedbackDiv)
    }

    if (code === "") {
      input.classList.remove("is-valid", "is-invalid")
      document.getElementById("codeValidationFeedback").textContent = ""
      return
    }

    const existingProduct = this.products.find(
      (p) => p.code.toLowerCase() === code.toLowerCase() && p.id !== this.currentEditingId,
    )

    if (existingProduct) {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
      document.getElementById("codeValidationFeedback").textContent = "Este código ya está en uso"
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      document.getElementById("codeValidationFeedback").textContent = ""
    }
  }

  validateNameRealTime(event) {
    const input = event.target
    const name = input.value.trim()
    const feedback = document.getElementById("nameValidationFeedback")

    if (!feedback) {
      // Create feedback element if it doesn't exist
      const feedbackDiv = document.createElement("div")
      feedbackDiv.id = "nameValidationFeedback"
      feedbackDiv.className = "invalid-feedback"
      input.parentNode.appendChild(feedbackDiv)
    }

    if (name === "") {
      input.classList.remove("is-valid", "is-invalid")
      document.getElementById("nameValidationFeedback").textContent = ""
      return
    }

    const existingProduct = this.products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== this.currentEditingId,
    )

    if (existingProduct) {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
      document.getElementById("nameValidationFeedback").textContent = "Este nombre ya está en uso"
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      document.getElementById("nameValidationFeedback").textContent = ""
    }
  }

  validateStockRealTime(event) {
    const input = event.target
    const stock = Number.parseInt(input.value)
    const feedback = document.getElementById("stockValidationFeedback")

    if (!feedback) {
      // Create feedback element if it doesn't exist
      const feedbackDiv = document.createElement("div")
      feedbackDiv.id = "stockValidationFeedback"
      feedbackDiv.className = "invalid-feedback"
      input.parentNode.appendChild(feedbackDiv)
    }

    if (input.value === "") {
      input.classList.remove("is-valid", "is-invalid")
      document.getElementById("stockValidationFeedback").textContent = ""
      return
    }

    if (isNaN(stock) || stock < 0) {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
      document.getElementById("stockValidationFeedback").textContent = "El stock no puede ser negativo"
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      document.getElementById("stockValidationFeedback").textContent = ""
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  showAlert(message, type) {
    // Crear alerta temporal
    const alertDiv = document.createElement("div")
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
    alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
    alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `

    document.body.appendChild(alertDiv)

    // Auto-remover después de 3 segundos
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove()
      }
    }, 3000)
  }

  updateOrdersBadge() {
    console.log("Actualizando badge de pedidos...")
    const ordersBadge = document.getElementById("ordersBadge")
    if (!ordersBadge) {
      console.log("ordersBadge no encontrado")
      return
    }

    // Obtener pedidos desde localStorage
    const realOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []
    console.log("Pedidos reales encontrados:", realOrders.length)

    // Contar pedidos pendientes
    const pendingOrders = realOrders.filter((order) => order.status === "pendiente").length
    console.log("Pedidos pendientes:", pendingOrders)

    // Actualizar el badge
    ordersBadge.textContent = pendingOrders

    // Cambiar el color del badge según el número de pedidos
    ordersBadge.className = "nav-badge"
    if (pendingOrders > 0) {
      ordersBadge.classList.add("bg-danger") // Rojo para pedidos pendientes
    } else {
      ordersBadge.classList.add("bg-secondary") // Gris cuando no hay pedidos pendientes
    }

    console.log("Badge actualizado:", pendingOrders, ordersBadge.className)
  }

  getImagePath(product) {
    // If product has base64 image data, use it
    if (product.imageData) {
      return product.imageData
    }

    // If product has image name, use relative path
    if (product.image) {
      return `../img/productos/${product.image}`
    }

    // Fallback to placeholder with relative path
    return "../img/placeholder.svg"
  }
}

let productManager = null

// Funciones globales que verifican si productManager está listo
window.editProduct = (id) => {
  console.log("Global editProduct called with id:", id)
  if (productManager && productManager.editProduct) {
    productManager.editProduct(id)
  } else {
    console.log("ProductManager not ready yet")
    alert("El sistema aún se está cargando, por favor espera un momento")
  }
}

window.confirmDeleteProduct = (id) => {
  console.log("Global confirmDeleteProduct called with id:", id)
  if (productManager && productManager.confirmDeleteProduct) {
    productManager.confirmDeleteProduct(id)
  } else {
    console.log("ProductManager not ready yet")
    alert("El sistema aún se está cargando, por favor espera un momento")
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing ProductManager...")
  try {
    productManager = new ProductManager()
    window.productManager = productManager
    console.log("ProductManager initialized successfully:", productManager)
  } catch (error) {
    console.log("Error initializing ProductManager:", error)
  }
})
