// Variable global para almacenar los datos del usuario logueado
// Se usa en todo el archivo para acceder a la información del usuario
// let currentUser = null - REMOVIDO

// ============================================================================
// DATOS DE REGIONES Y COMUNAS DE CHILE
// ============================================================================
// Este objeto contiene todas las regiones de Chile y sus respectivas comunas
// Se usa para poblar los dropdowns de región y comuna en el formulario
const regionesYComunas = {
  regiones: [
    // Cada región es un objeto con nombre y array de comunas
    { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    {
      nombre: "Tarapacá",
      comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    },
    {
      nombre: "Antofagasta",
      comunas: [
        "Antofagasta",
        "Mejillones",
        "Sierra Gorda",
        "Taltal",
        "Calama",
        "Ollagüe",
        "San Pedro de Atacama",
        "Tocopilla",
        "María Elena",
      ],
    },
    {
      nombre: "Atacama",
      comunas: [
        "Copiapó",
        "Caldera",
        "Tierra Amarilla",
        "Chañaral",
        "Diego de Almagro",
        "Vallenar",
        "Alto del Carmen",
        "Freirina",
        "Huasco",
      ],
    },
    {
      nombre: "Coquimbo",
      comunas: [
        "La Serena",
        "Coquimbo",
        "Andacollo",
        "La Higuera",
        "Paiguano",
        "Vicuña",
        "Illapel",
        "Canela",
        "Los Vilos",
        "Salamanca",
        "Ovalle",
        "Combarbalá",
        "Monte Patria",
        "Punitaqui",
        "Río Hurtado",
      ],
    },
    {
      nombre: "Valparaíso",
      comunas: [
        "Valparaíso",
        "Casablanca",
        "Concón",
        "Juan Fernández",
        "Puchuncaví",
        "Quintero",
        "Viña del Mar",
        "Isla de Pascua",
        "Los Andes",
        "Calle Larga",
        "Rinconada",
        "San Esteban",
        "La Ligua",
        "Cabildo",
        "Papudo",
        "Petorca",
        "Zapallar",
        "Quillota",
        "Calera",
        "Hijuelas",
        "La Cruz",
        "Nogales",
        "San Antonio",
        "Algarrobo",
        "Cartagena",
        "El Quisco",
        "El Tabo",
        "Santo Domingo",
        "San Felipe",
        "Catemu",
        "Llaillay",
        "Panquehue",
        "Putaendo",
        "Santa María",
        "Quilpué",
        "Limache",
        "Olmué",
        "Villa Alemana",
      ],
    },
    {
      nombre: "Metropolitana de Santiago",
      comunas: [
        "Cerrillos",
        "Cerro Navia",
        "Conchalí",
        "El Bosque",
        "Estación Central",
        "Huechuraba",
        "Independencia",
        "La Cisterna",
        "La Florida",
        "La Granja",
        "La Pintana",
        "La Reina",
        "Las Condes",
        "Lo Barnechea",
        "Lo Espejo",
        "Lo Prado",
        "Macul",
        "Maipú",
        "Ñuñoa",
        "Pedro Aguirre Cerda",
        "Peñalolén",
        "Providencia",
        "Pudahuel",
        "Quilicura",
        "Quinta Normal",
        "Recoleta",
        "Renca",
        "San Joaquín",
        "San Miguel",
        "San Ramón",
        "Santiago",
        "Vitacura",
        "Padre Hurtado",
        "Peñaflor",
        "Talagante",
        "El Monte",
        "Isla de Maipo",
        "Melipilla",
        "Alhué",
        "Curacaví",
        "María Pinto",
        "San Pedro",
        "Tiltil",
        "Colina",
        "Lampa",
        "San Bernardo",
        "Buin",
        "Calera de Tango",
        "Paine",
        "San José de Maipo",
        "Pirque",
        "Puente Alto",
      ],
    },
    {
      nombre: "Libertador General Bernardo O'Higgins",
      comunas: [
        "Rancagua",
        "Codegua",
        "Coinco",
        "Coltauco",
        "Doñihue",
        "Graneros",
        "Las Cabras",
        "Machalí",
        "Malloa",
        "Mostazal",
        "Olivar",
        "Peumo",
        "Pichidegua",
        "Quinta de Tilcoco",
        "Rengo",
        "Requínoa",
        "San Vicente",
        "Pichilemu",
        "La Estrella",
        "Litueche",
        "Marchihue",
        "Navidad",
        "Paredones",
        "San Fernando",
        "Chépica",
        "Chimbarongo",
        "Lolol",
        "Nancagua",
        "Palmilla",
        "Peralillo",
        "Placilla",
        "Pumanque",
        "Santa Cruz",
      ],
    },
    {
      nombre: "Maule",
      comunas: [
        "Talca",
        "Constitución",
        "Curepto",
        "Empedrado",
        "Maule",
        "Pelarco",
        "Pencahue",
        "Río Claro",
        "San Clemente",
        "San Rafael",
        "Cauquenes",
        "Chanco",
        "Pelluhue",
        "Curicó",
        "Hualañé",
        "Licantén",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquén",
        "Linares",
        "Colbún",
        "Longaví",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas",
      ],
    },
    {
      nombre: "Ñuble",
      comunas: [
        "Cobquecura",
        "Coelemu",
        "Ninhue",
        "Portezuelo",
        "Quirihue",
        "Ránquil",
        "Treguaco",
        "Bulnes",
        "Chillán Viejo",
        "Chillán",
        "El Carmen",
        "Pemuco",
        "Pinto",
        "Quillón",
        "San Ignacio",
        "Yungay",
        "Coihueco",
        "Ñiquén",
        "San Carlos",
        "San Fabián",
        "San Nicolás",
      ],
    },
    {
      nombre: "Biobío",
      comunas: [
        "Concepción",
        "Coronel",
        "Chiguayante",
        "Florida",
        "Hualqui",
        "Lota",
        "Penco",
        "San Pedro de la Paz",
        "Santa Juana",
        "Talcahuano",
        "Tomé",
        "Hualpén",
        "Lebu",
        "Arauco",
        "Cañete",
        "Contulmo",
        "Curanilahue",
        "Los Álamos",
        "Tirúa",
        "Los Ángeles",
        "Antuco",
        "Cabrero",
        "Laja",
        "Mulchén",
        "Nacimiento",
        "Negrete",
        "Quilaco",
        "Quilleco",
        "San Rosendo",
        "Santa Bárbara",
        "Tucapel",
        "Yumbel",
        "Alto Biobío",
      ],
    },
    {
      nombre: "Araucanía",
      comunas: [
        "Temuco",
        "Carahue",
        "Cunco",
        "Curarrehue",
        "Freire",
        "Galvarino",
        "Gorbea",
        "Loncoche",
        "Melipeuco",
        "Nueva Imperial",
        "Padre las Casas",
        "Perquenco",
        "Pitrufquén",
        "Pucón",
        "Saavedra",
        "Teodoro Schmidt",
        "Toltén",
        "Vilcún",
        "Villarrica",
        "Cholchol",
        "Angol",
        "Collipulli",
        "Curacautín",
        "Ercilla",
        "Lonquimay",
        "Los Sauces",
        "Lumaco",
        "Purén",
        "Renaico",
        "Traiguén",
        "Victoria",
      ],
    },
    {
      nombre: "Los Ríos",
      comunas: [
        "Valdivia",
        "Corral",
        "Lanco",
        "Los Lagos",
        "Máfil",
        "Mariquina",
        "Paillaco",
        "Panguipulli",
        "La Unión",
        "Futrono",
        "Lago Ranco",
        "Río Bueno",
      ],
    },
    {
      nombre: "Los Lagos",
      comunas: [
        "Puerto Montt",
        "Calbuco",
        "Cochamó",
        "Fresia",
        "Frutillar",
        "Los Muermos",
        "Llanquihue",
        "Maullín",
        "Puerto Varas",
        "Castro",
        "Ancud",
        "Chonchi",
        "Curaco de Vélez",
        "Dalcahue",
        "Puqueldón",
        "Queilén",
        "Quellón",
        "Quemchi",
        "Quinchao",
        "Osorno",
        "Puerto Octay",
        "Purranque",
        "Puyehue",
        "Río Negro",
        "San Juan de la Costa",
        "San Pablo",
        "Chaitén",
        "Futaleufú",
        "Hualaihué",
        "Palena",
      ],
    },
    {
      nombre: "Aysén del General Carlos Ibáñez del Campo",
      comunas: [
        "Coyhaique",
        "Lago Verde",
        "Aysén",
        "Cisnes",
        "Guaitecas",
        "Cochrane",
        "O'Higgins",
        "Tortel",
        "Chile Chico",
        "Río Ibáñez",
      ],
    },
    {
      nombre: "Magallanes y de la Antártica Chilena",
      comunas: [
        "Punta Arenas",
        "Laguna Blanca",
        "Río Verde",
        "San Gregorio",
        "Cabo de Hornos (Ex Navarino)",
        "Antártica",
        "Porvenir",
        "Primavera",
        "Timaukel",
        "Natales",
        "Torres del Paine",
      ],
    },
  ],
}

// ============================================================================
// IMPORTACIÓN DE BOOTSTRAP
// ============================================================================
// Bootstrap es una librería de CSS/JS para componentes UI como modales, botones, etc.
const bootstrap = window.bootstrap

// ============================================================================
// INICIALIZACIÓN DEL SISTEMA
// ============================================================================
// DOMContentLoaded se ejecuta cuando el HTML está completamente cargado
// Es el punto de entrada principal de nuestro sistema
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Funciones de autenticación expuestas al objeto window")
  console.log("[v0] Inicializando checkout sin Google Maps")

  initializeRegionsAndCommunes() // 1. Primero poblar los dropdowns de región y comuna
  checkUserSession() // 2. Después verificar si hay un usuario logueado y rellenar datos
  loadCart() // 3. Cargar los productos del carrito
  setupEventListeners() // 4. Configurar los botones y eventos
})

// ============================================================================
// GESTIÓN DE SESIÓN DE USUARIO
// ============================================================================

/**
 * Limpia completamente la sesión del usuario
 * Elimina todos los datos de localStorage y recarga la página
 */
function clearUserSession() {
  console.log("[v0] Limpiando sesión de usuario...")

  // localStorage es donde se guardan datos en el navegador
  // removeItem() elimina una clave específica
  localStorage.removeItem("usuario_logueado")
  localStorage.removeItem("usuarios")

  console.log("[v0] Sesión limpiada completamente")
  location.reload() // Recarga la página para reflejar cambios
}

/**
 * Verifica si la sesión actual es válida
 * @returns {boolean} true si la sesión es válida, false si no
 */
function isValidSession() {
  // getItem() obtiene un valor de localStorage
  const usuarioLogueado = localStorage.getItem("usuario_logueado")
  if (!usuarioLogueado) return false // Si no hay datos, sesión inválida

  try {
    // JSON.parse() convierte texto JSON en objeto JavaScript
    const loggedUser = JSON.parse(usuarioLogueado)

    // Verificar que tenga al menos email y nombre (datos mínimos requeridos)
    return loggedUser.email && loggedUser.nombre
  } catch (error) {
    // Si hay error al parsear JSON, la sesión está corrupta
    console.error("[v0] Error verificando sesión:", error)
    return false
  }
}

/**
 * Verifica si hay un usuario logueado y carga sus datos
 * Esta función busca en múltiples lugares donde puede estar guardada la sesión
 */
function checkUserSession() {
  // Buscar datos de sesión en diferentes ubicaciones
  // El operador || significa "o" - usa el primero que encuentre
  const usuarioLogueado =
    localStorage.getItem("usuario_logueado") || // Ubicación principal
    localStorage.getItem("levelup_session") || // Ubicación alternativa
    sessionStorage.getItem("levelup_session") // Sesión temporal

  console.log("[v0] Verificando sesión de usuario...")
  console.log("[v0] Datos de sesión encontrados:", usuarioLogueado)

  // Si no hay datos de sesión, salir sin hacer nada
  if (!usuarioLogueado) {
    console.log("[v0] No hay usuario logueado - checkout sin auto-rellenado")
    return
  }

  console.log("[v0] Usuario logueado encontrado, rellenando campos automáticamente...")

  try {
    // Convertir el texto JSON en objeto JavaScript
    const loggedUser = JSON.parse(usuarioLogueado)
    console.log("[v0] Datos del usuario logueado:", loggedUser)

    // Obtener arrays de usuarios desde localStorage (|| "[]" es valor por defecto)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const levelupUsers = JSON.parse(localStorage.getItem("levelup_users") || "[]")

    console.log("[v0] Buscando usuario en arrays...")
    console.log("[v0] Array usuarios:", usuarios.length, "elementos")
    console.log("[v0] Array levelup_users:", levelupUsers.length, "elementos")

    // find() busca el primer elemento que cumpla la condición
    // user => user.email === loggedUser.email es una función flecha
    const fullUser =
      usuarios.find((user) => user.email === loggedUser.email) || // Buscar primero aquí
      levelupUsers.find((user) => user.email === loggedUser.email) || // Luego aquí
      loggedUser // Usar datos de sesión como último recurso

    console.log("[v0] Usuario completo encontrado:", fullUser)

    if (fullUser) {
      // Diferentes sistemas pueden usar nombres diferentes para los mismos campos
      let firstName = fullUser.firstName || fullUser.nombre || ""
      let lastName = fullUser.lastName || fullUser.apellido || ""

      // Si no hay firstName/lastName pero hay nombreCompleto, dividirlo
      if (!firstName && !lastName && fullUser.nombreCompleto) {
        // split(" ") divide el texto en un array usando espacios
        const nameParts = fullUser.nombreCompleto.trim().split(" ")
        firstName = nameParts[0] || "" // Primer elemento
        lastName = nameParts.slice(1).join(" ") || "" // Resto de elementos unidos
      }

      window.currentUser = {
        email: fullUser.email,
        firstName: firstName,
        lastName: lastName,
        // El operador || significa "usar el primero que no sea null/undefined/vacío"
        rut:
          fullUser.rut ||
          fullUser.dni ||
          (fullUser.password && fullUser.password.startsWith("R") ? fullUser.password.substring(1) : ""),
        telefono:
          fullUser.telefono || fullUser.phone || fullUser.celular || fullUser.mobile || fullUser.phoneNumber || "",
        direcciones: fullUser.direcciones || fullUser.addresses || [],
        region: fullUser.region || "",
        comuna: fullUser.comuna || "",
        isAdmin: fullUser.isAdmin || false,
        role: fullUser.isAdmin ? "administrador" : "cliente",
      }

      console.log("[v0] Datos mapeados para auto-rellenado:", window.currentUser)

      localStorage.setItem("currentUser", JSON.stringify(window.currentUser))

      // Llamar función para rellenar los campos del formulario
      fillUserData(window.currentUser)

      const loginMessage = document.querySelector(".alert-info")
      if (loginMessage) {
        loginMessage.style.display = "none"
      }
    } else {
      console.log("[v0] No se encontraron datos completos para el usuario:", loggedUser.email)
    }
  } catch (error) {
    // Si hay cualquier error en el proceso, registrarlo
    console.error("[v0] Error al procesar sesión de usuario:", error)
  }
}

/**
 * Rellena automáticamente los campos del formulario con los datos del usuario
 * Si el usuario está logueado, usa sus datos guardados para pre-llenar el formulario
 */
function fillUserData(user) {
  console.log("[v0] Rellenando datos del usuario")

  if (!user) {
    console.log("[v0] No hay usuario logueado")
    return
  }

  user = migrarDireccionesUsuario(user)

  console.log("[v0] Usuario encontrado:", user)

  // Rellenar campos básicos del usuario
  const fields = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    rut: document.getElementById("rut"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
  }

  // Asignar valores a los campos
  if (fields.firstName) fields.firstName.value = user.firstName || ""
  if (fields.lastName) fields.lastName.value = user.lastName || ""
  if (fields.rut) fields.rut.value = user.rut || ""
  if (fields.email) fields.email.value = user.email || ""
  if (fields.telefono) fields.telefono.value = user.telefono || ""

  // Rellenar dirección si existe
  if (user.direcciones && user.direcciones.length > 0) {
    const direccion = user.direcciones[0] // Usar la primera dirección
    const calleField = document.querySelector(".direccion-calle")
    const numeroField = document.querySelector(".direccion-numero")
    const departamentoField = document.querySelector(".direccion-departamento")
    const regionField = document.querySelector(".direccion-region")
    const comunaField = document.querySelector(".direccion-comuna")
    const referenciaField = document.querySelector(".direccion-referencia")

    if (calleField) calleField.value = direccion.calle || ""
    if (numeroField) numeroField.value = direccion.numero || ""
    if (departamentoField) departamentoField.value = direccion.departamento || ""
    if (referenciaField) referenciaField.value = direccion.referencia || ""

    if (regionField && direccion.region) {
      const regionIndex = regionesYComunas.regiones.findIndex((r) => r.nombre === direccion.region)
      if (regionIndex !== -1) {
        regionField.value = regionIndex
        regionField.dispatchEvent(new Event("change"))
        setTimeout(() => {
          if (comunaField && direccion.comuna) {
            comunaField.value = direccion.comuna
          }
        }, 100)
      }
    }

    // Mostrar direcciones guardadas
    showSavedAddresses(user.direcciones)
  }

  console.log("[v0] Campos rellenados automáticamente")
}

/**
 * Función simple para obtener el usuario actual
 * @returns {Object|null} El objeto currentUser o null si no hay usuario
 */
function getCurrentUser() {
  return window.currentUser
}

// ============================================================================
// GESTIÓN DEL CARRITO DE COMPRAS
// ============================================================================

/**
 * Carga los productos del carrito desde localStorage y actualiza la vista
 */
function loadCart() {
  console.log("[v0] Cargando carrito para checkout")

  const cartData = localStorage.getItem("levelup_cart")
  console.log("[v0] Datos del carrito en localStorage:", cartData)

  const cart = JSON.parse(cartData || "[]")
  console.log("[v0] Carrito parseado:", cart)
  console.log("[v0] Número de items en carrito:", cart.length)

  if (cart.length > 0) {
    console.log("[v0] Items del carrito:")
    cart.forEach((item, index) => {
      console.log(`[v0] Item ${index + 1}:`, item)
    })
  } else {
    console.log("[v0] El carrito está vacío")
  }

  // Actualizar la vista del resumen del pedido
  updateOrderSummary(cart)
}

/**
 * Actualiza la vista del resumen del pedido con los items del carrito
 * @param {Array} cart - Array de productos en el carrito
 */
function updateOrderSummary(cart) {
  console.log("[v0] Actualizando resumen del pedido")

  const orderItems = document.getElementById("order-items")
  const subtotalElement = document.getElementById("order-subtotal")
  const totalElement = document.getElementById("order-total")
  const shippingElement = document.getElementById("order-shipping")

  // Si no existe el contenedor, salir
  if (!orderItems) return

  let subtotal = 0
  orderItems.innerHTML = "" // Limpiar contenido anterior

  cart.forEach((item) => {
    // Normalizar nombres de propiedades (diferentes sistemas usan nombres diferentes)
    const itemPrice = item.price || item.precio || 0
    const itemQuantity = item.quantity || item.cantidad || 1
    const itemName = item.name || item.nombre || "Producto"
    const itemImage = item.image || item.imagen || "placeholder.svg"

    // Number() convierte a número, || 0 usa 0 si la conversión falla
    const validPrice = Number(itemPrice) || 0
    const validQuantity = Number(itemQuantity) || 1

    // Calcular total del item y agregarlo al subtotal
    const itemTotal = validPrice * validQuantity
    subtotal += itemTotal

    console.log(
      `[v0] Procesando item: ${itemName}, precio: ${validPrice}, cantidad: ${validQuantity}, total: ${itemTotal}`,
    )

    const itemElement = document.createElement("div")
    itemElement.className = "d-flex align-items-center mb-3 p-2 bg-dark rounded"

    // Template literal (backticks) permite insertar variables con ${}
    itemElement.innerHTML = `
            <img src="../img/productos/${itemImage}" alt="${itemName}" class="me-3" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" onerror="this.src='../img/placeholder.svg'">
            <div class="flex-grow-1">
                <h6 class="mb-1 text-white">${itemName}</h6>
                <small class="text-muted">Cantidad: ${validQuantity}</small>
            </div>
            <div class="text-end">
                <strong class="text-success">$${itemTotal.toLocaleString()}</strong>
            </div>
        `

    // Agregar el elemento al contenedor
    orderItems.appendChild(itemElement)
  })

  console.log(`[v0] Subtotal calculado: ${subtotal}`)

  const validSubtotal = Number(subtotal) || 0

  // toLocaleString() formatea números con separadores de miles
  if (subtotalElement) {
    subtotalElement.textContent = `$${validSubtotal.toLocaleString()}`
    console.log(`[v0] Subtotal actualizado en DOM: $${validSubtotal.toLocaleString()}`)
  }
  if (totalElement) {
    totalElement.textContent = `$${validSubtotal.toLocaleString()}`
    console.log(`[v0] Total actualizado en DOM: $${validSubtotal.toLocaleString()}`)
  }
  if (shippingElement) {
    shippingElement.textContent = "Gratis"
    shippingElement.className = "fw-medium text-success"
  }
}

// ============================================================================
// GESTIÓN DE REGIONES Y COMUNAS
// ============================================================================

/**
 * Inicializa los dropdowns de regiones y comunas
 * Pobla el dropdown de regiones y configura el evento para cargar comunas
 */
function initializeRegionsAndCommunes() {
  console.log("[v0] Inicializando regiones y comunas")

  const regionSelect = document.querySelector(".direccion-region")
  const comunaSelect = document.querySelector(".direccion-comuna")

  // Verificar que los elementos existan
  if (!regionSelect || !comunaSelect) {
    console.error("[v0] No se encontraron los elementos select de región o comuna")
    return
  }

  // forEach con índice: (elemento, índice) => {}
  regionesYComunas.regiones.forEach((region, index) => {
    const option = document.createElement("option")
    option.value = index // Usar índice como valor
    option.textContent = region.nombre // Mostrar nombre de la región
    regionSelect.appendChild(option)
  })

  // addEventListener() registra una función que se ejecuta cuando ocurre un evento
  regionSelect.addEventListener("change", function () {
    // 'this' se refiere al elemento que disparó el evento (regionSelect)
    const selectedRegionIndex = this.value
    console.log("[v0] Región seleccionada:", selectedRegionIndex)

    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>'

    // Si se seleccionó una región válida
    if (selectedRegionIndex !== "") {
      // Obtener objeto de la región seleccionada
      const selectedRegion = regionesYComunas.regiones[selectedRegionIndex]
      console.log("[v0] Cargando comunas para:", selectedRegion.nombre)

      comunaSelect.disabled = false

      selectedRegion.comunas.forEach((comuna) => {
        const option = document.createElement("option")
        option.value = comuna
        option.textContent = comuna
        comunaSelect.appendChild(option)
      })

      console.log("[v0] Comunas cargadas:", selectedRegion.comunas.length)
    } else {
      comunaSelect.disabled = true
      comunaSelect.innerHTML = '<option value="">Primero selecciona una región</option>'
    }
  })

  console.log("[v0] Regiones y comunas inicializadas correctamente")
}

// ============================================================================
// VALIDACIÓN DE MEDIOS DE PAGO
// ============================================================================

/**
 * Verifica si el usuario tiene medios de pago asociados
 * @returns {boolean} true si tiene medios de pago, false si no
 */
function checkUserPaymentMethods() {
  // Si no hay usuario logueado, permitir continuar
  if (!window.currentUser || !window.currentUser.email) {
    console.log("[v0] No hay usuario logueado para verificar medios de pago")
    return true
  }

  // Template literal para crear clave específica por usuario
  const paymentMethodsKey = `levelup_payment_methods_${window.currentUser.email}`

  // Obtener medios de pago del usuario desde localStorage
  const userPaymentMethods = JSON.parse(localStorage.getItem(paymentMethodsKey) || "[]")

  console.log("[v0] Medios de pago del usuario:", userPaymentMethods)

  // Retornar true si tiene al menos un medio de pago
  return userPaymentMethods.length > 0
}

/**
 * Muestra un modal informando que se requiere un medio de pago
 * Ofrece opciones para continuar sin medio de pago o ir al perfil
 */
function showPaymentMethodRequiredModal() {
  const modalHtml = `
    <div class="modal fade" id="paymentMethodModal" tabindex="-1" aria-labelledby="paymentMethodModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-light">
          <div class="modal-header border-secondary">
            <h5 class="modal-title" id="paymentMethodModalLabel">
              <i class="bi bi-credit-card me-2 text-warning"></i>
              Medio de pago requerido
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-4">
              <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
            </div>
            <p class="text-center mb-4">
              Para continuar con tu compra, necesitas tener al menos un medio de pago asociado a tu cuenta.
            </p>
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Puedes agregar tarjetas de crédito, débito o cuentas bancarias desde tu perfil.
            </div>
          </div>
          <div class="modal-footer border-secondary">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Continuar sin medio de pago
            </button>
            <a href="perfil.html" class="btn btn-primary">
              <i class="bi bi-person me-2"></i>
              Ir a mi perfil
            </a>
          </div>
        </div>
      </div>
    </div>
  `

  const existingModal = document.getElementById("paymentMethodModal")
  if (existingModal) {
    existingModal.remove()
  }

  // insertAdjacentHTML() inserta HTML en una posición específica
  document.body.insertAdjacentHTML("beforeend", modalHtml)

  const modal = new bootstrap.Modal(document.getElementById("paymentMethodModal"))
  modal.show()
}

// ============================================================================
// NAVEGACIÓN ENTRE PASOS DEL CHECKOUT
// ============================================================================

/**
 * Avanza al siguiente paso del checkout
 * @param {number} stepNumber - Número del paso al que avanzar (1-4)
 */
function nextStep(stepNumber) {
  console.log("[v0] Avanzando al paso:", stepNumber)

  if (stepNumber === 2) {
    loadShippingOptions()
  }

  if (stepNumber === 3) {
    loadPaymentMethods()
  }

  // querySelectorAll() selecciona todos los elementos que coincidan
  // forEach() ejecuta una función para cada elemento
  document.querySelectorAll(".checkout-step").forEach((step) => {
    step.classList.add("d-none") // Agregar clase CSS para ocultar
  })

  const currentStep = document.getElementById(`step-${stepNumber}`)
  if (currentStep) {
    currentStep.classList.remove("d-none") // Remover clase para mostrar
  }

  // Actualizar indicador de progreso visual
  updateProgressIndicator(stepNumber)
}

/**
 * Retrocede al paso anterior del checkout
 * @param {number} stepNumber - Número del paso al que retroceder
 */
function prevStep(stepNumber) {
  console.log("[v0] Retrocediendo al paso:", stepNumber)
  nextStep(stepNumber) // Reutilizar la lógica de nextStep
}

/**
 * Actualiza el indicador visual de progreso
 * @param {number} activeStep - Paso actualmente activo
 */
function updateProgressIndicator(activeStep) {
  document.querySelectorAll(".step").forEach((step, index) => {
    const stepNumber = index + 1 // Los arrays empiezan en 0, los pasos en 1

    if (stepNumber <= activeStep) {
      step.classList.add("active") // Marcar como completado/activo
    } else {
      step.classList.remove("active") // Marcar como pendiente
    }
  })
}

/**
 * Envía el pedido final con proceso de confirmación mejorado
 */
function submitOrder() {
  console.log("[v0] Iniciando proceso de confirmación de pedido")

  const placeOrderBtn = document.getElementById("place-order")
  const originalBtnContent = placeOrderBtn.innerHTML

  // Deshabilitar el botón para evitar múltiples envíos
  placeOrderBtn.disabled = true

  // Crear modal de confirmación
  const confirmationModal = createConfirmationModal()
  document.body.appendChild(confirmationModal)

  const modal = new bootstrap.Modal(confirmationModal)
  modal.show()

  // Simular proceso de validación de transacción
  setTimeout(() => {
    updateConfirmationStep("Validando transacción...", "bi-credit-card", "text-warning")

    setTimeout(() => {
      updateConfirmationStep("Confirmando pago...", "bi-clock", "text-info")

      setTimeout(() => {
        updateConfirmationStep("¡Pedido realizado con éxito!", "bi-check-circle-fill", "text-success")

        // Procesar el pedido después de la confirmación visual
        processOrderData()

        setTimeout(() => {
          modal.hide()
          // Redirigir a página de confirmación o limpiar carrito
          showOrderSuccessMessage()
          clearCart()
        }, 2000)
      }, 3000) // 3 segundos confirmando pago
    }, 2000) // 2 segundos validando transacción
  }, 1000) // 1 segundo inicial
}

/**
 * Crea el modal de confirmación de pedido
 */
function createConfirmationModal() {
  const modalDiv = document.createElement("div")
  modalDiv.className = "modal fade"
  modalDiv.id = "orderConfirmationModal"
  modalDiv.setAttribute("tabindex", "-1")
  modalDiv.setAttribute("aria-hidden", "true")
  modalDiv.setAttribute("data-bs-backdrop", "static")
  modalDiv.setAttribute("data-bs-keyboard", "false")

  modalDiv.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-light border-primary">
        <div class="modal-body text-center p-5">
          <div class="mb-4">
            <i id="confirmation-icon" class="bi bi-hourglass-split text-primary" style="font-size: 4rem;"></i>
          </div>
          <h4 id="confirmation-title" class="mb-3">Procesando tu pedido...</h4>
          <p id="confirmation-message" class="text-muted mb-4">
            Por favor espera mientras procesamos tu transacción
          </p>
          <div class="progress mb-3" style="height: 8px;">
            <div id="confirmation-progress" class="progress-bar bg-primary progress-bar-striped progress-bar-animated" 
                 role="progressbar" style="width: 0%"></div>
          </div>
          <small class="text-muted">No cierres esta ventana</small>
        </div>
      </div>
    </div>
  `

  return modalDiv
}

/**
 * Actualiza el paso de confirmación en el modal
 */
function updateConfirmationStep(message, iconClass, textClass) {
  const icon = document.getElementById("confirmation-icon")
  const title = document.getElementById("confirmation-title")
  const messageEl = document.getElementById("confirmation-message")
  const progress = document.getElementById("confirmation-progress")

  if (icon) {
    icon.className = `bi ${iconClass} ${textClass}`
    icon.style.fontSize = "4rem"
  }

  if (title) {
    title.textContent = message
    title.className = `mb-3 ${textClass}`
  }

  if (messageEl) {
    if (message.includes("Validando")) {
      messageEl.textContent = "Verificando los datos de tu transacción..."
      progress.style.width = "33%"
    } else if (message.includes("Confirmando")) {
      messageEl.textContent = "Procesando el pago con tu método seleccionado..."
      progress.style.width = "66%"
    } else if (message.includes("realizado")) {
      messageEl.textContent = "¡Tu pedido ha sido confirmado exitosamente!"
      progress.style.width = "100%"
      progress.className = "progress-bar bg-success"
    }
  }
}

/**
 * Procesa los datos del pedido y los guarda
 */
function processOrderData() {
  try {
    // Obtener datos del carrito
    const cart = JSON.parse(localStorage.getItem("levelup_cart")) || []

    // Obtener datos del cliente del formulario
    const customerData = {
      firstName: document.getElementById("firstName")?.value,
      lastName: document.getElementById("lastName")?.value,
      rut: document.getElementById("rut")?.value,
      email: document.getElementById("email")?.value,
      telefono: document.getElementById("telefono")?.value,
      address: {
        calle: document.getElementById("calle")?.value,
        numero: document.getElementById("numero")?.value,
        departamento: document.getElementById("departamento")?.value,
        region: document.getElementById("region")?.value,
        comuna: document.getElementById("comuna")?.value,
        codigoPostal: document.getElementById("codigoPostal")?.value,
        referencia: document.getElementById("referencia")?.value,
      },
    }

    // Obtener método de pago seleccionado
    const paymentMethod = getSelectedPaymentMethod()

    // Obtener opción de envío seleccionada
    const shippingOption = document.querySelector('input[name="shippingMethod"]:checked')?.value

    // Obtener usuario actual
    const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
    const currentUser = sessionData ? JSON.parse(sessionData) : null

    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase()
    const orderId = `PED-${timestamp.toString().slice(-6)}${randomSuffix}`

    const order = {
      id: orderId,
      date: new Date().toISOString(),
      customer: `${customerData.firstName} ${customerData.lastName}`,
      email: customerData.email,
      customerInfo: {
        name: `${customerData.firstName} ${customerData.lastName}`,
        email: customerData.email,
        phone: customerData.telefono,
        rut: customerData.rut,
        address: customerData.address,
      },
      userId: currentUser ? currentUser.id || currentUser.email : null,
      items: cart.map((item) => ({
        name: item.name || item.nombre,
        quantity: item.quantity || item.cantidad || 1,
        price: item.price || item.precio || 0,
        subtotal: (item.price || item.precio || 0) * (item.quantity || item.cantidad || 1),
      })),
      products: cart.map((item) => ({
        name: item.name || item.nombre,
        quantity: item.quantity || item.cantidad || 1,
        price: item.price || item.precio || 0,
        subtotal: (item.price || item.precio || 0) * (item.quantity || item.cantidad || 1),
      })),
      shipping: shippingOption || "standard",
      paymentMethod: paymentMethod,
      status: "pendiente", // Cambiar estado inicial a "pendiente" en lugar de "confirmed"
      total: calculateOrderTotal(),
      metadata: {
        createdAt: new Date().toISOString(),
        source: "checkout",
        userAgent: navigator.userAgent,
        sessionId: sessionStorage.getItem("levelup_session_id") || "anonymous",
      },
    }

    // Guardar pedido en localStorage (en un sistema real iría a una base de datos)
    const orders = JSON.parse(localStorage.getItem("levelup_orders")) || []
    orders.push(order)
    localStorage.setItem("levelup_orders", JSON.stringify(orders))

    updateProductStock(cart)

    // Si hay usuario logueado, agregar puntos Level-Up
    if (currentUser) {
      addLevelUpPoints(order.total)
    }

    console.log("[v0] Pedido procesado exitosamente:", order)

    showOrderConfirmationMessage(order)
  } catch (error) {
    console.error("[v0] Error procesando pedido:", error)
    showOrderErrorMessage()
  }
}

/**
 * Calcula el total del pedido incluyendo envío
 */
function calculateOrderTotal() {
  const subtotal = Number.parseFloat(
    document.getElementById("order-subtotal")?.textContent.replace(/[^0-9]/g, "") || "0",
  )
  const shipping = Number.parseFloat(
    document.getElementById("order-shipping")?.textContent.replace(/[^0-9]/g, "") || "0",
  )
  return subtotal + shipping
}

/**
 * Agrega puntos Level-Up al usuario por la compra
 */
function addLevelUpPoints(orderTotal) {
  try {
    const sessionData = sessionStorage.getItem("levelup_session") || localStorage.getItem("levelup_session")
    if (!sessionData) return

    const user = JSON.parse(sessionData)

    const pointsEarned = Math.floor(orderTotal / 1000)

    if (pointsEarned > 0) {
      // Actualizar puntos del usuario
      user.levelUpPoints = (user.levelUpPoints || 0) + pointsEarned

      // Calcular nuevo nivel (cada 100 puntos = 1 nivel)
      const newLevel = Math.floor(user.levelUpPoints / 100) + 1
      if (newLevel > (user.level || 1)) {
        user.level = newLevel
        showLevelUpNotification(newLevel)
      }

      // Guardar usuario actualizado
      const storage = localStorage.getItem("levelup_session") ? localStorage : sessionStorage
      storage.setItem("levelup_session", JSON.stringify(user))

      if (typeof window.updateUserData === "function") {
        window.updateUserData(user.email, user)
      }

      // Mostrar notificación de puntos ganados
      showPointsEarnedNotification(pointsEarned)
    }
  } catch (error) {
    console.error("[v0] Error agregando puntos Level-Up:", error)
  }
}

/**
 * Muestra mensaje de éxito del pedido
 */
function showOrderSuccessMessage() {
  // Crear toast de éxito
  const toastHtml = `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div class="toast show bg-success text-white" role="alert">
        <div class="toast-header bg-success text-white border-0">
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong class="me-auto">¡Pedido Confirmado!</strong>
        </div>
        <div class="toast-body">
          Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación pronto.
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", toastHtml)

  // Remover toast después de 5 segundos
  setTimeout(() => {
    const toastContainer = document.querySelector(".toast-container")
    if (toastContainer) {
      toastContainer.remove()
    }
  }, 5000)
}

function showOrderConfirmationMessage(order) {
  const confirmationHtml = `
    <div class="alert alert-success alert-dismissible fade show position-fixed" 
         style="top: 20px; right: 20px; z-index: 9999; max-width: 400px;">
      <div class="d-flex align-items-center">
        <i class="bi bi-check-circle-fill fs-4 me-3 text-success"></i>
        <div>
          <h6 class="alert-heading mb-1">¡Pedido Confirmado!</h6>
          <p class="mb-1">Tu pedido <strong>${order.id}</strong> ha sido procesado exitosamente.</p>
          <small class="text-muted">Total: $${order.total.toLocaleString("es-CL")}</small>
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", confirmationHtml)

  // Auto-remover después de 8 segundos
  setTimeout(() => {
    const alert = document.querySelector(".alert-success")
    if (alert) alert.remove()
  }, 8000)
}

function showOrderErrorMessage() {
  const errorHtml = `
    <div class="alert alert-danger alert-dismissible fade show position-fixed" 
         style="top: 20px; right: 20px; z-index: 9999; max-width: 400px;">
      <div class="d-flex align-items-center">
        <i class="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i>
        <div>
          <h6 class="alert-heading mb-1">Error en el Pedido</h6>
          <p class="mb-0">Hubo un problema al procesar tu pedido. Por favor, inténtalo nuevamente.</p>
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", errorHtml)

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    const alert = document.querySelector(".alert-danger")
    if (alert) alert.remove()
  }, 5000)
}

/**
 * Limpia el carrito después de una compra exitosa
 */
function clearCart() {
  localStorage.removeItem("levelup_cart")
  localStorage.removeItem("carrito")

  // Actualizar badge del carrito
  const cartBadge = document.getElementById("cartBadge")
  if (cartBadge) {
    cartBadge.classList.add("d-none")
    cartBadge.textContent = "0"
  }

  console.log("[v0] Carrito limpiado después de compra exitosa")
}

// ============================================================================
// GESTIÓN DE DIRECCIONES GUARDADAS
// ============================================================================

/**
 * Muestra las direcciones guardadas del usuario
 * @param {Array} direcciones - Array de direcciones del usuario
 */
function showSavedAddresses(direcciones) {
  const savedAddressesDiv = document.getElementById("saved-addresses")
  const addressesList = document.getElementById("addresses-list")

  if (!savedAddressesDiv || !addressesList) return

  console.log("[v0] Mostrando direcciones guardadas:", direcciones)

  savedAddressesDiv.style.display = "block"
  addressesList.innerHTML = ""

  direcciones.forEach((direccion, index) => {
    const addressCard = document.createElement("div")
    addressCard.className = "address-option mb-2"

    // Template literal con HTML complejo
    addressCard.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="savedAddress" 
               id="address-${index}" value="${index}">
        <label class="form-check-label w-100" for="address-${index}">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <strong>${direccion.alias || "Dirección " + (index + 1)}</strong>
              <div class="text-muted small">
                ${direccion.calle || direccion.street || direccion.address || ""}
                ${direccion.comuna || direccion.city || ""}, 
                ${direccion.region || direccion.state || ""}
              </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeAddress(${index})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </label>
      </div>
    `
    addressesList.appendChild(addressCard)
  })

  document.querySelectorAll('input[name="savedAddress"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // parseInt() convierte string a número entero
        const addressIndex = Number.parseInt(this.value)
        loadSavedAddress(direcciones[addressIndex])

        // Ocultar formulario de nueva dirección
        document.getElementById("address-form").style.display = "none"
      }
    })
  })
}

/**
 * Carga los datos de una dirección guardada en el formulario
 * @param {Object} direccion - Objeto con los datos de la dirección
 */
function loadSavedAddress(direccion) {
  console.log("[v0] Cargando dirección guardada:", direccion)

  // Obtener referencias a los campos del formulario
  const calleField = document.getElementById("calle")
  const numeroField = document.getElementById("numero")
  const departamentoField = document.getElementById("departamento")
  const regionField = document.getElementById("region")
  const comunaField = document.getElementById("comuna")
  const referenciaField = document.getElementById("referencia")

  // Asignar valores a los campos (usando operador || para valores por defecto)
  if (calleField) {
    calleField.value = direccion.calle || direccion.street || ""
    console.log("[v0] Campo calle seteado a:", calleField.value)
  }
  if (numeroField) {
    numeroField.value = direccion.numero || direccion.number || ""
    console.log("[v0] Campo numero seteado a:", numeroField.value)
  }
  if (departamentoField) {
    departamentoField.value = direccion.departamento || direccion.apartment || ""
    console.log("[v0] Campo departamento seteado a:", departamentoField.value)
  }
  if (referenciaField) {
    referenciaField.value = direccion.referencia || direccion.reference || ""
    console.log("[v0] Campo referencia seteado a:", referenciaField.value)
  }

  if (regionField && direccion.region) {
    const regionIndex = regionesYComunas.regiones.findIndex((r) => r.nombre === direccion.region)
    if (regionIndex !== -1) {
      // Seleccionar la región y disparar el evento 'change' para cargar las comunas
      regionField.value = regionIndex
      regionField.dispatchEvent(new Event("change"))

      // Usar setTimeout para dar tiempo a que las comunas se carguen
      setTimeout(() => {
        if (comunaField && direccion.comuna) {
          comunaField.value = direccion.comuna
          console.log("[v0] Campo comuna seteado a:", comunaField.value)
        }
      }, 100)
    }
  }
}

/**
 * Elimina una dirección guardada del usuario
 * @param {number} index - Índice de la dirección a eliminar en el array
 */
function removeAddress(index) {
  // Confirmar antes de eliminar
  if (!window.currentUser || !window.currentUser.direcciones) return

  if (confirm("¿Estás seguro de que quieres eliminar esta dirección?")) {
    // Eliminar la dirección del array
    window.currentUser.direcciones.splice(index, 1)

    // Actualizar en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const levelupUsers = JSON.parse(localStorage.getItem("levelup_users") || "[]")

    // Buscar y actualizar en usuarios
    const userIndex = usuarios.findIndex((user) => user.email === window.currentUser.email)
    if (userIndex !== -1) {
      usuarios[userIndex].direcciones = window.currentUser.direcciones
      localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    // Buscar y actualizar en levelup_users
    const levelupUserIndex = levelupUsers.findIndex((user) => user.email === window.currentUser.email)
    if (levelupUserIndex !== -1) {
      levelupUsers[levelupUserIndex].direcciones = window.currentUser.direcciones
      localStorage.setItem("levelup_users", JSON.stringify(levelupUsers))
    }

    // Recargar la vista de direcciones
    if (window.currentUser.direcciones.length > 0) {
      showSavedAddresses(window.currentUser.direcciones)
    } else {
      document.getElementById("saved-addresses").style.display = "none"
      document.getElementById("address-form").style.display = "block"
    }
  }
}

/**
 * Guarda la dirección actual del formulario en el usuario
 */
function saveCurrentAddress() {
  console.log("[v0] Intentando guardar dirección actual")

  // Obtener valores del formulario
  const calle = document.getElementById("calle").value
  const numero = document.getElementById("numero").value
  const departamento = document.getElementById("departamento").value
  const regionSelect = document.getElementById("region")
  const comuna = document.getElementById("comuna").value
  const referencia = document.getElementById("referencia").value

  // Validar campos obligatorios
  if (!calle || !numero || !regionSelect.value || !comuna) {
    alert("Por favor completa todos los campos obligatorios de la dirección (calle, número, región y comuna)")
    return false
  }

  if (window.currentUser) {
    // Obtener nombre de la región
    const regionNombre = regionesYComunas.regiones[regionSelect.value].nombre

    // Crear objeto con la nueva dirección
    const nuevaDireccion = {
      alias: `Dirección ${(window.currentUser.direcciones?.length || 0) + 1}`,
      calle: calle,
      numero: numero,
      departamento: departamento,
      comuna: comuna,
      region: regionNombre,
      referencia: referencia,
      fechaCreacion: new Date().toISOString(),
    }

    // Inicializar array de direcciones si no existe
    if (!window.currentUser.direcciones) {
      window.currentUser.direcciones = []
    }

    // Verificar si la dirección ya existe
    const direccionExiste = window.currentUser.direcciones.some(
      (dir) => dir.calle === calle && dir.numero === numero && dir.comuna === comuna,
    )

    if (!direccionExiste) {
      // Agregar la nueva dirección al array
      window.currentUser.direcciones.push(nuevaDireccion)

      // Actualizar en localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
      const levelupUsers = JSON.parse(localStorage.getItem("levelup_users") || "[]")

      // Buscar y actualizar en usuarios
      const userIndex = usuarios.findIndex((user) => user.email === window.currentUser.email)
      if (userIndex !== -1) {
        usuarios[userIndex].direcciones = window.currentUser.direcciones
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
      }

      // Buscar y actualizar en levelup_users
      const levelupUserIndex = levelupUsers.findIndex((user) => user.email === window.currentUser.email)
      if (levelupUserIndex !== -1) {
        levelupUsers[levelupUserIndex].direcciones = window.currentUser.direcciones
        localStorage.setItem("levelup_users", JSON.stringify(levelupUsers))
      }

      console.log("[v0] Dirección guardada:", nuevaDireccion)
    }
  } else {
    console.log("[v0] Usuario no logueado, continuando sin guardar dirección")
  }

  return true
}

// ============================================================================
// GESTIÓN DE OPCIONES DE ENVÍO
// ============================================================================

/**
 * Carga las opciones de envío disponibles
 */
function loadShippingOptions() {
  console.log("[v0] Cargando opciones de envío")

  const shippingContainer = document.getElementById("shipping-options")
  if (!shippingContainer) {
    console.error("[v0] Contenedor de opciones de envío no encontrado")
    return
  }

  // Opciones de envío disponibles
  const shippingOptions = [
    {
      id: "starken",
      name: "Starken - Domicilio",
      description: "Entrega en 2-3 días hábiles",
      price: 3500,
      icon: "bi-truck",
    },
    {
      id: "chilexpress",
      name: "Chilexpress - Express",
      description: "Entrega en 1-2 días hábiles",
      price: 4500,
      icon: "bi-lightning",
    },
    {
      id: "retiro",
      name: "Retiro en Tienda",
      description: "Disponible en 24 horas",
      price: 0,
      icon: "bi-shop",
    },
  ]

  // Generar HTML para las opciones
  let optionsHTML = ""
  shippingOptions.forEach((option, index) => {
    const priceText =
      option.price === 0
        ? '<span class="text-success fw-bold">Gratis</span>'
        : `<span class="text-primary fw-bold">$${option.price.toLocaleString()}</span>`

    optionsHTML += `
          <div class="form-check shipping-option mb-3">
              <input class="form-check-input" type="radio" name="shippingMethod" 
                     id="${option.id}" value="${option.id}" ${index === 0 ? "checked" : ""}>
              <label class="form-check-label d-flex justify-content-between align-items-center" for="${option.id}">
                  <div class="d-flex align-items-center">
                      <div class="shipping-icon me-3">
                          <i class="bi ${option.icon} text-primary fs-4"></i>
                      </div>
                      <div>
                          <div class="fw-medium">${option.name}</div>
                          <div class="text-muted small">${option.description}</div>
                      </div>
                  </div>
                  <div class="shipping-price">
                      ${priceText}
                  </div>
              </label>
          </div>
      `
  })

  shippingContainer.innerHTML = optionsHTML

  // Agregar event listeners para las opciones de envío
  const shippingInputs = document.querySelectorAll('input[name="shippingMethod"]')
  shippingInputs.forEach((input) => {
    input.addEventListener("change", function () {
      console.log("[v0] Opción de envío seleccionada:", this.value)
      updateShippingCost(this.value)

      // Habilitar botón de continuar
      const continueBtn = document.getElementById("continue-to-payment")
      if (continueBtn) {
        continueBtn.disabled = false
      }
    })
  })

  // Seleccionar la primera opción por defecto
  if (shippingInputs.length > 0) {
    updateShippingCost(shippingInputs[0].value)
    const continueBtn = document.getElementById("continue-to-payment")
    if (continueBtn) {
      continueBtn.disabled = false
    }
  }
}

/**
 * Actualiza el costo de envío en el resumen del pedido
 * @param {string} shippingMethod - Método de envío seleccionado
 */
function updateShippingCost(shippingMethod) {
  console.log("[v0] Actualizando costo de envío:", shippingMethod)

  // Obtener el subtotal actual del carrito
  const subtotalElement = document.getElementById("order-subtotal")
  const subtotal = subtotalElement ? Number(subtotalElement.textContent.replace(/[$,.]/g, "")) || 0 : 0

  // Primero intentar obtener el costo guardado desde localStorage
  const savedShippingCost = localStorage.getItem('selectedShippingCost');
  const savedShippingMethod = localStorage.getItem('selectedShipping');

  let shippingCost = 0;

  if (savedShippingCost && savedShippingMethod === shippingMethod) {
    // Usar el costo guardado si coincide con el método seleccionado
    shippingCost = parseInt(savedShippingCost) || 0;
    console.log("[v0] Usando costo de envío guardado:", shippingCost);
  } else {
    // Usar costos por defecto si no hay datos guardados
    const shippingCosts = {
      starken: 3500,
      chilexpress: 4500,
      retiro: 0,
    };
    shippingCost = shippingCosts[shippingMethod] || 0;

    // Aplicar envío gratis para Starken si el subtotal es >= 50000
    if (shippingMethod === 'starken' && subtotal >= 50000) {
      shippingCost = 0;
      console.log("[v0] Envío gratis aplicado para Starken (subtotal >= 50000)");
    }

    console.log("[v0] Usando costo por defecto:", shippingCost);
  }

  const shippingElement = document.getElementById("order-shipping")

  if (shippingElement) {
    if (shippingCost === 0) {
      shippingElement.textContent = "Gratis"
      shippingElement.className = "fw-medium text-success"
    } else {
      shippingElement.textContent = `$${shippingCost.toLocaleString()}`
      shippingElement.className = "fw-medium"
    }
  }

  // Actualizar total
  updateOrderTotal()
}

/**
 * Actualiza el total del pedido en el resumen del pedido
 */
function updateOrderTotal() {
  console.log("[v0] Actualizando total del pedido")

  const subtotalElement = document.getElementById("order-subtotal")
  const shippingElement = document.getElementById("order-shipping")
  const totalElement = document.getElementById("order-total")

  if (!subtotalElement || !shippingElement || !totalElement) return

  const subtotal = Number(subtotalElement.textContent.replace(/[$,.]/g, "")) || 0
  const shippingCost = Number(shippingElement.textContent.replace(/[$,.]/g, "")) || 0

  const total = subtotal + shippingCost

  totalElement.textContent = `$${total.toLocaleString()}`
  console.log(`[v0] Total actualizado en DOM: $${total.toLocaleString()}`)
}

// ============================================================================
// GESTIÓN DE MÉTODOS DE PAGO EN CHECKOUT
// ============================================================================

/**
 * Carga los métodos de pago del usuario en el selector
 */
function loadPaymentMethods() {
  console.log("[v0] Cargando métodos de pago en checkout")

  const selector = document.getElementById("paymentMethodSelect")
  if (!selector) {
    console.error("[v0] Selector de métodos de pago no encontrado")
    return
  }

  // Limpiar selector
  selector.innerHTML = ""

  // Si no hay usuario logueado, solo mostrar opción de nuevo método
  if (!window.currentUser || !window.currentUser.email) {
    selector.innerHTML = `
      <option value="new">Agregar método de pago</option>
    `
    setupPaymentMethodSelector()
    return
  }

  // Obtener métodos de pago del usuario
  const userPaymentKey = `levelup_payment_methods_${window.currentUser.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

  console.log("[v0] Métodos de pago encontrados:", paymentMethods)

  // Agregar métodos guardados
  paymentMethods.forEach((method, index) => {
    const displayName = method.alias || getPaymentTypeText(method.type)
    const maskedNumber = maskPaymentNumber(method.number)
    const isDefault = method.isDefault ? " (Predeterminado)" : ""

    const option = document.createElement("option")
    option.value = index.toString()
    option.textContent = `${displayName} - ${maskedNumber}${isDefault}`

    if (method.isDefault) {
      option.selected = true
    }

    selector.appendChild(option)
  })

  // Agregar opción para nuevo método
  const newOption = document.createElement("option")
  newOption.value = "new"
  newOption.textContent = "Agregar nuevo método de pago"
  selector.appendChild(newOption)

  // Si hay métodos guardados, seleccionar el predeterminado
  if (paymentMethods.length > 0) {
    const defaultMethod = paymentMethods.find((method) => method.isDefault)
    if (defaultMethod) {
      const defaultIndex = paymentMethods.indexOf(defaultMethod)
      selector.value = defaultIndex.toString()
    }
    // Habilitar botón de continuar si hay método seleccionado
    document.getElementById("continue-to-confirmation").disabled = false
  }

  setupPaymentMethodSelector()
}

/**
 * Configura los event listeners del selector de métodos de pago
 */
function setupPaymentMethodSelector() {
  const selector = document.getElementById("paymentMethodSelect")
  const newPaymentForm = document.getElementById("newPaymentForm")
  const newPaymentType = document.getElementById("newPaymentType")
  const newCardFields = document.getElementById("newCardFields")
  const newBankFields = document.getElementById("newBankFields")
  const continueBtn = document.getElementById("continue-to-confirmation")

  // Llenar años de vencimiento
  const currentYear = new Date().getFullYear()
  const yearSelect = document.getElementById("newCardYear")
  yearSelect.innerHTML = '<option value="">Año</option>'
  for (let i = 0; i < 15; i++) {
    const year = currentYear + i
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`
  }

  // Event listener para cambio de selector principal
  selector.addEventListener("change", function () {
    console.log("[v0] Método de pago seleccionado:", this.value)

    if (this.value === "new") {
      newPaymentForm.classList.remove("d-none")
      continueBtn.disabled = true
    } else {
      newPaymentForm.classList.add("d-none")
      continueBtn.disabled = this.value === ""
    }
  })

  // Event listener para tipo de nuevo método de pago
  newPaymentType.addEventListener("change", function () {
    const type = this.value

    if (type.includes("tarjeta")) {
      newCardFields.classList.remove("d-none")
      newBankFields.classList.add("d-none")
    } else if (type.includes("cuenta")) {
      newCardFields.classList.add("d-none")
      newBankFields.classList.remove("d-none")
    } else {
      newCardFields.classList.add("d-none")
      newBankFields.classList.add("d-none")
    }

    validateNewPaymentMethod()
  })

  // Formatear número de tarjeta
  const cardNumber = document.getElementById("newCardNumber")
  cardNumber.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
    let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
    if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19)
    e.target.value = formattedValue
    validateNewPaymentMethod()
  })

  // Validar CVV
  const cardCvv = document.getElementById("newCardCvv")
  cardCvv.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").substr(0, 4)
    validateNewPaymentMethod()
  })

  // Event listeners para validación
  const validationFields = ["newCardMonth", "newCardYear", "newCardName", "newBankName", "newAccountNumber"]

  validationFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.addEventListener("change", validateNewPaymentMethod)
      field.addEventListener("input", validateNewPaymentMethod)
    }
  })
}

/**
 * Valida el formulario de nuevo método de pago
 */
function validateNewPaymentMethod() {
  const selector = document.getElementById("paymentMethodSelect")
  const continueBtn = document.getElementById("continue-to-confirmation")

  if (selector.value !== "new") {
    return
  }

  const type = document.getElementById("newPaymentType").value
  let isValid = false

  if (type.includes("tarjeta")) {
    const cardNumber = document.getElementById("newCardNumber").value.replace(/\s/g, "")
    const cardCvv = document.getElementById("newCardCvv").value
    const cardMonth = document.getElementById("newCardMonth").value
    const cardYear = document.getElementById("newCardYear").value
    const cardName = document.getElementById("newCardName").value

    isValid =
      cardNumber.length >= 13 &&
      cardNumber.length <= 19 &&
      cardCvv.length >= 3 &&
      cardCvv.length <= 4 &&
      cardMonth &&
      cardYear &&
      cardName.trim()
  } else if (type.includes("cuenta")) {
    const bankName = document.getElementById("newBankName").value
    const accountNumber = document.getElementById("newAccountNumber").value

    isValid = bankName && accountNumber.trim()
  }

  continueBtn.disabled = !isValid
}

/**
 * Obtiene el método de pago seleccionado para procesar el pedido
 */
function getSelectedPaymentMethod() {
  const selector = document.getElementById("paymentMethodSelect")

  if (selector.value === "new") {
    // Crear objeto con datos del nuevo método
    const type = document.getElementById("newPaymentType").value
    const alias = document.getElementById("newPaymentAlias").value
    const shouldSave = document.getElementById("saveNewPaymentMethod").checked

    const paymentData = {
      type: type,
      alias: alias,
      isNew: true,
      shouldSave: shouldSave,
    }

    if (type.includes("tarjeta")) {
      paymentData.number = document.getElementById("newCardNumber").value.replace(/\s/g, "")
      paymentData.cvv = document.getElementById("newCardCvv").value
      paymentData.expiryMonth = document.getElementById("newCardMonth").value
      paymentData.expiryYear = document.getElementById("newCardYear").value
      paymentData.cardName = document.getElementById("newCardName").value
    } else if (type.includes("cuenta")) {
      paymentData.bank = document.getElementById("newBankName").value
      paymentData.number = document.getElementById("newAccountNumber").value
    }

    return paymentData
  } else {
    // Método guardado seleccionado
    if (!window.currentUser || !window.currentUser.email) {
      return null
    }

    const userPaymentKey = `levelup_payment_methods_${window.currentUser.email}`
    const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []
    const selectedIndex = Number.parseInt(selector.value)

    return paymentMethods[selectedIndex] || null
  }
}

/**
 * Guarda un nuevo método de pago si el usuario lo solicita
 */
function saveNewPaymentMethodIfRequested(paymentData) {
  if (!paymentData.isNew || !paymentData.shouldSave || !window.currentUser) {
    return
  }

  const userPaymentKey = `levelup_payment_methods_${window.currentUser.email}`
  const paymentMethods = JSON.parse(localStorage.getItem(userPaymentKey)) || []

  // Preparar datos para guardar
  const methodToSave = {
    type: paymentData.type,
    alias: paymentData.alias,
    number: paymentData.number,
    isDefault: paymentMethods.length === 0, // Primer método es predeterminado
    createdAt: new Date().toISOString(),
  }

  if (paymentData.type.includes("tarjeta")) {
    methodToSave.cvv = paymentData.cvv
    methodToSave.expiryMonth = paymentData.expiryMonth
    methodToSave.expiryYear = paymentData.expiryYear
    methodToSave.cardName = paymentData.cardName
  } else if (paymentData.type.includes("cuenta")) {
    methodToSave.bank = paymentData.bank
  }

  // Limitar a 3 métodos máximo
  if (paymentMethods.length >= 3) {
    console.log("[v0] Límite de métodos de pago alcanzado, no se guardará")
    return
  }

  paymentMethods.push(methodToSave)
  localStorage.setItem(userPaymentKey, JSON.stringify(paymentMethods))

  console.log("[v0] Nuevo método de pago guardado:", methodToSave)
}

// Funciones auxiliares reutilizadas del perfil
function getPaymentTypeText(type) {
  const texts = {
    tarjeta_credito: "Tarjeta de Crédito",
    tarjeta_debito: "Tarjeta de Débito",
    cuenta_corriente: "Cuenta Corriente",
    cuenta_vista: "Cuenta Vista",
  }
  return texts[type] || type
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

function showPointsEarnedNotification(points) {
  const pointsHtml = `
    <div class="alert alert-info alert-dismissible fade show position-fixed" 
         style="top: 80px; right: 20px; z-index: 9999; max-width: 350px;">
      <div class="d-flex align-items-center">
        <i class="bi bi-star-fill fs-4 me-3 text-warning"></i>
        <div>
          <h6 class="alert-heading mb-1">¡Puntos Ganados!</h6>
          <p class="mb-0">Has ganado <strong>${points} puntos Level-Up</strong> con esta compra.</p>
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", pointsHtml)

  // Auto-remover después de 6 segundos
  setTimeout(() => {
    const alert = document.querySelector(".alert-info")
    if (alert) alert.remove()
  }, 6000)
}

function showLevelUpNotification(newLevel) {
  const levelUpHtml = `
    <div class="alert alert-warning alert-dismissible fade show position-fixed" 
         style="top: 140px; right: 20px; z-index: 9999; max-width: 350px;">
      <div class="d-flex align-items-center">
        <i class="bi bi-trophy-fill fs-4 me-3 text-warning"></i>
        <div>
          <h6 class="alert-heading mb-1">¡Level Up!</h6>
          <p class="mb-0">¡Felicidades! Has alcanzado el <strong>Nivel ${newLevel}</strong>.</p>
        </div>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", levelUpHtml)

  // Auto-remover después de 8 segundos
  setTimeout(() => {
    const alert = document.querySelector(".alert-warning")
    if (alert) alert.remove()
  }, 8000)
}

// ============================================================================
// CONFIGURACIÓN DE EVENT LISTENERS
// ============================================================================

/**
 * Configura todos los event listeners del checkout
 * Esta función registra las funciones que se ejecutan cuando se hace clic en botones
 */
function setupEventListeners() {
  console.log("[v0] Configurando event listeners")

  const continueToShipping = document.getElementById("continue-to-shipping")
  const backToData = document.getElementById("back-to-data")
  const continueToPayment = document.getElementById("continue-to-payment")
  const backToShipping = document.getElementById("back-to-shipping")
  const continueToConfirmation = document.getElementById("continue-to-confirmation")
  const backToPayment = document.getElementById("back-to-payment")
  const placeOrder = document.getElementById("place-order")

  // El patrón if (elemento) previene errores si el botón no existe en el HTML

  if (continueToShipping) {
    // addEventListener() registra una función que se ejecuta al hacer clic
    continueToShipping.addEventListener("click", () => {
      // Función flecha: () => {} es equivalente a function() {}
      if (saveCurrentAddress()) {
        // Solo avanzar si se guardó la dirección correctamente
        nextStep(2)
      }
    })
  }

  if (backToData) {
    backToData.addEventListener("click", () => prevStep(1))
  }

  if (continueToPayment) {
    continueToPayment.addEventListener("click", () => {
      // Verificar medios de pago antes de avanzar
      const hasPaymentMethods = checkUserPaymentMethods()
      if (!hasPaymentMethods) {
        console.log("[v0] Usuario no tiene medios de pago, mostrando modal")
        showPaymentMethodRequiredModal()
        return // No continuar
      }
      nextStep(3)
    })
  }

  if (backToShipping) {
    backToShipping.addEventListener("click", () => prevStep(2))
  }

  if (continueToConfirmation) {
    continueToConfirmation.addEventListener("click", () => nextStep(4))
  }

  if (backToPayment) {
    backToPayment.addEventListener("click", () => prevStep(3))
  }

  if (placeOrder) {
    placeOrder.addEventListener("click", submitOrder)
  }

  const addNewAddressBtn = document.getElementById("add-new-address")
  if (addNewAddressBtn) {
    addNewAddressBtn.addEventListener("click", () => {
      // Mostrar formulario de nueva dirección
      document.getElementById("address-form").style.display = "block"

      document.querySelectorAll('input[name="savedAddress"]').forEach((radio) => {
        radio.checked = false // Desmarcar todos los radio buttons
      })
    })
  }
}

function migrarDireccionesUsuario(user) {
  console.log("[v0] Verificando si necesita migración de direcciones")

  if (!user.direcciones || user.direcciones.length === 0) {
    return user
  }

  let necesitaMigracion = false

  user.direcciones.forEach((direccion) => {
    // Detectar si la calle tiene número concatenado (contiene dígitos al final)
    if (direccion.calle && /\d+\s+\d+$/.test(direccion.calle)) {
      console.log("[v0] Dirección con concatenación detectada:", direccion.calle)

      // Extraer el número duplicado del final
      const match = direccion.calle.match(/^(.+?)(\d+)\s+(\d+)$/)
      if (match) {
        const [, calleBase, numeroEnCalle, numeroSeparado] = match

        // Si los números coinciden, limpiar la calle
        if (numeroEnCalle === numeroSeparado) {
          direccion.calle = calleBase.trim()
          direccion.numero = numeroEnCalle
          necesitaMigracion = true
          console.log("[v0] Dirección migrada - Calle:", direccion.calle, "Número:", direccion.numero)
        }
      }
    }
  })

  // Si se hizo alguna migración, guardar los datos actualizados
  if (necesitaMigracion) {
    console.log("[v0] Guardando datos migrados del usuario")
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const userIndex = usuarios.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      usuarios[userIndex] = user
      localStorage.setItem("usuarios", JSON.stringify(usuarios))
      console.log("[v0] Datos del usuario actualizados en localStorage")
    }
  }

  return user
}

function updateProductStock(cartItems) {
  try {
    console.log("[v0] Actualizando stock de productos después de la compra")

    // Get current products from localStorage
    const products = JSON.parse(localStorage.getItem("levelup_products")) || []

    // Update stock for each purchased item
    cartItems.forEach((cartItem) => {
      const productIndex = products.findIndex(
        (p) => p.name === (cartItem.name || cartItem.nombre) || p.codigo === cartItem.codigo,
      )

      if (productIndex !== -1) {
        const purchasedQuantity = cartItem.quantity || cartItem.cantidad || 1
        const currentStock = products[productIndex].stock || 0
        const newStock = Math.max(0, currentStock - purchasedQuantity)

        products[productIndex].stock = newStock
        console.log(`[v0] Stock actualizado para ${products[productIndex].name}: ${currentStock} -> ${newStock}`)
      }
    })

    // Save updated products back to localStorage
    localStorage.setItem("levelup_products", JSON.stringify(products))
    console.log("[v0] Stock de productos actualizado exitosamente")
  } catch (error) {
    console.error("[v0] Error actualizando stock de productos:", error)
  }
}
