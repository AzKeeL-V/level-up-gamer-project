// Gestión de puntos y sistema de recompensas
class PuntosManager {
  constructor() {
    this.configuracion = this.cargarConfiguracion()
    this.init()
  }

  cargarConfiguracion() {
    const config = localStorage.getItem("puntosConfig")
    return config
      ? JSON.parse(config)
      : {
          registrationPoints: 100,
          referralPoints: 500,
          purchasePoints: 10, // por cada $1000
          reviewPoints: 50,
          birthdayPoints: 200,
        }
  }

  guardarConfiguracion() {
    localStorage.setItem("puntosConfig", JSON.stringify(this.configuracion))
  }

  init() {
    this.cargarConfiguracionEnFormulario()
    this.cargarEstadisticas()
    this.cargarTopUsuarios()
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Guardar configuración
    document.getElementById("savePointsConfig").addEventListener("click", () => {
      this.guardarConfiguracionDesdeFormulario()
    })

    // Actualizar datos
    document.getElementById("refreshPointsData").addEventListener("click", () => {
      this.cargarEstadisticas()
      this.cargarTopUsuarios()
    })

    // Ajustar puntos
    document.getElementById("confirmAdjustPoints").addEventListener("click", () => {
      this.aplicarAjustePuntos()
    })
  }

  cargarConfiguracionEnFormulario() {
    document.getElementById("registrationPoints").value = this.configuracion.registrationPoints
    document.getElementById("referralPoints").value = this.configuracion.referralPoints
    document.getElementById("purchasePoints").value = this.configuracion.purchasePoints
    document.getElementById("reviewPoints").value = this.configuracion.reviewPoints
    document.getElementById("birthdayPoints").value = this.configuracion.birthdayPoints
  }

  guardarConfiguracionDesdeFormulario() {
    this.configuracion = {
      registrationPoints: Number.parseInt(document.getElementById("registrationPoints").value) || 0,
      referralPoints: Number.parseInt(document.getElementById("referralPoints").value) || 0,
      purchasePoints: Number.parseInt(document.getElementById("purchasePoints").value) || 0,
      reviewPoints: Number.parseInt(document.getElementById("reviewPoints").value) || 0,
      birthdayPoints: Number.parseInt(document.getElementById("birthdayPoints").value) || 0,
    }

    this.guardarConfiguracion()
    this.mostrarToast("Configuración guardada exitosamente", "success")
  }

  cargarEstadisticas() {
    const usuarios = this.obtenerUsuarios()

    let totalPuntos = 0
    let totalReferidos = 0
    let usuariosDiamante = 0

    usuarios.forEach((usuario) => {
      const puntos = usuario.puntosReferidos || 0
      totalPuntos += puntos
      totalReferidos += (usuario.usuariosReferidos || []).length

      if (puntos >= 5000) {
        usuariosDiamante++
      }
    })

    const promedioPuntos = usuarios.length > 0 ? Math.round(totalPuntos / usuarios.length) : 0

    document.getElementById("totalPointsAwarded").textContent = totalPuntos.toLocaleString()
    document.getElementById("totalReferrals").textContent = totalReferidos
    document.getElementById("diamondUsers").textContent = usuariosDiamante
    document.getElementById("avgPointsPerUser").textContent = promedioPuntos
  }

  cargarTopUsuarios() {
    const usuarios = this.obtenerUsuarios()

    // Ordenar por puntos descendente
    const usuariosOrdenados = usuarios
      .map((usuario) => ({
        ...usuario,
        puntosTotal: usuario.puntosReferidos || 0,
        totalReferidos: (usuario.usuariosReferidos || []).length,
      }))
      .sort((a, b) => b.puntosTotal - a.puntosTotal)
      .slice(0, 10) // Top 10

    const tbody = document.getElementById("topUsersTable")
    tbody.innerHTML = ""

    usuariosOrdenados.forEach((usuario, index) => {
      const nivel = this.obtenerNivelUsuario(usuario.puntosTotal)
      const row = document.createElement("tr")

      row.innerHTML = `
                <td>
                    <span class="badge bg-primary">#${index + 1}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="user-avatar me-2">
                            <i class="bi bi-person-circle"></i>
                        </div>
                        <div>
                            <div class="fw-bold">${usuario.nombreCompleto || `${usuario.firstName} ${usuario.lastName}`}</div>
                            <small class="text-muted">ID: ${usuario.id}</small>
                        </div>
                    </div>
                </td>
                <td>${usuario.email}</td>
                <td>
                    <span class="badge bg-success">${usuario.puntosTotal.toLocaleString()}</span>
                </td>
                <td>
                    <span class="badge bg-info">${usuario.totalReferidos}</span>
                </td>
                <td>
                    <span class="badge ${nivel.class}">${nivel.nombre}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="puntosManager.abrirModalAjuste(${usuario.id})">
                        <i class="bi bi-pencil"></i> Ajustar
                    </button>
                </td>
            `

      tbody.appendChild(row)
    })
  }

  obtenerNivelUsuario(puntos) {
    if (puntos >= 5000) {
      return { nombre: "Diamante", class: "bg-primary" }
    } else if (puntos >= 3000) {
      return { nombre: "Oro", class: "bg-warning" }
    } else if (puntos >= 1000) {
      return { nombre: "Plata", class: "bg-secondary" }
    } else {
      return { nombre: "Bronce", class: "bg-dark" }
    }
  }

  obtenerUsuarios() {
    const usuarios = localStorage.getItem("usuarios")
    return usuarios ? JSON.parse(usuarios) : []
  }

  abrirModalAjuste(userId) {
    const usuarios = this.obtenerUsuarios()
    const usuario = usuarios.find((u) => u.id === userId)

    if (usuario) {
      document.getElementById("adjustUserId").value = userId
      document.getElementById("adjustUserName").value =
        usuario.nombreCompleto || `${usuario.firstName} ${usuario.lastName}`
      document.getElementById("currentPoints").value = usuario.puntosReferidos || 0
      document.getElementById("pointsAdjustment").value = ""
      document.getElementById("adjustmentReason").value = ""

      const modal = window.bootstrap.Modal.getInstance(document.getElementById("adjustPointsModal"))
      modal.show()
    }
  }

  aplicarAjustePuntos() {
    const userId = Number.parseInt(document.getElementById("adjustUserId").value)
    const ajuste = Number.parseInt(document.getElementById("pointsAdjustment").value)
    const motivo = document.getElementById("adjustmentReason").value.trim()

    if (!ajuste || ajuste === 0) {
      this.mostrarToast("Debe ingresar un ajuste válido", "error")
      return
    }

    if (!motivo) {
      this.mostrarToast("Debe ingresar un motivo para el ajuste", "error")
      return
    }

    const usuarios = this.obtenerUsuarios()
    const usuarioIndex = usuarios.findIndex((u) => u.id === userId)

    if (usuarioIndex !== -1) {
      const puntosActuales = usuarios[usuarioIndex].puntosReferidos || 0
      const nuevosPuntos = Math.max(0, puntosActuales + ajuste) // No permitir puntos negativos

      usuarios[usuarioIndex].puntosReferidos = nuevosPuntos

      // Registrar el ajuste en el historial del usuario
      if (!usuarios[usuarioIndex].historialPuntos) {
        usuarios[usuarioIndex].historialPuntos = []
      }

      usuarios[usuarioIndex].historialPuntos.push({
        fecha: new Date().toISOString(),
        tipo: "ajuste_admin",
        puntos: ajuste,
        motivo: motivo,
        puntosAntes: puntosActuales,
        puntosDespues: nuevosPuntos,
      })

      localStorage.setItem("usuarios", JSON.stringify(usuarios))

      this.mostrarToast(`Puntos ajustados exitosamente. Nuevo total: ${nuevosPuntos}`, "success")

      // Cerrar modal y actualizar datos
      const modal = window.bootstrap.Modal.getInstance(document.getElementById("adjustPointsModal"))
      modal.hide()

      this.cargarEstadisticas()
      this.cargarTopUsuarios()
    }
  }

  mostrarToast(mensaje, tipo = "info") {
    const toastContainer = document.getElementById("toastContainer") || this.crearToastContainer()

    const toastId = "toast-" + Date.now()
    const bgClass = tipo === "success" ? "bg-success" : tipo === "error" ? "bg-danger" : "bg-info"

    const toastHTML = `
            <div id="${toastId}" class="toast ${bgClass} text-white" role="alert">
                <div class="toast-body">
                    <i class="bi bi-${tipo === "success" ? "check-circle" : tipo === "error" ? "exclamation-circle" : "info-circle"}"></i>
                    ${mensaje}
                </div>
            </div>
        `

    toastContainer.insertAdjacentHTML("beforeend", toastHTML)

    const toastElement = document.getElementById(toastId)
    const toast = new window.bootstrap.Toast(toastElement)
    toast.show()

    // Remover el toast después de que se oculte
    toastElement.addEventListener("hidden.bs.toast", () => {
      toastElement.remove()
    })
  }

  crearToastContainer() {
    const container = document.createElement("div")
    container.id = "toastContainer"
    container.className = "toast-container position-fixed bottom-0 end-0 p-3"
    document.body.appendChild(container)
    return container
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.puntosManager = new PuntosManager()
})

// Sidebar toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar")
  const sidebar = document.getElementById("adminSidebar")

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  }
})
