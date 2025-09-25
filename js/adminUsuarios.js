class AdminUsuarios {
  constructor() {
    this.usuarios = []
    this.currentEditId = null
    this.currentProfileId = null
    this.isLoading = false

    window.adminUsuarios = this

    this.init()
  }

  init() {
    console.log("=== INICIO INICIALIZACIÓN ADMIN USUARIOS ===")
    console.log("Iniciando AdminUsuarios...")

    const storedUsers = localStorage.getItem("usuarios")
    console.log("localStorage 'usuarios' encontrado:", !!storedUsers)
    console.log("Tamaño de datos en localStorage:", storedUsers ? storedUsers.length : 0)

    this.showLoadingState()

    setTimeout(() => {
      console.log("Ejecutando carga después del delay...")
      this.loadUsers()
      this.bindEvents()
      this.updateStats()
      this.hideLoadingState()
      this.renderUsersTable()
      console.log("Inicialización completada exitosamente")
      console.log("=== FIN INICIALIZACIÓN ===")
    }, 3000) // Delay de 3 segundos para mostrar animación de carga
  }

  showLoadingState() {
    console.log("[v0] Mostrando estado de carga...")
    this.isLoading = true
    const tbody = document.getElementById("usersTableBody")
    if (tbody) {
      tbody.innerHTML = `
        <tr class="table-loading" id="loadingRow">
          <td colspan="8" class="text-center py-5">
            <div class="d-flex flex-column align-items-center">
              <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <h5 class="text-primary mb-2">Cargando registros...</h5>
              <p class="text-muted mb-0">Por favor espere mientras se cargan los usuarios</p>
              <div class="progress mt-3" style="width: 200px; height: 6px;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     role="progressbar" style="width: 100%"></div>
              </div>
            </div>
          </td>
        </tr>
      `
    }
  }

  hideLoadingState() {
    console.log("[v0] Ocultando estado de carga...")
    this.isLoading = false
    const loadingRow = document.getElementById("loadingRow")
    if (loadingRow) {
      loadingRow.remove()
    }
  }

  loadUsers() {
    console.log("=== CARGA DETALLADA DE USUARIOS ===")
    const storedUsers = localStorage.getItem("usuarios")
    console.log("Datos raw de localStorage:", !!storedUsers)
    console.log("Tipo de dato encontrado:", typeof storedUsers)

    if (storedUsers) {
      console.log("CONTENIDO EXACTO de localStorage:", storedUsers)
      console.log("LONGITUD del string:", storedUsers.length)
    }

    let existingUsers = []
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers)
        console.log("Parsing JSON exitoso")
        console.log("Usuarios encontrados en localStorage:", parsedUsers.length)

        if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
          existingUsers = parsedUsers.filter((user) => user.id && user.email && user.nombreCompleto && user.rut)
          console.log("Usuarios existentes válidos preservados:", existingUsers.length)

          // Mostrar información de usuarios existentes
          existingUsers.forEach((user) => {
            console.log(`Usuario existente preservado: ${user.email} (${user.nombreCompleto})`)
          })
        }
      } catch (error) {
        console.log("ERROR al parsear JSON:", error.message)
        existingUsers = []
      }
    }

    console.log("=== CARGANDO USUARIOS PRECARGADOS ===")
    const defaultUsers = [
      {
        id: "user_001",
        firstName: "Carlos",
        lastName: "González Pérez",
        nombreCompleto: "Carlos González Pérez",
        rut: "12.345.678-9",
        email: "carlos.gonzalez@gmail.com",
        telefono: "+56987654321",
        fechaNacimiento: "1995-03-15",
        gender: "masculino",
        level: 3,
        levelUpPoints: 1250,
        fechaRegistro: "2024-01-15T10:30:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "CARLOS001",
        puntosReferidos: 1250,
        password: "123456",
      },
      {
        id: "user_002",
        firstName: "María",
        lastName: "Rodríguez Silva",
        nombreCompleto: "María Rodríguez Silva",
        rut: "13.456.789-0",
        email: "maria.rodriguez@duocuc.cl",
        telefono: "+56976543210",
        fechaNacimiento: "1998-07-22",
        gender: "femenino",
        level: 5,
        levelUpPoints: 2800,
        fechaRegistro: "2024-02-20T14:15:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "MARIA002",
        puntosReferidos: 2800,
        password: "123456",
      },
      {
        id: "user_003",
        firstName: "Andrés",
        lastName: "López Martínez",
        nombreCompleto: "Andrés López Martínez",
        rut: "14.567.890-1",
        email: "andres.lopez@outlook.com",
        telefono: "+56965432109",
        fechaNacimiento: "1992-11-08",
        gender: "masculino",
        level: 2,
        levelUpPoints: 750,
        fechaRegistro: "2024-03-10T09:45:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "ANDRES003",
        puntosReferidos: 750,
        password: "123456",
      },
      {
        id: "user_004",
        firstName: "Valentina",
        lastName: "Morales Castro",
        nombreCompleto: "Valentina Morales Castro",
        rut: "15.678.901-2",
        email: "valentina.morales@duocuc.cl",
        telefono: "+56954321098",
        fechaNacimiento: "1999-05-14",
        gender: "femenino",
        level: 4,
        levelUpPoints: 1850,
        fechaRegistro: "2024-01-28T16:20:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "VALE004",
        puntosReferidos: 1850,
        password: "123456",
      },
      {
        id: "user_005",
        firstName: "Diego",
        lastName: "Fernández Rojas",
        nombreCompleto: "Diego Fernández Rojas",
        rut: "16.789.012-3",
        email: "diego.fernandez@gmail.com",
        telefono: "+56943210987",
        fechaNacimiento: "1996-09-03",
        gender: "masculino",
        level: 6,
        levelUpPoints: 3200,
        fechaRegistro: "2024-02-05T11:10:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "DIEGO005",
        puntosReferidos: 3200,
        password: "123456",
      },
      {
        id: "user_006",
        firstName: "Camila",
        lastName: "Torres Vega",
        nombreCompleto: "Camila Torres Vega",
        rut: "17.890.123-4",
        email: "camila.torres@yahoo.com",
        telefono: "+56932109876",
        fechaNacimiento: "1997-12-19",
        gender: "femenino",
        level: 3,
        levelUpPoints: 1400,
        fechaRegistro: "2024-03-02T13:25:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "CAMILA006",
        puntosReferidos: 1400,
        password: "123456",
      },
      {
        id: "user_007",
        firstName: "Sebastián",
        lastName: "Herrera Muñoz",
        nombreCompleto: "Sebastián Herrera Muñoz",
        rut: "18.901.234-5",
        email: "sebastian.herrera@duocuc.cl",
        telefono: "+56921098765",
        fechaNacimiento: "1994-04-27",
        gender: "masculino",
        level: 7,
        levelUpPoints: 4100,
        fechaRegistro: "2024-01-12T08:30:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "SEBA007",
        puntosReferidos: 4100,
        password: "123456",
      },
      {
        id: "user_008",
        firstName: "Francisca",
        lastName: "Sánchez Díaz",
        nombreCompleto: "Francisca Sánchez Díaz",
        rut: "19.012.345-6",
        email: "francisca.sanchez@hotmail.com",
        telefono: "+56910987654",
        fechaNacimiento: "2000-08-11",
        gender: "femenino",
        level: 2,
        levelUpPoints: 650,
        fechaRegistro: "2024-03-18T15:40:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "FRAN008",
        puntosReferidos: 650,
        password: "123456",
      },
      {
        id: "user_009",
        firstName: "Matías",
        lastName: "Vargas Contreras",
        nombreCompleto: "Matías Vargas Contreras",
        rut: "20.123.456-7",
        email: "matias.vargas@duocuc.cl",
        telefono: "+56909876543",
        fechaNacimiento: "1993-10-06",
        gender: "masculino",
        level: 5,
        levelUpPoints: 2650,
        fechaRegistro: "2024-02-14T12:15:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "MATIAS009",
        puntosReferidos: 2650,
        password: "123456",
      },
      {
        id: "user_010",
        firstName: "Isidora",
        lastName: "Ramírez Flores",
        nombreCompleto: "Isidora Ramírez Flores",
        rut: "21.234.567-8",
        email: "isidora.ramirez@gmail.com",
        telefono: "+56998765432",
        fechaNacimiento: "1998-01-25",
        gender: "femenino",
        level: 4,
        levelUpPoints: 1950,
        fechaRegistro: "2024-01-30T17:20:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "ISI010",
        puntosReferidos: 1950,
        password: "123456",
      },
      {
        id: "user_011",
        firstName: "Joaquín",
        lastName: "Mendoza Pinto",
        nombreCompleto: "Joaquín Mendoza Pinto",
        rut: "22.345.678-9",
        email: "joaquin.mendoza@duocuc.cl",
        telefono: "+56987654321",
        fechaNacimiento: "1995-06-18",
        gender: "masculino",
        level: 3,
        levelUpPoints: 1100,
        fechaRegistro: "2024-03-05T10:50:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "JOAQUIN011",
        puntosReferidos: 1100,
        password: "123456",
      },
      {
        id: "user_012",
        firstName: "Antonia",
        lastName: "Castillo Moreno",
        nombreCompleto: "Antonia Castillo Moreno",
        rut: "23.456.789-0",
        email: "antonia.castillo@outlook.com",
        telefono: "+56976543210",
        fechaNacimiento: "1999-09-12",
        gender: "femenino",
        level: 6,
        levelUpPoints: 3450,
        fechaRegistro: "2024-01-22T14:35:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "ANTO012",
        puntosReferidos: 3450,
        password: "123456",
      },
      {
        id: "user_013",
        firstName: "Benjamín",
        lastName: "Espinoza Guerrero",
        nombreCompleto: "Benjamín Espinoza Guerrero",
        rut: "24.567.890-1",
        email: "benjamin.espinoza@gmail.com",
        telefono: "+56965432109",
        fechaNacimiento: "1996-02-29",
        gender: "masculino",
        level: 2,
        levelUpPoints: 800,
        fechaRegistro: "2024-03-12T09:15:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "BENJA013",
        puntosReferidos: 800,
        password: "123456",
      },
      {
        id: "user_014",
        firstName: "Sofía",
        lastName: "Navarro Reyes",
        nombreCompleto: "Sofía Navarro Reyes",
        rut: "25.678.901-2",
        email: "sofia.navarro@duocuc.cl",
        telefono: "+56954321098",
        fechaNacimiento: "1997-11-07",
        gender: "femenino",
        level: 4,
        levelUpPoints: 2100,
        fechaRegistro: "2024-02-08T16:45:00.000Z",
        beneficioDuoc: true,
        codigoReferido: "SOFIA014",
        puntosReferidos: 2100,
        password: "123456",
      },
      {
        id: "user_015",
        firstName: "Nicolás",
        lastName: "Jiménez Ortega",
        nombreCompleto: "Nicolás Jiménez Ortega",
        rut: "26.789.012-3",
        email: "nicolas.jimenez@hotmail.com",
        telefono: "+56943210987",
        fechaNacimiento: "1994-12-31",
        gender: "masculino",
        level: 5,
        levelUpPoints: 2750,
        fechaRegistro: "2024-01-08T11:25:00.000Z",
        beneficioDuoc: false,
        codigoReferido: "NICO015",
        puntosReferidos: 2750,
        password: "123456",
      },
    ]

    console.log("USUARIOS PRECARGADOS DEFINIDOS:", defaultUsers.length)

    const combinedUsers = [...existingUsers]

    defaultUsers.forEach((defaultUser) => {
      const exists = existingUsers.find((existing) => existing.email === defaultUser.email)
      if (!exists) {
        combinedUsers.push(defaultUser)
        console.log(`Usuario precargado agregado: ${defaultUser.email}`)
      } else {
        console.log(`Usuario precargado omitido (ya existe): ${defaultUser.email}`)
      }
    })

    this.usuarios = combinedUsers
    console.log("USUARIOS COMBINADOS TOTAL:", this.usuarios.length)
    console.log("- Usuarios existentes preservados:", existingUsers.length)
    console.log("- Usuarios precargados agregados:", this.usuarios.length - existingUsers.length)

    this.saveUsers()
    console.log("Usuarios combinados guardados en localStorage")

    console.log("Usuarios cargados desde localStorage:", this.usuarios.length)
    console.log("Array completo de usuarios disponible")

    const duocUsers = this.usuarios.filter((u) => u.beneficioDuoc).length
    console.log("Usuarios DUOC encontrados:", duocUsers)
    console.log("Usuarios normales encontrados:", this.usuarios.length - duocUsers)

    console.log("=== FIN CARGA DE USUARIOS ===")
  }

  syncWithAdminData() {
    console.log("Sincronizando datos con admin.js...")

    // Convertir formato para compatibilidad con admin.js
    const adminUsersFormat = {}
    this.usuarios.forEach((user, index) => {
      adminUsersFormat[`user${index + 1}`] = {
        id: user.id,
        fullName: user.nombreCompleto,
        email: user.email,
        level: user.level,
        levelUpPoints: user.levelUpPoints,
        registrationDate: user.fechaRegistro
          ? user.fechaRegistro.split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: "active",
      }
    })

    // Guardar en formato admin.js para compatibilidad
    localStorage.setItem("admin_users", JSON.stringify(adminUsersFormat))
    console.log("Datos sincronizados con admin.js:", Object.keys(adminUsersFormat).length, "usuarios")
  }

  saveUsers() {
    console.log("Guardando usuarios en localStorage...")
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios))

    this.syncWithAdminData()

    console.log("Usuarios guardados exitosamente:", this.usuarios.length)
  }

  bindEvents() {
    // Botón agregar usuario
    const addUserBtn = document.getElementById("addUserBtn")
    if (addUserBtn) {
      addUserBtn.addEventListener("click", () => {
        this.openUserModal()
      })
    }

    // Botón guardar usuario
    const saveUserBtn = document.getElementById("saveUserBtn")
    if (saveUserBtn) {
      saveUserBtn.addEventListener("click", () => {
        this.saveUser()
      })
    }

    // Botón confirmar eliminación
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", () => {
        this.deleteUser()
      })
    }

    // Botón editar desde perfil
    const editFromProfileBtn = document.getElementById("editFromProfileBtn")
    if (editFromProfileBtn) {
      editFromProfileBtn.addEventListener("click", () => {
        this.editUserFromProfile()
      })
    }

    const searchUsers = document.getElementById("searchUsers")
    if (searchUsers) {
      let searchTimeout
      searchUsers.addEventListener("input", (e) => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          this.renderUsersTable()
        }, 300)
      })
    }

    const userTypeFilter = document.getElementById("userTypeFilter")
    if (userTypeFilter) {
      userTypeFilter.addEventListener("change", () => {
        this.renderUsersTable()
      })
    }

    const clearFiltersBtn = document.getElementById("clearFilters")
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        const typeFilter = document.getElementById("userTypeFilter")
        const searchInput = document.getElementById("searchUsers")
        if (typeFilter) typeFilter.value = ""
        if (searchInput) searchInput.value = ""
        this.renderUsersTable()
      })
    }

    const userEmail = document.getElementById("userEmail")
    if (userEmail) {
      userEmail.addEventListener("input", (e) => {
        this.checkDuocBenefit(e.target.value)
      })
    }

    // Botón copiar código de referido
    const copyReferralCodeBtn = document.getElementById("copyReferralCodeBtn")
    if (copyReferralCodeBtn) {
      copyReferralCodeBtn.addEventListener("click", () => {
        this.copyReferralCode()
      })
    }

    // Botón cambiar contraseña
    const changePasswordBtn = document.getElementById("changePasswordBtn")
    if (changePasswordBtn) {
      changePasswordBtn.addEventListener("click", () => {
        this.changeUserPassword()
      })
    }

    // Botón alternar visibilidad de contraseña
    const passwordToggle = document.getElementById("newPasswordToggle")
    if (passwordToggle) {
      passwordToggle.addEventListener("click", () => {
        this.togglePasswordVisibility("newPassword")
      })
    }

    const confirmPasswordToggle = document.getElementById("confirmPasswordToggle")
    if (confirmPasswordToggle) {
      confirmPasswordToggle.addEventListener("click", () => {
        this.togglePasswordVisibility("confirmPassword")
      })
    }
  }

  checkDuocBenefit(email) {
    const duocBenefitElement = document.getElementById("duocBenefitModal")

    if (email && email.includes("@")) {
      const domain = email.split("@")[1]
      if (domain && domain.toLowerCase().includes("duoc")) {
        duocBenefitElement.classList.remove("d-none")
        duocBenefitElement.style.animation = "slideInUp 0.3s ease"
      } else {
        duocBenefitElement.classList.add("d-none")
      }
    } else {
      duocBenefitElement.classList.add("d-none")
    }
  }

  updateStats() {
    const totalUsers = this.usuarios.length
    const duocUsers = this.usuarios.filter((user) => user.email && user.email.toLowerCase().includes("duoc")).length
    const normalUsers = totalUsers - duocUsers

    const today = new Date().toDateString()
    const todayUsers = this.usuarios.filter((user) => {
      if (user.fechaRegistro) {
        const userDate = new Date(user.fechaRegistro).toDateString()
        return userDate === today
      }
      return false
    }).length

    console.log("Estadísticas calculadas:", {
      totalUsers,
      duocUsers,
      normalUsers,
      todayUsers,
    })

    if (window.adminData) {
      window.adminData.stats.totalUsers = totalUsers
      console.log("Estadísticas actualizadas en admin.js")
    }

    // Animación de conteo
    this.animateCounter("totalUsers", totalUsers)
    this.animateCounter("normalUsers", normalUsers)
    this.animateCounter("duocUsers", duocUsers)
    this.animateCounter("todayUsers", todayUsers)
  }

  animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId)
    if (!element) {
      console.log("Elemento no encontrado para contador:", elementId)
      return
    }

    const currentValue = Number.parseInt(element.textContent) || 0

    console.log("Animando contador:", {
      elementId,
      valorActual: currentValue,
      valorObjetivo: targetValue,
    })

    // Si ya está en el valor correcto, no hacer nada
    if (currentValue === targetValue) {
      console.log("Valor ya correcto para", elementId)
      return
    }

    const increment = targetValue > currentValue ? 1 : -1
    const duration = 1000
    const steps = Math.abs(targetValue - currentValue)
    const stepDuration = steps > 0 ? duration / steps : 0

    let current = currentValue
    const timer = setInterval(() => {
      current += increment
      element.textContent = current

      console.log("Actualizando contador", elementId, ":", current, "objetivo:", targetValue)

      if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
        current = targetValue // Asegurar valor exacto
        element.textContent = current
        clearInterval(timer)
        console.log("Contador completado para", elementId, ":", current)

        // Efecto de pulso al completar
        element.parentElement.parentElement.style.animation = "pulse 0.5s ease"
      }
    }, stepDuration)
  }

  renderUsersTable() {
    console.log("[v0] === RENDER USERS TABLE DEBUG ===")
    if (this.isLoading) {
      console.log("[v0] Tabla aún en estado de carga, saltando renderizado")
      return
    }

    const tbody = document.getElementById("usersTableBody")
    const emptyState = document.getElementById("emptyState")
    const typeFilter = document.getElementById("userTypeFilter")
    const searchUsers = document.getElementById("searchUsers")

    console.log("[v0] DOM elements found:")
    console.log("[v0] - usersTableBody:", tbody)
    console.log("[v0] - emptyState:", emptyState)
    console.log("[v0] - userTypeFilter:", typeFilter)
    console.log("[v0] - searchUsers:", searchUsers)

    if (!tbody) {
      console.error("[v0] ERROR: usersTableBody not found!")
      return
    }

    if (!typeFilter) {
      console.error("[v0] ERROR: userTypeFilter not found!")
      return
    }

    if (!searchUsers) {
      console.error("[v0] ERROR: searchUsers not found!")
      return
    }

    const typeFilterValue = typeFilter.value
    const searchTerm = searchUsers.value.toLowerCase()

    console.log("[v0] Filtros aplicados:", { typeFilterValue, searchTerm })
    console.log("[v0] Total usuarios antes de filtrar:", this.usuarios.length)

    // Filtrar usuarios
    const filteredUsers = this.usuarios.filter((user) => {
      const matchesType =
        !typeFilterValue ||
        (typeFilterValue === "duoc" && user.email && user.email.toLowerCase().includes("duoc")) ||
        (typeFilterValue === "normal" && (!user.email || !user.email.toLowerCase().includes("duoc")))

      const matchesSearch =
        !searchTerm ||
        (user.nombreCompleto && user.nombreCompleto.toLowerCase().includes(searchTerm)) ||
        (user.email && user.email.toLowerCase().includes(searchTerm)) ||
        (user.rut && user.rut.toLowerCase().includes(searchTerm))

      console.log("[v0] Usuario:", user.email, "matchesType:", matchesType, "matchesSearch:", matchesSearch)
      return matchesType && matchesSearch
    })

    console.log("[v0] Usuarios después de filtrar:", filteredUsers.length)
    console.log("[v0] Usuarios filtrados:", filteredUsers)

    tbody.innerHTML = ""

    if (filteredUsers.length === 0) {
      console.log("[v0] No hay usuarios para mostrar")
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4">
            <i class="bi bi-inbox display-4 text-muted"></i>
            <p class="text-muted mt-2">No se encontraron usuarios</p>
          </td>
        </tr>
      `
      return
    }

    tbody.innerHTML = filteredUsers
      .map((user, index) => {
        const isDuoc = user.email && user.email.toLowerCase().includes("duoc")

        // Separar nombre y apellido del nombreCompleto
        const nombreParts = (user.nombreCompleto || "").split(" ")
        const nombre = nombreParts[0] || "No disponible"
        const apellido = nombreParts.slice(1).join(" ") || "No disponible"

        const puntosActuales = user.puntosReferidos || 0

        return `
            <tr class="table-row-compact">
              <td class="text-center align-middle py-2">
                <span class="fw-bold text-primary small">${index + 1}</span>
              </td>
              <td class="text-center align-middle py-2">
                <div class="user-info-compact">
                  <span class="fw-bold small">${nombre}</span>
                </div>
              </td>
              <td class="text-center align-middle py-2 d-none d-lg-table-cell">
                <span class="fw-bold small">${apellido}</span>
              </td>
              <td class="text-center align-middle py-2">
                <div class="email-info-compact">
                  <span class="text-break small">${user.email || "No disponible"}</span>
                  ${isDuoc ? '<span class="badge bg-warning text-dark mt-1 small"><i class="bi bi-mortarboard"></i> DUOC</span>' : ""}
                </div>
              </td>
              <td class="text-center align-middle py-2 d-none d-xl-table-cell">
                <span class="small">${user.rut || "N/D"}</span>
              </td>
              <td class="text-center align-middle py-2 d-none d-md-table-cell">
                <div class="phone-info-compact">
                  <i class="bi bi-telephone text-success"></i>
                  <span class="small ms-1">${user.telefono || "N/D"}</span>
                </div>
              </td>
              <td class="text-center align-middle py-2 d-none d-lg-table-cell">
                <span class="badge bg-success text-white small">
                  <i class="bi bi-star"></i> ${puntosActuales.toLocaleString()}
                </span>
              </td>
              <td class="text-center align-middle py-2">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-info btn-sm" onclick="window.adminUsuarios.viewProfile('${user.id}')" title="Ver Perfil">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-primary btn-sm" onclick="window.adminUsuarios.editUser('${user.id}')" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-outline-danger btn-sm" onclick="window.adminUsuarios.confirmDelete('${user.id}')" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `
      })
      .join("")

    const usersCountElement = document.getElementById("usersCount")
    if (usersCountElement) {
      usersCountElement.textContent = filteredUsers.length
    } else {
      console.log("[v0] WARNING: usersCount element not found")
    }

    console.log("[v0] === FIN RENDER USERS TABLE ===")
  }

  openUserModal(userId = null) {
    this.currentEditId = userId ? String(userId) : null
    const modal = new window.bootstrap.Modal(document.getElementById("userModal"))
    const modalTitle = document.getElementById("userModalTitle")

    if (userId) {
      modalTitle.innerHTML = '<i class="bi bi-pencil"></i> Editar Usuario'
      const user = this.usuarios.find((u) => String(u.id) === String(userId))
      if (user) {
        document.getElementById("editUserId").value = user.id
        document.getElementById("userFirstName").value = user.firstName || user.nombreCompleto?.split(" ")[0] || ""
        document.getElementById("userLastName").value =
          user.lastName || user.nombreCompleto?.split(" ").slice(1).join(" ") || ""
        document.getElementById("userRut").value = user.rut || ""
        document.getElementById("userEmail").value = user.email || ""
        document.getElementById("userPhone").value = user.telefono || ""
        document.getElementById("userBirthDate").value = user.fechaNacimiento || ""
        document.getElementById("userGender").value = user.gender || ""
        document.getElementById("userLevel").value = user.level || 1
        document.getElementById("userPoints").value = user.levelUpPoints || 0

        this.checkDuocBenefit(user.email || "")
      }
    } else {
      modalTitle.innerHTML = '<i class="bi bi-person-plus"></i> Agregar Usuario'
      document.getElementById("userForm").reset()
      document.getElementById("editUserId").value = ""
      document.getElementById("duocBenefitModal").classList.add("d-none")
    }

    modal.show()
  }

  saveUser() {
    const saveBtn = document.getElementById("saveUserBtn")
    const originalText = saveBtn.innerHTML

    // Estado de carga
    saveBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Guardando...'
    saveBtn.disabled = true

    const form = document.getElementById("userForm")
    if (!form.checkValidity()) {
      form.reportValidity()
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
      return
    }

    const firstName = document.getElementById("userFirstName").value.trim()
    const lastName = document.getElementById("userLastName").value.trim()

    const userData = {
      firstName: firstName,
      lastName: lastName,
      nombreCompleto: `${firstName} ${lastName}`, // Para compatibilidad
      rut: document.getElementById("userRut").value.trim(),
      email: document.getElementById("userEmail").value.trim(),
      telefono: document.getElementById("userPhone").value.trim(),
      fechaNacimiento: document.getElementById("userBirthDate").value,
      gender: document.getElementById("userGender").value,
      level: Number.parseInt(document.getElementById("userLevel").value) || 1,
      levelUpPoints: Number.parseInt(document.getElementById("userPoints").value) || 0,
    }

    if (!userData.firstName || !userData.lastName || !userData.rut || !userData.email || !userData.telefono) {
      this.showNotification("Por favor, completa todos los campos obligatorios", "error")
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
      return
    }

    // Validar campos vacíos
    if (!userData.nombreCompleto || !userData.rut || !userData.email || !userData.telefono) {
      this.showNotification("Por favor, completa todos los campos obligatorios", "error")
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
      return
    }

    // Validar RUT
    if (!this.validateRut(userData.rut)) {
      this.showNotification("El RUT ingresado no es válido", "error")
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
      return
    }

    setTimeout(() => {
      if (this.currentEditId) {
        const userIndex = this.usuarios.findIndex((u) => String(u.id) === String(this.currentEditId))
        if (userIndex !== -1) {
          this.usuarios[userIndex] = { ...this.usuarios[userIndex], ...userData }
        }
        this.showNotification("Usuario actualizado correctamente", "success")
      } else {
        const newUser = {
          id: "user_" + Date.now(),
          ...userData,
          fechaRegistro: new Date().toISOString(),
          beneficioDuoc: userData.email.toLowerCase().includes("duoc"),
        }
        this.usuarios.push(newUser)
        this.showNotification("Usuario agregado correctamente", "success")
      }

      this.saveUsers()
      this.updateStats()
      this.renderUsersTable()

      const modal = window.bootstrap.Modal.getInstance(document.getElementById("userModal"))
      modal.hide()

      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
    }, 1000)
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`
    notification.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      animation: slideInLeft 0.3s ease;
    `

    notification.innerHTML = `
      <i class="bi bi-${type === "success" ? "check-circle" : type === "error" ? "exclamation-triangle" : "info-circle"}"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 5000)
  }

  editUser(userId) {
    this.openUserModal(userId)
  }

  confirmDelete(userId) {
    console.log("[v0] === CONFIRM DELETE ===")
    console.log("[v0] userId recibido:", userId)
    console.log("[v0] Tipo de userId:", typeof userId)

    this.currentEditId = String(userId)
    console.log("[v0] currentEditId establecido:", this.currentEditId)

    const user = this.usuarios.find((u) => {
      const userIdStr = String(u.id)
      const currentIdStr = String(userId)
      console.log("[v0] Comparando:", userIdStr, "con", currentIdStr, "iguales:", userIdStr === currentIdStr)
      return userIdStr === currentIdStr
    })
    console.log("[v0] Usuario encontrado:", user)

    const modal = new window.bootstrap.Modal(document.getElementById("deleteModal"))

    // Personalizar mensaje de confirmación
    const modalBody = document.querySelector("#deleteModal .modal-body")
    modalBody.innerHTML = `
      <div class="text-center">
        <i class="bi bi-exclamation-triangle text-warning" style="font-size: 3rem;"></i>
        <h5 class="mt-3">¿Eliminar usuario?</h5>
        <p>¿Estás seguro de que deseas eliminar a <strong>${user?.nombreCompleto || "este usuario"}</strong>?</p>
        <p class="text-muted">Esta acción no se puede deshacer.</p>
      </div>
    `

    modal.show()
  }

  deleteUser() {
    console.log("[v0] === INICIO deleteUser ===")
    console.log("[v0] currentEditId:", this.currentEditId)
    console.log("[v0] usuarios antes de eliminar:", this.usuarios.length, this.usuarios)

    if (this.currentEditId) {
      const user = this.usuarios.find((u) => String(u.id) === String(this.currentEditId))
      console.log("[v0] Usuario encontrado para eliminar:", user)

      const usuariosAntes = [...this.usuarios]
      console.log(
        "[v0] Array usuarios antes del filter:",
        usuariosAntes.map((u) => ({ id: u.id, email: u.email, nombre: u.nombreCompleto })),
      )

      this.usuarios = this.usuarios.filter((u) => {
        const shouldKeep = String(u.id) !== String(this.currentEditId)
        console.log("[v0] Evaluando usuario:", u.id, "shouldKeep:", shouldKeep, "currentEditId:", this.currentEditId)
        return shouldKeep
      })

      console.log("[v0] usuarios después de eliminar:", this.usuarios.length, this.usuarios)
      console.log(
        "[v0] Array usuarios después del filter:",
        this.usuarios.map((u) => ({ id: u.id, email: u.email })),
      )

      this.saveUsers()
      console.log("[v0] Guardado en localStorage completado")

      const storedUsers = localStorage.getItem("usuarios")
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : []
      console.log(
        "[v0] Usuarios en localStorage después de guardar:",
        parsedUsers.length,
        parsedUsers.map((u) => ({ id: u.id, email: u.email })),
      )

      this.updateStats()
      console.log("[v0] Stats actualizadas")

      this.renderUsersTable()
      console.log("[v0] Tabla renderizada")

      const modal = window.bootstrap.Modal.getInstance(document.getElementById("deleteModal"))
      modal.hide()

      this.showNotification(`Usuario ${user?.nombreCompleto || ""} eliminado correctamente`, "success")
      console.log("[v0] Notificación mostrada para:", user?.nombreCompleto)

      this.currentEditId = null
      console.log("[v0] currentEditId reseteado")
    } else {
      console.log("[v0] ERROR: No hay currentEditId definido")
    }
    console.log("[v0] === FIN deleteUser ===")
  }

  validateRut(rut) {
    if (!rut) return false

    const cleanRut = rut.replace(/[^0-9kK]/g, "")
    if (cleanRut.length < 8) return false

    const body = cleanRut.slice(0, -1)
    const dv = cleanRut.slice(-1).toUpperCase()

    let sum = 0
    let multiplier = 2

    for (let i = body.length - 1; i >= 0; i--) {
      sum += Number.parseInt(body[i]) * multiplier
      multiplier = multiplier === 7 ? 2 : multiplier + 1
    }

    const expectedDv = 11 - (sum % 11)
    const finalDv = expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString()

    return dv === finalDv
  }

  viewProfile(userId) {
    const user = this.usuarios.find((u) => String(u.id) === String(userId))
    if (!user) {
      this.showNotification("Usuario no encontrado", "error")
      return
    }

    document.getElementById("profileName").textContent = user.nombreCompleto || "Sin nombre"
    document.getElementById("profileEmail").textContent = user.email || "Sin email"

    // Tipo de usuario
    const isDuoc = user.email && user.email.toLowerCase().includes("duoc")
    const userTypeElement = document.getElementById("profileUserType")
    if (isDuoc) {
      userTypeElement.innerHTML = '<i class="bi bi-mortarboard"></i> Usuario DUOC UC'
      userTypeElement.className = "badge bg-warning text-dark"
    } else {
      userTypeElement.innerHTML = '<i class="bi bi-person"></i> Usuario Normal'
      userTypeElement.className = "badge bg-primary"
    }

    // Nivel
    document.getElementById("profileLevel").innerHTML = `<i class="bi bi-award"></i> Nivel ${user.level || 1}`

    document.getElementById("profileRut").textContent = user.rut || "No disponible"
    document.getElementById("profileBirthDate").textContent = user.fechaNacimiento
      ? new Date(user.fechaNacimiento).toLocaleDateString("es-CL")
      : "No disponible"
    document.getElementById("profileGender").textContent = this.formatGender(user.gender)
    document.getElementById("profilePhone").textContent = user.telefono || "No disponible"
    document.getElementById("profileUserId").textContent = user.id || "No disponible"
    document.getElementById("profileReferralCode").textContent = user.codigoReferido || "No generado"
    document.getElementById("profileReferralCodeCopy").value = user.codigoReferido || ""

    document.getElementById("profilePoints").textContent = (user.puntosReferidos || 0).toLocaleString()
    document.getElementById("profileLevelDisplay").textContent = user.level || 1
    document.getElementById("profileRegistrationDate").textContent = user.fechaRegistro
      ? new Date(user.fechaRegistro).toLocaleDateString("es-CL")
      : "No disponible"

    const referralsCount = this.usuarios.filter((u) => u.referidoPor === user.codigoReferido).length
    document.getElementById("profileReferralsCount").textContent = referralsCount
    document.getElementById("profileReferredBy").textContent = user.referidoPor
      ? `${user.referidoPor} (${this.usuarios.find((u) => u.codigoReferido === user.referidoPor)?.nombreCompleto || "Usuario no encontrado"})`
      : "Registro directo"
    document.getElementById("profileReferralPoints").textContent =
      `${(user.puntosReferidos || 0).toLocaleString()} puntos`

    this.loadUserReferrals(user.codigoReferido)

    // Guardar ID para edición desde perfil
    this.currentProfileId = userId

    // Mostrar modal
    const modal = new window.bootstrap.Modal(document.getElementById("profileModal"))
    modal.show()
  }

  formatGender(gender) {
    const genderMap = {
      masculino: "Masculino",
      femenino: "Femenino",
      otro: "Otro",
      "prefiero-no-decir": "Prefiero no decir",
    }
    return genderMap[gender] || "No especificado"
  }

  editUserFromProfile() {
    if (this.currentProfileId) {
      // Cerrar modal de perfil
      const profileModal = window.bootstrap.Modal.getInstance(document.getElementById("profileModal"))
      if (profileModal) {
        profileModal.hide()
      }

      // Abrir modal de edición
      setTimeout(() => {
        this.editUser(this.currentProfileId)
      }, 300)
    }
  }

  loadUserReferrals(referralCode) {
    const referralsList = document.getElementById("referralsList")

    if (!referralCode) {
      referralsList.innerHTML = '<p class="text-muted text-center py-3">Este usuario no tiene código de referido</p>'
      return
    }

    const referredUsers = this.usuarios.filter((u) => u.referidoPor === referralCode)

    if (referredUsers.length === 0) {
      referralsList.innerHTML = '<p class="text-muted text-center py-3">No ha referido a ningún usuario aún</p>'
      return
    }

    const referralsHtml = referredUsers.map((user, index) => ``).join("")

    referralsList.innerHTML = referralsHtml
  }

  copyReferralCode() {
    const codeInput = document.getElementById("profileReferralCodeCopy")
    if (codeInput.value) {
      codeInput.select()
      document.execCommand("copy")
      this.showNotification("Código de referido copiado al portapapeles", "success")
    } else {
      this.showNotification("No hay código de referido para copiar", "error")
    }
  }

  togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId)
    const toggle = document.getElementById(inputId + "Toggle")

    if (input.type === "password") {
      input.type = "text"
      toggle.className = "bi bi-eye-slash"
    } else {
      input.type = "password"
      toggle.className = "bi bi-eye"
    }
  }

  changeUserPassword() {
    const user = this.usuarios.find((u) => String(u.id) === String(this.currentProfileId))
    if (!user) {
      this.showNotification("Usuario no encontrado", "error")
      return
    }

    // Mostrar confirmación
    const confirmChange = confirm(
      `¿Estás seguro de que deseas cambiar la contraseña de ${user.nombreCompleto || user.email}?\n\nEsta acción no se puede deshacer.`,
    )

    if (!confirmChange) {
      return
    }

    const newPassword = document.getElementById("newPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (!newPassword || !confirmPassword) {
      this.showNotification("Por favor, completa ambos campos de contraseña", "error")
      return
    }

    if (newPassword.length < 6) {
      this.showNotification("La contraseña debe tener al menos 6 caracteres", "error")
      return
    }

    if (newPassword !== confirmPassword) {
      this.showNotification("Las contraseñas no coinciden", "error")
      return
    }

    if (!this.currentProfileId) {
      this.showNotification("Error: No se pudo identificar el usuario", "error")
      return
    }

    // Buscar y actualizar usuario
    const userIndex = this.usuarios.findIndex((u) => String(u.id) === String(this.currentProfileId))
    if (userIndex === -1) {
      this.showNotification("Usuario no encontrado", "error")
      return
    }

    // Actualizar contraseña
    this.usuarios[userIndex].password = newPassword
    this.saveUsers()

    // Limpiar formulario
    document.getElementById("changePasswordForm").reset()

    this.showNotification("Contraseña cambiada exitosamente", "success")

    // Log para control de tickets
    console.log(
      `[ADMIN] Contraseña cambiada para usuario: ${this.usuarios[userIndex].email} - ${new Date().toLocaleString()}`,
    )
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando AdminUsuarios...")
  new AdminUsuarios()
})
