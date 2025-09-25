// ===== GESTIÓN DEL PERFIL DE USUARIO =====

console.log("[v0] perfil.js cargado - Solo funciones de perfil")

function loadUserProfile(user) {
  console.log("[v0] loadUserProfile llamada con usuario:", user)

  if (!user) {
    console.error("[v0] No se recibió usuario en loadUserProfile")
    return
  }

  // Actualizar elementos de solo lectura
  const profileNameEl = document.getElementById("profileName")
  const profileEmailEl = document.getElementById("profileEmail")
  const profileLevelEl = document.getElementById("profileLevel")
  const profilePointsEl = document.getElementById("profilePoints")
  const referralCodeEl = document.getElementById("referralCode")

  if (profileNameEl) {
    profileNameEl.textContent = user.fullName || user.nombreCompleto || "Usuario"
  }

  if (profileEmailEl) {
    profileEmailEl.textContent = user.email || "No disponible"
  }

  if (profileLevelEl) {
    profileLevelEl.textContent = user.level || 1
  }

  if (profilePointsEl) {
    const points = user.levelUpPoints || user.puntosReferidos || 0
    profilePointsEl.textContent = points.toLocaleString()
  }

  if (referralCodeEl) {
    const referralCode = user.codigoReferido || user.myReferralCode || user.referralCode
    if (referralCode) {
      referralCodeEl.textContent = referralCode
      console.log("[v0] Código de referido cargado:", referralCode)
    } else {
      // Si no tiene código, generar uno basado en el email
      const generatedCode = generateReferralCode(user.email)
      referralCodeEl.textContent = generatedCode
      console.log("[v0] Código de referido generado:", generatedCode)
    }
  }

  // Actualizar campos editables del formulario
  const updateFirstNameEl = document.getElementById("updateFirstName")
  const updateLastNameEl = document.getElementById("updateLastName")
  const updateRutEl = document.getElementById("updateRut")
  const updateEmailEl = document.getElementById("updateEmail")
  const updatePhoneEl = document.getElementById("updatePhone")

  if (updateFirstNameEl) {
    const fullName = user.fullName || user.nombreCompleto || ""
    const firstName = fullName.split(" ")[0] || ""
    updateFirstNameEl.value = firstName
  }

  if (updateLastNameEl) {
    const fullName = user.fullName || user.nombreCompleto || ""
    const lastName = fullName.split(" ").slice(1).join(" ") || ""
    updateLastNameEl.value = lastName
  }

  if (updateRutEl) {
    updateRutEl.value = user.rut || "No disponible"
  }

  if (updateEmailEl) {
    updateEmailEl.value = user.email || ""
  }

  if (updatePhoneEl) {
    updatePhoneEl.value = user.telefono || user.phone || ""
  }

  console.log("[v0] Perfil de usuario cargado exitosamente")
}

function loadCategoryPreferences() {
  console.log("[v0] Cargando preferencias de categoría...")
  const categories = [
    "Juegos de Mesa",
    "Accesorios",
    "Consolas",
    "Computadores Gamers",
    "Sillas Gamers",
    "Mouse",
    "Mousepad",
    "Poleras Personalizadas",
  ]
  const container = document.getElementById("categoryPreferences")

  const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
  const user = JSON.parse(sessionData)
  const preferences = user.categoryPreferences || []

  let html = ""
  categories.forEach((category) => {
    const isChecked = preferences.includes(category) ? "checked" : ""
    html += `  
            <div class="col-md-6 mb-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${category}" id="cat_${category.replace(/\s+/g, "_")}" ${isChecked}>
                    <label class="form-check-label text-light" for="cat_${category.replace(/\s+/g, "_")}">
                        ${category}
                    </label>
                </div>
            </div>
        `
  })

  container.innerHTML = html
}

function loadUserAddresses() {
  console.log("[v0] Cargando direcciones del usuario...")
  const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
  const user = JSON.parse(sessionData)
  const addresses = user.addresses || []

  const container = document.getElementById("addressList")

  if (addresses.length === 0) {
    container.innerHTML = `  
            <div class="text-center text-muted py-4">
                <i class="bi bi-geo-alt display-4"></i>
                <p class="mt-2">No tienes direcciones registradas</p>
            </div>
        `
    return
  }

  let html = ""
  addresses.forEach((address, index) => {
    html += `  
            <div class="card bg-secondary mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="card-title">${address.alias}</h6>
                            <p class="card-text mb-1">${address.street} ${address.number}</p>
                            <p class="card-text mb-1">${address.commune}, ${address.region}</p>
                            <small class="text-muted">Código Postal: ${address.postalCode}</small>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" onclick="editAddress(${index})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteAddress(${index})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
  })

  container.innerHTML = html
}

function loadOrderHistory() {
  console.log("[v0] Cargando historial de pedidos...")

  const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
  if (!sessionData) {
    console.log("[v0] No hay usuario logueado")
    return
  }

  const user = JSON.parse(sessionData)
  const allOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []

  // Filtrar pedidos del usuario actual
  const userOrders = allOrders.filter(
    (order) =>
      order.userId === user.id || order.customerInfo?.email === user.email || order.customer?.email === user.email,
  )

  console.log("[v0] Pedidos encontrados para el usuario:", userOrders)

  const container = document.getElementById("orderHistory")

  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="bi bi-box display-4"></i>
        <p class="mt-2">Aún no tienes pedidos realizados</p>
        <a href="catalogo.html" class="btn btn-primary">
          <i class="bi bi-shop"></i> Ir al Catálogo
        </a>
      </div>
    `
    return
  }

  // Ordenar pedidos por fecha (más recientes primero)
  userOrders.sort((a, b) => new Date(b.date) - new Date(a.date))

  let html = '<div class="row">'

  userOrders.forEach((order) => {
    const statusClass = getOrderStatusClass(order.status)
    const statusText = getOrderStatusText(order.status)
    const orderDate = new Date(order.date).toLocaleDateString("es-CL")

    html += `
      <div class="col-12 mb-3">
        <div class="card bg-secondary border-0">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-md-3">
                <h6 class="card-title mb-1 text-white">
                  <i class="bi bi-receipt me-2"></i>${order.id}
                </h6>
                <small class="text-muted">${orderDate}</small>
              </div>
              <div class="col-md-3">
                <span class="badge ${statusClass} fs-6">${statusText}</span>
              </div>
              <div class="col-md-3">
                <div class="text-white fw-bold">
                  $${order.total.toLocaleString("es-CL")}
                </div>
                <small class="text-muted">${order.items?.length || order.products?.length || 0} productos</small>
              </div>
              <div class="col-md-3 text-end">
                <button class="btn btn-outline-primary btn-sm" onclick="viewOrderDetails('${order.id}')">
                  <i class="bi bi-eye me-1"></i>Ver Detalles
                </button>
              </div>
            </div>
            
            <!-- Productos del pedido -->
            <div class="mt-3">
              <div class="row">
                ${(order.items || order.products || [])
                  .slice(0, 3)
                  .map(
                    (item) => `
                  <div class="col-md-4 mb-2">
                    <div class="d-flex align-items-center">
                      <div class="me-2">
                        <i class="bi bi-box text-primary"></i>
                      </div>
                      <div class="flex-grow-1">
                        <small class="text-white">${item.name || item.nombre}</small>
                        <br>
                        <small class="text-muted">Cant: ${item.quantity || item.cantidad}</small>
                      </div>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
                ${
                  (order.items || order.products || []).length > 3
                    ? `
                  <div class="col-md-12">
                    <small class="text-muted">+ ${(order.items || order.products).length - 3} productos más</small>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })

  html += "</div>"
  container.innerHTML = html
}

function loadPaymentMethods() {
  console.log("[v0] Cargando métodos de pago...")
  const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
  const user = JSON.parse(sessionData)

  const userPaymentKey = `levelup_payment_methods_${user.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

  console.log("[v0] Cargando medios de pago para usuario:", user.email)
  console.log("[v0] Medios de pago encontrados:", paymentMethods)

  const container = document.getElementById("paymentMethodsList")

  if (paymentMethods.length === 0) {
    container.innerHTML = `  
            <div class="text-center text-muted py-4">
                <i class="bi bi-credit-card display-4"></i>
                <p class="mt-2">Aún no tienes medios de pago registrados</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paymentMethodModal">
                    <i class="bi bi-plus"></i> Agregar tu primer medio de pago
                </button>
            </div>
        `
    return
  }

  let html = '<div class="row">'
  paymentMethods.forEach((payment, index) => {
    const isDefault = payment.isDefault ? '<span class="badge bg-success ms-2">Predeterminado</span>' : ""
    const cardIcon = getPaymentIcon(payment.type)
    const maskedNumber = maskPaymentNumber(payment.number)
    const displayName = payment.alias || getPaymentTypeText(payment.type)

    html += `  
            <div class="col-md-4 mb-3">
                <div class="card bg-secondary h-100 payment-method-card" style="border: 2px solid #0d6efd; border-radius: 10px;">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi ${cardIcon} fs-2 me-3 text-primary"></i>
                            <div class="flex-grow-1">
                                <h6 class="card-title mb-1 text-truncate">
                                    ${displayName}
                                    ${isDefault}
                                </h6>
                                <p class="card-text mb-1 small">${maskedNumber}</p>
                                ${
                                  payment.type.includes("tarjeta")
                                    ? `<small class="text-muted">Vence: ${payment.expiryMonth}/${payment.expiryYear}</small>`
                                    : `<small class="text-muted">${getBankName(payment.bank)}</small>`
                                }
                            </div>
                        </div>
                        <div class="mt-auto">
                            <div class="btn-group w-100" role="group">
                                ${
                                  !payment.isDefault
                                    ? `<button class="btn btn-sm btn-outline-success" onclick="setDefaultPaymentMethod(${index})" title="Establecer como predeterminado">
                                        <i class="bi bi-star"></i>
                                    </button>`
                                    : `<button class="btn btn-sm btn-success" disabled title="Ya es predeterminado">
                                        <i class="bi bi-star-fill"></i>
                                    </button>`
                                }
                                <button class="btn btn-sm btn-outline-primary" onclick="editPaymentMethod(${index})" title="Editar">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deletePaymentMethod(${index})" title="Eliminar">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  })
  html += "</div>"

  if (paymentMethods.length < 3) {
    html += `  
            <div class="text-center mt-3">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#paymentMethodModal">
                    <i class="bi bi-plus"></i> Agregar Medio de Pago (${paymentMethods.length}/3)
                </button>
            </div>
        `
  } else {
    html += `  
            <div class="alert alert-info text-center mt-3">
                <i class="bi bi-info-circle me-2"></i>
                Has alcanzado el límite máximo de 3 medios de pago. Elimina uno para agregar otro.
            </div>
        `
  }

  container.innerHTML = html
}

function setupProfileForm() {
  console.log("[v0] Configurando formulario de perfil...")
  const form = document.getElementById("profileUpdateForm")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    updateUserProfile()
  })
}

function updateUserProfile() {
  const sessionData =
    sessionStorage.getItem("levelup_session") ||
    localStorage.getItem("levelup_session") ||
    localStorage.getItem("usuario_logueado") ||
    localStorage.getItem("currentUser")
  const user = JSON.parse(sessionData)

  // Obtener datos del formulario
  const firstName = document.getElementById("updateFirstName").value.trim()
  const lastName = document.getElementById("updateLastName").value.trim()
  const phone = document.getElementById("updatePhone").value.trim()
  const newPassword = document.getElementById("updatePassword").value
  const confirmPassword = document.getElementById("confirmUpdatePassword").value

  // Validaciones
  if (!firstName) {
    showNotification("El nombre es requerido", "danger")
    return
  }

  if (!lastName) {
    showNotification("El apellido es requerido", "danger")
    return
  }

  if (newPassword && newPassword !== confirmPassword) {
    showNotification("Las contraseñas no coinciden", "danger")
    return
  }

  if (newPassword && newPassword.length < 8) {
    showNotification("La contraseña debe tener al menos 8 caracteres", "danger")
    return
  }

  // Actualizar datos del usuario
  user.firstName = firstName
  user.lastName = lastName
  user.nombreCompleto = `${firstName} ${lastName}` // Para compatibilidad
  if (phone) user.phone = phone
  if (newPassword) user.password = newPassword

  // Actualizar en el sistema de usuarios
  const updateUserData = window.updateUserData // Declare the variable before using it
  if (typeof updateUserData === "function") {
    const result = updateUserData(user.email, user)
    if (result.success) {
      // Actualizar sesión
      const storage = localStorage.getItem("levelup_session") ? localStorage : sessionStorage
      storage.setItem("levelup_session", JSON.stringify(user))

      showNotification("Perfil actualizado correctamente", "success")
      loadUserProfile(user) // Recargar datos
    } else {
      showNotification(result.message, "danger")
    }
  }
}

function savePreferences() {
  const sessionData =
    sessionStorage.getItem("levelup_session") ||
    localStorage.getItem("levelup_session") ||
    localStorage.getItem("usuario_logueado") ||
    localStorage.getItem("currentUser")
  const user = JSON.parse(sessionData)

  // Obtener categorías seleccionadas
  const checkboxes = document.querySelectorAll('#categoryPreferences input[type="checkbox"]:checked')
  const preferences = Array.from(checkboxes).map((cb) => cb.value)

  user.categoryPreferences = preferences

  // Actualizar en el sistema
  const updateUserData = window.updateUserData // Declare the variable before using it
  if (typeof updateUserData === "function") {
    const result = updateUserData(user.email, user)
    if (result.success) {
      const storage = localStorage.getItem("levelup_session") ? localStorage : sessionStorage
      storage.setItem("levelup_session", JSON.stringify(user))
      showNotification("Preferencias guardadas correctamente", "success")
    } else {
      showNotification(result.message, "danger")
    }
  }
}

function generateReferralCode(email) {
  const prefix = "REF-"
  const hash = email.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return prefix + Math.abs(hash).toString().padStart(6, "0")
}

function addNewAddress() {
  // Implementar modal para agregar nueva dirección
  showNotification("Funcionalidad en desarrollo", "info")
}

function editAddress(index) {
  // Implementar edición de dirección
  showNotification("Funcionalidad en desarrollo", "info")
}

function deleteAddress(index) {
  if (confirm("¿Estás seguro de que deseas eliminar esta dirección?")) {
    const sessionData =
      sessionStorage.getItem("levelup_session") ||
      localStorage.getItem("levelup_session") ||
      localStorage.getItem("usuario_logueado") ||
      localStorage.getItem("currentUser")
    const user = JSON.parse(sessionData)

    user.addresses.splice(index, 1)

    const updateUserData = window.updateUserData // Declare the variable before using it
    if (typeof updateUserData === "function") {
      const result = updateUserData(user.email, user)
      if (result.success) {
        const storage = localStorage.getItem("levelup_session") ? localStorage : sessionStorage
        storage.setItem("levelup_session", JSON.stringify(user))
        loadUserAddresses()
        showNotification("Dirección eliminada correctamente", "success")
      }
    }
  }
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  notification.style.cssText = "top: 20px; right: 20px; z-index: 9999;"
  notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 3000)
}

function copyReferralCode(code) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        showNotification("Código de referido copiado al portapapeles", "success")

        // Cambiar temporalmente el texto del botón
        const button = document.getElementById("copyReferralButton")
        const originalText = button.innerHTML
        button.innerHTML = '<i class="bi bi-check"></i> Copiado'
        button.classList.remove("btn-outline-primary")
        button.classList.add("btn-success")

        setTimeout(() => {
          button.innerHTML = originalText
          button.classList.remove("btn-success")
          button.classList.add("btn-outline-primary")
        }, 2000)
      })
      .catch(() => {
        fallbackCopyTextToClipboard(code)
      })
  } else {
    fallbackCopyTextToClipboard(code)
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand("copy")
    showNotification("Código de referido copiado al portapapeles", "success")
  } catch (err) {
    showNotification("No se pudo copiar el código. Cópialo manualmente: " + text, "warning")
  }

  document.body.removeChild(textArea)
}

function setupPaymentMethodForm() {
  console.log("[v0] Configurando formulario de métodos de pago...")
  const form = document.getElementById("paymentMethodForm")
  const paymentType = document.getElementById("paymentType")
  const cardFields = document.getElementById("cardFields")
  const bankFields = document.getElementById("bankFields")
  const saveButton = document.getElementById("savePaymentMethod")
  const cardNumber = document.getElementById("cardNumber")
  const cardYear = document.getElementById("cardYear")

  // Llenar años de vencimiento
  const currentYear = new Date().getFullYear()
  for (let i = 0; i < 15; i++) {
    const year = currentYear + i
    cardYear.innerHTML += `<option value="${year}">${year}</option>`
  }

  // Mostrar/ocultar campos según el tipo
  paymentType.addEventListener("change", () => {
    const type = paymentType.value
    if (type.includes("tarjeta")) {
      cardFields.classList.remove("d-none")
      bankFields.classList.add("d-none")
      setCardFieldsRequired(true)
      setBankFieldsRequired(false)
    } else if (type.includes("cuenta")) {
      cardFields.classList.add("d-none")
      bankFields.classList.remove("d-none")
      setCardFieldsRequired(false)
      setBankFieldsRequired(true)
    } else {
      cardFields.classList.add("d-none")
      bankFields.classList.add("d-none")
      setCardFieldsRequired(false)
      setBankFieldsRequired(false)
    }
  })

  // Formatear número de tarjeta
  cardNumber.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
    if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19)
    e.target.value = formattedValue
  })

  // Guardar medio de pago
  saveButton.addEventListener("click", () => {
    savePaymentMethod()
  })
}

function setCardFieldsRequired(required) {
  document.getElementById("cardNumber").required = required
  document.getElementById("cardCvv").required = required
  document.getElementById("cardMonth").required = required
  document.getElementById("cardYear").required = required
  document.getElementById("cardName").required = required
}

function setBankFieldsRequired(required) {
  document.getElementById("bankName").required = required
  document.getElementById("accountNumber").required = required
}

function savePaymentMethod() {
  const sessionData =
    sessionStorage.getItem("levelup_session") ||
    localStorage.getItem("levelup_session") ||
    localStorage.getItem("usuario_logueado") ||
    localStorage.getItem("currentUser")
  const user = JSON.parse(sessionData)

  const userPaymentKey = `levelup_payment_methods_${user.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

  console.log("[v0] Guardando medio de pago para usuario:", user.email)
  console.log("[v0] Medios de pago actuales:", paymentMethods)

  const paymentMethodId = document.getElementById("paymentMethodId").value
  if (!paymentMethodId && paymentMethods.length >= 3) {
    showNotification("Has alcanzado el límite máximo de 3 medios de pago", "warning")
    return
  }

  const type = document.getElementById("paymentType").value
  const alias = document.getElementById("paymentAlias").value
  const isDefault = document.getElementById("isDefault").checked

  if (!type) {
    showNotification("Selecciona un tipo de medio de pago", "danger")
    return
  }

  const paymentData = {
    type: type,
    alias: alias,
    isDefault: isDefault,
    createdAt: new Date().toISOString(),
  }

  if (type.includes("tarjeta")) {
    const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, "")
    const cardCvv = document.getElementById("cardCvv").value
    const cardMonth = document.getElementById("cardMonth").value
    const cardYear = document.getElementById("cardYear").value
    const cardName = document.getElementById("cardName").value

    if (!cardNumber || !cardCvv || !cardMonth || !cardYear || !cardName) {
      showNotification("Completa todos los campos de la tarjeta", "danger")
      return
    }

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      showNotification("Número de tarjeta inválido", "danger")
      return
    }

    paymentData.number = cardNumber
    paymentData.cvv = cardCvv // En producción esto se encriptaría
    paymentData.expiryMonth = cardMonth
    paymentData.expiryYear = cardYear
    paymentData.cardName = cardName
  } else if (type.includes("cuenta")) {
    const bankName = document.getElementById("bankName").value
    const accountNumber = document.getElementById("accountNumber").value

    if (!bankName || !accountNumber) {
      showNotification("Completa todos los campos de la cuenta", "danger")
      return
    }

    paymentData.bank = bankName
    paymentData.number = accountNumber
  }

  // Si es predeterminado, quitar el flag de otros métodos
  if (isDefault) {
    paymentMethods.forEach((method) => {
      method.isDefault = false
    })
  }

  // Si es el primer método, hacerlo predeterminado automáticamente
  if (paymentMethods.length === 0) {
    paymentData.isDefault = true
  }

  if (paymentMethodId) {
    // Editar método existente
    const index = Number.parseInt(paymentMethodId)
    paymentMethods[index] = { ...paymentMethods[index], ...paymentData }
  } else {
    // Agregar nuevo método
    paymentData.id = Date.now().toString()
    paymentMethods.push(paymentData)
  }

  localStorage.setItem(userPaymentKey, JSON.stringify(paymentMethods))
  console.log("[v0] Medios de pago guardados:", paymentMethods)

  loadPaymentMethods()
  resetPaymentMethodForm()

  // Cerrar modal
  const modal = window.bootstrap.Modal.getInstance(document.getElementById("paymentMethodModal"))
  modal.hide()

  showNotification("Medio de pago guardado correctamente", "success")
}

function editPaymentMethod(index) {
  const sessionData =
    sessionStorage.getItem("levelup_session") ||
    localStorage.getItem("levelup_session") ||
    localStorage.getItem("usuario_logueado") ||
    localStorage.getItem("currentUser")
  const user = JSON.parse(sessionData)

  const userPaymentKey = `levelup_payment_methods_${user.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []
  const payment = paymentMethods[index]

  document.getElementById("paymentMethodId").value = index
  document.getElementById("paymentType").value = payment.type
  document.getElementById("paymentAlias").value = payment.alias || ""
  document.getElementById("isDefault").checked = payment.isDefault || false

  // Disparar evento change para mostrar campos correctos
  document.getElementById("paymentType").dispatchEvent(new Event("change"))

  if (payment.type.includes("tarjeta")) {
    document.getElementById("cardNumber").value = payment.number.replace(/(.{4})/g, "$1 ").trim()
    document.getElementById("cardCvv").value = payment.cvv
    document.getElementById("cardMonth").value = payment.expiryMonth
    document.getElementById("cardYear").value = payment.expiryYear
    document.getElementById("cardName").value = payment.cardName
  } else if (payment.type.includes("cuenta")) {
    document.getElementById("bankName").value = payment.bank
    document.getElementById("accountNumber").value = payment.number
  }

  document.getElementById("paymentModalTitle").textContent = "Editar Medio de Pago"
  new window.bootstrap.Modal(document.getElementById("paymentMethodModal")).show()
}

function deletePaymentMethod(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este medio de pago?")) {
    const sessionData =
      sessionStorage.getItem("levelup_session") ||
      localStorage.getItem("levelup_session") ||
      localStorage.getItem("usuario_logueado") ||
      localStorage.getItem("currentUser")
    const user = JSON.parse(sessionData)

    const userPaymentKey = `levelup_payment_methods_${user.email}`
    const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

    const wasDefault = paymentMethods[index].isDefault
    paymentMethods.splice(index, 1)

    // Si era el predeterminado y quedan métodos, hacer predeterminado el primero
    if (wasDefault && paymentMethods.length > 0) {
      paymentMethods[0].isDefault = true
    }

    localStorage.setItem(userPaymentKey, JSON.stringify(paymentMethods))

    loadPaymentMethods()
    showNotification("Medio de pago eliminado correctamente", "success")
  }
}

function setDefaultPaymentMethod(index) {
  const sessionData =
    sessionStorage.getItem("levelup_session") ||
    localStorage.getItem("levelup_session") ||
    localStorage.getItem("usuario_logueado") ||
    localStorage.getItem("currentUser")
  const user = JSON.parse(sessionData)

  const userPaymentKey = `levelup_payment_methods_${user.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

  // Quitar flag predeterminado de todos
  paymentMethods.forEach((method) => {
    method.isDefault = false
  })

  // Establecer como predeterminado
  paymentMethods[index].isDefault = true

  localStorage.setItem(userPaymentKey, JSON.stringify(paymentMethods))

  loadPaymentMethods()
  showNotification("Medio de pago predeterminado actualizado", "success")
}

function resetPaymentMethodForm() {
  document.getElementById("paymentMethodForm").reset()
  document.getElementById("paymentMethodId").value = ""
  document.getElementById("cardFields").classList.add("d-none")
  document.getElementById("bankFields").classList.add("d-none")
  document.getElementById("paymentModalTitle").textContent = "Agregar Medio de Pago"
  setCardFieldsRequired(false)
  setBankFieldsRequired(false)
}

function getPaymentIcon(type) {
  const icons = {
    tarjeta_credito: "bi-credit-card",
    tarjeta_debito: "bi-credit-card-2-front",
    cuenta_corriente: "bi-bank",
    cuenta_vista: "bi-bank2",
  }
  return icons[type] || "bi-credit-card"
}

function getPaymentTypeText(type) {
  const texts = {
    tarjeta_credito: "Tarjeta de Crédito",
    tarjeta_debito: "Tarjeta de Débito",
    cuenta_corriente: "Cuenta Corriente",
    cuenta_vista: "Cuenta Vista",
  }
  return texts[type] || type
}

function getBankName(bankCode) {
  const banks = {
    banco_chile: "Banco de Chile",
    banco_estado: "BancoEstado",
    santander: "Santander",
    bci: "BCI",
    scotiabank: "Scotiabank",
    itau: "Itaú",
    security: "Security",
    falabella: "Banco Falabella",
    ripley: "Banco Ripley",
    consorcio: "Consorcio",
  }
  return banks[bankCode] || bankCode
}

function maskPaymentNumber(number) {
  if (!number) return ""
  if (number.length <= 4) return number

  const last4 = number.slice(-4)
  const masked = "*".repeat(number.length - 4)

  // Para tarjetas, formatear con espacios
  if (number.length >= 13) {
    return (masked + last4).replace(/(.{4})/g, "$1 ").trim()
  }

  return masked + last4
}

// Event listener para resetear formulario cuando se abre el modal
document.getElementById("paymentMethodModal")?.addEventListener("show.bs.modal", () => {
  resetPaymentMethodForm()
})

window.loadUserProfile = loadUserProfile
window.loadCategoryPreferences = loadCategoryPreferences
window.loadUserAddresses = loadUserAddresses
window.loadOrderHistory = loadOrderHistory
window.loadPaymentMethods = loadPaymentMethods
window.setupProfileForm = setupProfileForm
window.setupPaymentMethodForm = setupPaymentMethodForm
window.updateUserProfile = updateUserProfile
window.savePreferences = savePreferences
window.addNewAddress = addNewAddress
window.editAddress = editAddress
window.deleteAddress = deleteAddress
window.copyReferralCode = copyReferralCode
window.editPaymentMethod = editPaymentMethod
window.deletePaymentMethod = deletePaymentMethod
window.setDefaultPaymentMethod = setDefaultPaymentMethod

console.log("[v0] Funciones de perfil expuestas al objeto window")

function getOrderStatusClass(status) {
  const classes = {
    pendiente: "bg-warning",
    procesando: "bg-info",
    enviado: "bg-primary",
    entregado: "bg-success",
    cancelado: "bg-danger",
    confirmed: "bg-success",
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
    confirmed: "Confirmado",
  }
  return texts[status] || status
}

function viewOrderDetails(orderId) {
  const allOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  const order = allOrders.find((o) => o.id === orderId)

  if (!order) {
    showNotification("Pedido no encontrado", "error")
    return
  }

  // Crear modal para mostrar detalles del pedido
  const modalHtml = `
    <div class="modal fade" id="orderDetailsModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header border-secondary">
            <h5 class="modal-title">
              <i class="bi bi-receipt me-2"></i>Detalles del Pedido ${order.id}
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-4">
              <div class="col-md-6">
                <h6 class="text-primary">Información del Pedido</h6>
                <p><strong>ID:</strong> ${order.id}</p>
                <p><strong>Fecha:</strong> ${new Date(order.date).toLocaleDateString("es-CL")}</p>
                <p><strong>Estado:</strong> <span class="badge ${getOrderStatusClass(order.status)}">${getOrderStatusText(order.status)}</span></p>
                <p><strong>Total:</strong> <span class="text-success fw-bold">$${order.total.toLocaleString("es-CL")}</span></p>
              </div>
              <div class="col-md-6">
                <h6 class="text-primary">Información de Entrega</h6>
                <p><strong>Método de Envío:</strong> ${order.shipping || "Estándar"}</p>
                <p><strong>Método de Pago:</strong> ${order.paymentMethod?.type || "No especificado"}</p>
              </div>
            </div>
            
            <h6 class="text-primary">Productos</h6>
            <div class="table-responsive">
              <table class="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${(order.items || order.products || [])
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.name || item.nombre}</td>
                      <td>${item.quantity || item.cantidad}</td>
                      <td>$${(item.price || item.precio || 0).toLocaleString("es-CL")}</td>
                      <td>$${(item.subtotal || item.price * item.quantity || 0).toLocaleString("es-CL")}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  `

  // Remover modal existente si existe
  const existingModal = document.getElementById("orderDetailsModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Agregar modal al DOM
  document.body.insertAdjacentHTML("beforeend", modalHtml)

  // Mostrar modal
  const modal = window.bootstrap.Modal.getInstance(document.getElementById("orderDetailsModal"))
  modal.show()
}

window.viewOrderDetails = viewOrderDetails

// Declare the bootstrap variable before using it
window.bootstrap = window.bootstrap || {}
