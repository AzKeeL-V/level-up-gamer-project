// Sistema de gestión de usuarios con validaciones
class UsuarioManager {
  constructor() {
    this.usuarios = this.cargarUsuarios()
  }

  // Cargar usuarios desde localStorage
  cargarUsuarios() {
    const usuarios = localStorage.getItem("usuarios")
    return usuarios ? JSON.parse(usuarios) : []
  }

  // Guardar usuarios en localStorage
  guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios))
  }

  // Validar RUT chileno
  validarRUT(rut) {
    // Limpiar RUT (quitar puntos y guión)
    rut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase()

    if (rut.length < 8 || rut.length > 9) return false

    const cuerpo = rut.slice(0, -1)
    const dv = rut.slice(-1)

    // Verificar que el cuerpo sean solo números
    if (!/^\d+$/.test(cuerpo)) return false

    // Calcular dígito verificador
    let suma = 0
    let multiplicador = 2

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += Number.parseInt(cuerpo[i]) * multiplicador
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
    }

    const resto = suma % 11
    const dvCalculado = resto === 0 ? "0" : resto === 1 ? "K" : (11 - resto).toString()

    return dv === dvCalculado
  }

  // Formatear RUT
  formatearRUT(rut) {
    rut = rut.replace(/\./g, "").replace(/-/g, "")
    if (rut.length <= 1) return rut

    const cuerpo = rut.slice(0, -1)
    const dv = rut.slice(-1)

    // Agregar puntos cada 3 dígitos
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    return `${cuerpoFormateado}-${dv}`
  }

  // Validar email
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Validar teléfono chileno
  validarTelefono(telefono) {
    if (!telefono || typeof telefono !== "string") {
      return false
    }

    // 1. Limpiar todo lo que no sea un dígito
    const digitos = telefono.replace(/\D/g, "")

    // 2. Comprobar los formatos válidos en Chile
    // Caso 1: Ingresó los 9 dígitos directamente (ej: 987654321)
    if (digitos.length === 9 && digitos.startsWith("9")) {
      return true
    }
    // Caso 2: Ingresó el código de país + 9 dígitos (ej: 56987654321)
    if (digitos.length === 11 && digitos.startsWith("569")) {
      return true
    }
    // Caso 3: Ingresó solo 8 dígitos (nuevo formato con prefijo +569)
    if (digitos.length === 8) {
      return true
    }

    // 3. Si no cumple ninguna de las condiciones, no es válido.
    return false
  }

  // Validar edad (mayor de 18 años)
  validarEdad(fechaNacimiento) {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mesActual = hoy.getMonth()
    const mesNacimiento = nacimiento.getMonth()

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }

    return edad >= 18
  }

  // Verificar si email ya existe
  emailExiste(email) {
    return this.usuarios.some((usuario) => usuario.email.toLowerCase() === email.toLowerCase())
  }

  // Verificar si RUT ya existe
  rutExiste(rut) {
    const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "")
    return this.usuarios.some((usuario) => usuario.rut.replace(/\./g, "").replace(/-/g, "") === rutLimpio)
  }

  detectarBeneficioDuoc(email) {
    console.log("[v0] detectarBeneficioDuoc llamado con:", email)

    if (!email || typeof email !== "string" || email.trim() === "") {
      console.log("[v0] Email vacío o inválido, retornando false")
      return false
    }

    const emailLimpio = email.trim().toLowerCase()
    console.log("[v0] Email limpio:", emailLimpio)

    // Verificar que tenga formato de email básico
    if (!emailLimpio.includes("@") || emailLimpio.indexOf("@") === emailLimpio.length - 1) {
      console.log("[v0] Email no tiene @ o @ está al final, retornando false")
      return false
    }

    const partes = emailLimpio.split("@")
    console.log("[v0] Partes del email:", partes)

    if (partes.length !== 2) {
      console.log("[v0] Email no tiene exactamente 2 partes, retornando false")
      return false
    }

    const dominio = partes[1]
    console.log("[v0] Dominio extraído:", dominio)

    // Verificar que el dominio no esté vacío y contenga "duoc" específicamente
    if (!dominio || dominio.trim() === "") {
      console.log("[v0] Dominio vacío, retornando false")
      return false
    }

    // Solo detectar dominios que contengan "duoc" después del @
    const resultado = dominio === "duoc.cl"
    console.log("[v0] ¿Dominio es duoc.cl?", resultado)
    return resultado
  }

  cargarConfiguracionPuntos() {
    const config = localStorage.getItem("puntosConfig")
    return config
      ? JSON.parse(config)
      : {
          registrationPoints: 100,
          referralPoints: 500,
          purchasePoints: 10,
          reviewPoints: 50,
          birthdayPoints: 200,
        }
  }

  registrarUsuario(datosUsuario, codigoReferido = null) {
    console.log("[v0] === INICIO REGISTRO DE USUARIO ===")
    console.log("[v0] Datos recibidos:", datosUsuario)
    console.log("[v0] Código de referido recibido:", codigoReferido)

    console.log("[v0] === ANÁLISIS DETALLADO DEL CÓDIGO DE REFERIDO ===")
    console.log("[v0] ¿datosUsuario tiene propiedad codigoReferido?:", "codigoReferido" in datosUsuario)
    console.log("[v0] Valor de datosUsuario.codigoReferido:", datosUsuario.codigoReferido)
    console.log("[v0] Tipo de datosUsuario.codigoReferido:", typeof datosUsuario.codigoReferido)
    console.log("[v0] ¿Es null?:", datosUsuario.codigoReferido === null)
    console.log("[v0] ¿Es undefined?:", datosUsuario.codigoReferido === undefined)
    console.log("[v0] ¿Es string vacío?:", datosUsuario.codigoReferido === "")
    console.log("[v0] ¿Es truthy?:", !!datosUsuario.codigoReferido)

    // Use the referral code from datosUsuario instead of the parameter
    const codigoReferidoFinal = datosUsuario.codigoReferido || codigoReferido
    console.log("[v0] Código de referido final a usar:", codigoReferidoFinal)
    console.log("[v0] ================================================")

    const errores = []

    if (!datosUsuario.firstName || datosUsuario.firstName.trim().length < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres")
    }

    if (!datosUsuario.lastName || datosUsuario.lastName.trim().length < 2) {
      errores.push("El apellido debe tener al menos 2 caracteres")
    }

    if (!datosUsuario.rut || !this.validarRUT(datosUsuario.rut)) {
      errores.push("El RUT ingresado no es válido")
    } else if (this.rutExiste(datosUsuario.rut)) {
      errores.push("Este RUT ya está registrado")
    }

    if (!datosUsuario.email || !this.validarEmail(datosUsuario.email)) {
      errores.push("El email ingresado no es válido")
    } else if (this.emailExiste(datosUsuario.email)) {
      errores.push("Este email ya está registrado")
    }

    if (!datosUsuario.telefono) {
      errores.push("El teléfono es obligatorio")
    } else if (!this.validarTelefono(datosUsuario.telefono)) {
      errores.push("El teléfono debe ser un número chileno válido (ej: 12345678, 987654321 o +56987654321)")
    }

    if (!datosUsuario.fechaNacimiento || !this.validarEdad(datosUsuario.fechaNacimiento)) {
      errores.push("Debes ser mayor de 18 años para registrarte")
    }

    if (!datosUsuario.password || datosUsuario.password.length < 8) {
      errores.push("La contraseña debe tener al menos 8 caracteres")
    }

    if (datosUsuario.password !== datosUsuario.confirmPassword) {
      errores.push("Las contraseñas no coinciden")
    }

    const direccionesValidas = datosUsuario.direcciones.filter(
      (direccion) =>
        direccion.calle &&
        direccion.calle.trim() !== "" &&
        direccion.comuna &&
        direccion.comuna.trim() !== "" &&
        direccion.region &&
        direccion.region.trim() !== "",
    )

    if (direccionesValidas.length === 0) {
      errores.push("Debes agregar al menos una dirección completa (calle, comuna, región)")
    }

    if (errores.length > 0) {
      console.log("[v0] Errores de validación encontrados:", errores)
      return { exito: false, errores }
    }

    const tieneBeneficioDuoc = this.detectarBeneficioDuoc(datosUsuario.email)

    const codigoReferidoPropio = this.generarCodigoReferido(datosUsuario.firstName, datosUsuario.lastName)

    const firstNameFormatted = this.formatName(datosUsuario.firstName.trim())
    const lastNameFormatted = this.formatName(datosUsuario.lastName.trim())

    const telefonoFormatted = this.formatPhoneNumber(datosUsuario.telefono)
    console.log("[v0] Teléfono original:", datosUsuario.telefono)
    console.log("[v0] Teléfono formateado:", telefonoFormatted)

    const nuevoUsuario = {
      id: Date.now(),
      firstName: firstNameFormatted,
      lastName: lastNameFormatted,
      nombreCompleto: `${firstNameFormatted} ${lastNameFormatted}`, // Para compatibilidad
      rut: this.formatearRUT(datosUsuario.rut),
      email: datosUsuario.email.toLowerCase(),
      password: datosUsuario.password, // Guardar la contraseña
      telefono: telefonoFormatted,
      fechaNacimiento: datosUsuario.fechaNacimiento,
      fechaRegistro: new Date().toISOString(),
      codigoReferido: codigoReferidoPropio,
      puntosReferidos: 0,
      usuariosReferidos: [],
      direcciones: direccionesValidas.map((direccion) => {
        // Solo incluir campos que no estén vacíos
        const direccionLimpia = {
          calle: direccion.calle.trim(),
          comuna: direccion.comuna.trim(),
          ciudad: direccion.ciudad || direccion.comuna.trim(), // Use comuna as ciudad if not provided
          region: direccion.region.trim(),
        }

        // Solo agregar campos opcionales si tienen valor
        if (direccion.departamento && direccion.departamento.trim() !== "") {
          direccionLimpia.departamento = direccion.departamento.trim()
        }
        if (direccion.referencia && direccion.referencia.trim() !== "") {
          direccionLimpia.referencia = direccion.referencia.trim()
        }

        return direccionLimpia
      }),
      activo: true,
    }

    // Solo agregar beneficio DUOC si realmente lo tiene
    if (tieneBeneficioDuoc) {
      nuevoUsuario.beneficioDuoc = true
      nuevoUsuario.descuentoPermanente = 20
    }

    console.log("[v0] === PROCESANDO CÓDIGO DE REFERIDO ===")
    console.log("[v0] ¿Hay código de referido?:", !!codigoReferidoFinal)
    console.log("[v0] Código limpio:", codigoReferidoFinal ? codigoReferidoFinal.trim() : "N/A")

    if (codigoReferidoFinal && codigoReferidoFinal.trim() !== "") {
      console.log("[v0] Buscando usuario referidor...")
      console.log("[v0] Código buscado:", codigoReferidoFinal.trim())
      console.log("[v0] Comparando con códigos existentes:")
      this.usuarios.forEach((u, index) => {
        console.log(
          `[v0] Usuario ${index}: ${u.nombreCompleto} - Código: ${u.codigoReferido} - ¿Coincide?: ${u.codigoReferido === codigoReferidoFinal.trim()}`,
        )
      })

      const usuarioReferidor = this.buscarPorCodigoReferido(codigoReferidoFinal.trim())
      console.log("[v0] Usuario referidor encontrado:", usuarioReferidor ? "SÍ" : "NO")

      if (usuarioReferidor) {
        console.log("[v0] Datos del usuario referidor ANTES:", {
          id: usuarioReferidor.id,
          nombre: usuarioReferidor.nombreCompleto,
          puntosActuales: usuarioReferidor.puntosReferidos || 0,
          referidosActuales: usuarioReferidor.usuariosReferidos ? usuarioReferidor.usuariosReferidos.length : 0,
        })

        const puntosAnteriores = usuarioReferidor.puntosReferidos || 0
        const puntosReferido = this.cargarConfiguracionPuntos().referralPoints || 500
        usuarioReferidor.puntosReferidos = puntosAnteriores + puntosReferido
        console.log(`[v0] Puntos asignados: ${puntosReferido} (desde configuración)`)
        console.log("[v0] Puntos totales después:", usuarioReferidor.puntosReferidos)

        // Inicializar array si no existe
        if (!usuarioReferidor.usuariosReferidos) {
          usuarioReferidor.usuariosReferidos = []
          console.log("[v0] Array de usuarios referidos inicializado")
        }

        usuarioReferidor.usuariosReferidos.push({
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombreCompleto,
          fechaReferido: new Date().toISOString(),
        })
        console.log("[v0] Usuario agregado a la lista de referidos")

        // Marcar al nuevo usuario como referido
        nuevoUsuario.referidoPor = {
          id: usuarioReferidor.id,
          nombre: usuarioReferidor.nombreCompleto,
          codigoUsado: codigoReferidoFinal.trim(),
        }
        console.log("[v0] Nuevo usuario marcado como referido")

        console.log("[v0] Datos del usuario referidor DESPUÉS:", {
          id: usuarioReferidor.id,
          nombre: usuarioReferidor.nombreCompleto,
          puntosActuales: usuarioReferidor.puntosReferidos,
          referidosActuales: usuarioReferidor.usuariosReferidos.length,
        })
      } else {
        console.log("[v0] ERROR: Código de referido no encontrado:", codigoReferidoFinal)
        console.log(
          "[v0] Códigos disponibles:",
          this.usuarios.map((u) => u.codigoReferido),
        )
      }
    } else {
      console.log("[v0] No se proporcionó código de referido o está vacío")
      if (this.usuarios.length > 0) {
        console.log("[v0] SUGERENCIA PARA PRUEBAS: Usa uno de estos códigos:")
        this.usuarios.forEach((u) => {
          console.log(`[v0] - ${u.codigoReferido} (${u.nombreCompleto})`)
        })
      } else {
        console.log("[v0] No hay usuarios registrados aún para generar códigos de referido")
      }
    }

    const configPuntos = this.cargarConfiguracionPuntos()
    if (configPuntos.registrationPoints > 0) {
      nuevoUsuario.puntosReferidos = configPuntos.registrationPoints
      console.log(`[v0] Puntos por registro asignados: ${configPuntos.registrationPoints}`)
    }

    console.log("[v0] === GUARDANDO USUARIO ===")
    this.usuarios.push(nuevoUsuario)
    console.log("[v0] Usuario agregado al array, total usuarios:", this.usuarios.length)

    this.guardarUsuarios()
    console.log("[v0] Usuarios guardados en localStorage")

    const usuariosGuardados = this.cargarUsuarios()
    console.log("[v0] Verificación - usuarios cargados desde localStorage:", usuariosGuardados.length)

    if (codigoReferidoFinal && codigoReferidoFinal.trim() !== "") {
      const referidorVerificacion = usuariosGuardados.find((u) => u.codigoReferido === codigoReferidoFinal.trim())
      if (referidorVerificacion) {
        console.log("[v0] VERIFICACIÓN - Usuario referidor después de guardar:", {
          nombre: referidorVerificacion.nombreCompleto,
          puntos: referidorVerificacion.puntosReferidos,
          referidos: referidorVerificacion.usuariosReferidos ? referidorVerificacion.usuariosReferidos.length : 0,
        })
      }
    }

    console.log("[v0] === FIN REGISTRO DE USUARIO ===")
    return { exito: true, usuario: nuevoUsuario }
  }

  generarCodigoReferido(nombre, apellido) {
    // Tomar las primeras 3 letras del nombre y apellido, convertir a mayúsculas
    const prefijo = (nombre.substring(0, 3) + apellido.substring(0, 3)).toUpperCase()

    // Generar 4 números aleatorios
    const numeros = Math.floor(1000 + Math.random() * 9000)

    // Combinar para crear el código único
    const codigo = prefijo + numeros

    // Verificar que el código no exista ya (muy improbable, pero por seguridad)
    if (this.buscarPorCodigoReferido(codigo)) {
      // Si existe, generar uno nuevo recursivamente
      return this.generarCodigoReferido(nombre, apellido)
    }

    return codigo
  }

  buscarPorCodigoReferido(codigo) {
    return this.usuarios.find((usuario) => usuario.codigoReferido === codigo)
  }

  obtenerEstadisticasReferidos(usuarioId) {
    const usuario = this.usuarios.find((u) => u.id === usuarioId)
    if (!usuario) {
      return { exito: false, error: "Usuario no encontrado" }
    }

    return {
      exito: true,
      estadisticas: {
        codigoReferido: usuario.codigoReferido,
        puntosReferidos: usuario.puntosReferidos || 0,
        totalReferidos: usuario.usuariosReferidos ? usuario.usuariosReferidos.length : 0,
        usuariosReferidos: usuario.usuariosReferidos || [],
        referidoPor: usuario.referidoPor || null,
      },
    }
  }

  // Obtener todos los usuarios
  obtenerUsuarios() {
    return this.usuarios
  }

  // Buscar usuario por email
  buscarPorEmail(email) {
    return this.usuarios.find((usuario) => usuario.email.toLowerCase() === email.toLowerCase())
  }

  // Buscar usuario por RUT
  buscarPorRUT(rut) {
    const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "")
    return this.usuarios.find((usuario) => usuario.rut.replace(/\./g, "").replace(/-/g, "") === rutLimpio)
  }

  // Actualizar usuario
  actualizarUsuario(id, datosActualizados) {
    const indice = this.usuarios.findIndex((usuario) => usuario.id === id)
    if (indice !== -1) {
      this.usuarios[indice] = { ...this.usuarios[indice], ...datosActualizados }
      this.guardarUsuarios()
      return { exito: true, usuario: this.usuarios[indice] }
    }
    return { exito: false, error: "Usuario no encontrado" }
  }

  // Eliminar usuario
  eliminarUsuario(id) {
    const indice = this.usuarios.findIndex((usuario) => usuario.id === id)
    if (indice !== -1) {
      this.usuarios.splice(indice, 1)
      this.guardarUsuarios()
      return { exito: true }
    }
    return { exito: false, error: "Usuario no encontrado" }
  }

  formatName(name) {
    if (!name || typeof name !== "string") return name

    return name
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  formatPhoneNumber(telefono) {
    if (!telefono || typeof telefono !== "string") return ""

    // Limpiar todo lo que no sea un dígito
    const digitos = telefono.replace(/\D/g, "")

    // Si tiene 9 dígitos y empieza con 9 (formato local)
    if (digitos.length === 9 && digitos.startsWith("9")) {
      return `+56${digitos}` // Le agregamos el prefijo estándar
    }

    // Si tiene 11 dígitos y empieza con 569 (formato semi-internacional)
    if (digitos.length === 11 && digitos.startsWith("569")) {
      return `+${digitos}` // Solo le agregamos el +
    }

    // Si tiene 8 dígitos (nuevo formato con prefijo +569)
    if (digitos.length === 8) {
      return `+569${digitos}` // Agregamos el prefijo completo
    }

    // Si el formato no es reconocible, devuelve una cadena vacía
    return ""
  }

  obtenerRegiones() {
    return [
      {
        nombre: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
      },
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
          "Villa Alegre",
          "Yerbas Buenas",
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
    ]
  }

  obtenerComunasPorRegion(nombreRegion) {
    const regiones = this.obtenerRegiones()
    const region = regiones.find((r) => r.nombre === nombreRegion)
    return region ? region.comunas : []
  }
}

// Instancia global del gestor de usuarios
const usuarioManager = new UsuarioManager()

// Función de autenticación
function authenticateUser(email, password) {
  console.log("[v0] authenticateUser llamada con:", { email, password: "***" })
  console.log("[v0] Usuarios almacenados:", usuarioManager.usuarios.length)

  if (email === "admin@levelup.cl" && password === "admin") {
    console.log("[v0] Credenciales de administrador detectadas")
    const adminUser = {
      id: 0,
      firstName: "Administrador",
      lastName: "Sistema",
      nombreCompleto: "Administrador Sistema",
      email: "admin@levelup.cl",
      isAdmin: true,
      level: 99,
      levelUpPoints: 999999,
      puntosReferidos: 999999,
    }
    console.log("[v0] Autenticación de administrador exitosa")
    return { exito: true, usuario: adminUser }
  }

  usuarioManager.usuarios.forEach((user, index) => {
    console.log(`[v0] Usuario ${index}:`, {
      email: user.email,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
    })
  })

  const usuario = usuarioManager.buscarPorEmail(email)
  console.log("[v0] Usuario encontrado:", usuario ? "Sí" : "No")

  if (usuario) {
    console.log("[v0] Datos del usuario encontrado:", {
      email: usuario.email,
      hasPassword: !!usuario.password,
      passwordStored: usuario.password ? "***" : "NO PASSWORD",
      passwordMatch: usuario.password === password,
    })
  }

  if (!usuario) {
    console.log("[v0] Usuario no encontrado")
    return { exito: false, error: "Email o contraseña incorrectos" }
  }

  // En un sistema real, la contraseña estaría hasheada
  // Por ahora comparamos directamente (solo para desarrollo)
  if (usuario.password !== password) {
    console.log("[v0] Contraseña incorrecta")
    console.log("[v0] Password ingresada:", password)
    console.log("[v0] Password almacenada:", usuario.password)
    return { exito: false, error: "Email o contraseña incorrectos" }
  }

  console.log("[v0] Autenticación exitosa")
  return { exito: true, usuario }
}

// Función de registro
function registerUser(datosUsuario, codigoReferido = null) {
  console.log("[v0] registerUser llamada con:", datosUsuario)
  return usuarioManager.registrarUsuario(datosUsuario, codigoReferido)
}

// Función para obtener la ruta correcta según la ubicación actual
function getCorrectPath(filename) {
  const isInPagesFolder = window.location.pathname.includes("/pages/")
  if (isInPagesFolder) {
    return filename
  } else {
    return `pages/${filename}`
  }
}

// Verifica el estado de autenticación del usuario y actualiza la interfaz
function checkAuthStatus() {
  const authButtons = document.getElementById("authButtons")
  const userMenu = document.getElementById("userMenu")
  const levelUpDisplay = document.getElementById("levelUpDisplay")

  if (!authButtons || !userMenu) {
    return
  }

  // Detect if current page is login.html
  const isLoginPage = window.location.pathname.endsWith("login.html")

  if (isLoginPage) {
    // On login page, keep navbar hidden and do not show login buttons or user menu to avoid flash
    const mainNavbar = document.getElementById("mainNavbar")
    if (mainNavbar) {
      mainNavbar.classList.add("d-none")
    }
    authButtons.innerHTML = ""
    userMenu.innerHTML = ""
    levelUpDisplay.innerHTML = ""
    userMenu.classList.add("d-none")
    levelUpDisplay.classList.add("d-none")
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
            <div class="text-white">
                <small class="d-block">Puntos LevelUp</small>
                <strong id="userPoints" class="text-neon">0</strong>
            </div>
        </div>`

  // Busca datos de sesión en localStorage o sessionStorage
  const sessionData = localStorage.getItem("levelup_session") || sessionStorage.getItem("levelup_session")
  const currentUser = sessionData ? JSON.parse(sessionData) : null

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

// Función de logout
function logout() {
  localStorage.removeItem("levelup_session")
  sessionStorage.removeItem("levelup_session")
  localStorage.removeItem("usuario_logueado")
  localStorage.removeItem("currentUser")
  localStorage.removeItem("sessionData")

  // Muestra notificación si la función está disponible
  if (typeof showNotification === "function") {
    showNotification("Sesión cerrada exitosamente", "success")
  }

  setTimeout(() => {
    window.location.href = window.location.pathname.includes("/pages/") ? "../index.html" : "index.html"
  }, 1000)
}

// Exponer funciones al objeto window
window.authenticateUser = authenticateUser
window.registerUser = registerUser
window.UserManager = usuarioManager
window.checkAuthStatus = checkAuthStatus
window.logout = logout

// Función para configurar validación instantánea en formularios
function setupInstantValidation() {
  console.log("[v0] Configurando validación instantánea...")

  // Validación de nombre
  const firstNameInput = document.getElementById('firstName')
  if (firstNameInput) {
    firstNameInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('firstNameError') || createErrorElement(this, 'firstNameError')

      if (!value || value.length < 2) {
        showError(errorElement, 'El nombre debe tener al menos 2 caracteres')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de apellido
  const lastNameInput = document.getElementById('lastName')
  if (lastNameInput) {
    lastNameInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('lastNameError') || createErrorElement(this, 'lastNameError')

      if (!value || value.length < 2) {
        showError(errorElement, 'El apellido debe tener al menos 2 caracteres')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de RUT
  const rutInput = document.getElementById('rut')
  if (rutInput) {
    rutInput.addEventListener('input', function() {
      let valor = this.value.replace(/\./g, '').replace(/-/g, '')
      if (valor.length > 1) {
        this.value = usuarioManager.formatearRUT(valor)
      }
    })

    rutInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('rutError') || createErrorElement(this, 'rutError')

      if (!value || !usuarioManager.validarRUT(value)) {
        showError(errorElement, 'El RUT ingresado no es válido')
        this.classList.add('is-invalid')
      } else if (usuarioManager.rutExiste(value)) {
        showError(errorElement, 'Este RUT ya está registrado')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de email
  const emailInput = document.getElementById('email')
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('emailError') || createErrorElement(this, 'emailError')

      if (!value || !usuarioManager.validarEmail(value)) {
        showError(errorElement, 'El email ingresado no es válido')
        this.classList.add('is-invalid')
      } else if (usuarioManager.emailExiste(value)) {
        showError(errorElement, 'Este email ya está registrado')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de teléfono
  const telefonoInput = document.getElementById('telefono')
  if (telefonoInput) {
    telefonoInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '')
      if (value.length > 8) {
        value = value.substring(0, 8)
      }
      this.value = value
    })

    telefonoInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('telefonoError') || createErrorElement(this, 'telefonoError')

      if (!value || !usuarioManager.validarTelefono('+569' + value)) {
        showError(errorElement, 'El teléfono debe ser un número chileno válido (8 dígitos)')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de fecha de nacimiento
  const birthDateInput = document.getElementById('birthDate')
  if (birthDateInput) {
    birthDateInput.addEventListener('blur', function() {
      const value = this.value
      const errorElement = document.getElementById('birthDateError') || createErrorElement(this, 'birthDateError')

      if (!value || !usuarioManager.validarEdad(value)) {
        showError(errorElement, 'Debes ser mayor de 18 años para registrarte')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de contraseña
  const passwordInput = document.getElementById('password')
  if (passwordInput) {
    passwordInput.addEventListener('blur', function() {
      const value = this.value
      const errorElement = document.getElementById('passwordError') || createErrorElement(this, 'passwordError')

      if (!value || value.length < 8) {
        showError(errorElement, 'La contraseña debe tener al menos 8 caracteres')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de confirmación de contraseña
  const confirmPasswordInput = document.getElementById('confirmPassword')
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('blur', function() {
      const value = this.value
      const passwordValue = passwordInput ? passwordInput.value : ''
      const errorElement = document.getElementById('confirmPasswordError') || createErrorElement(this, 'confirmPasswordError')

      if (!value) {
        showError(errorElement, 'Debes confirmar tu contraseña')
        this.classList.add('is-invalid')
      } else if (value !== passwordValue) {
        showError(errorElement, 'Las contraseñas no coinciden')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de código de referido
  const codigoReferidoInput = document.getElementById('codigoReferido')
  if (codigoReferidoInput) {
    codigoReferidoInput.addEventListener('blur', function() {
      const value = this.value.trim()
      if (!value) return // Opcional, no mostrar error

      const errorElement = document.getElementById('codigoReferidoError') || createErrorElement(this, 'codigoReferidoError')

      if (value && !usuarioManager.buscarPorCodigoReferido(value)) {
        showError(errorElement, 'El código de referido no es válido')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de email para login
  const loginEmailInput = document.getElementById('email')
  if (loginEmailInput && !loginEmailInput.closest('#registrationForm')) { // Solo para login, no para registro
    loginEmailInput.addEventListener('blur', function() {
      const value = this.value.trim()
      const errorElement = document.getElementById('emailError') || createErrorElement(this, 'emailError')

      if (!value) {
        showError(errorElement, 'El email es requerido')
        this.classList.add('is-invalid')
      } else if (!usuarioManager.validarEmail(value)) {
        showError(errorElement, 'El email no tiene un formato válido')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  // Validación de contraseña para login
  const loginPasswordInput = document.getElementById('password')
  if (loginPasswordInput && !loginPasswordInput.closest('#registrationForm')) { // Solo para login, no para registro
    loginPasswordInput.addEventListener('blur', function() {
      const value = this.value
      const errorElement = document.getElementById('passwordError') || createErrorElement(this, 'passwordError')

      if (!value) {
        showError(errorElement, 'La contraseña es requerida')
        this.classList.add('is-invalid')
      } else if (value.length < 8) {
        showError(errorElement, 'La contraseña debe tener al menos 8 caracteres')
        this.classList.add('is-invalid')
      } else {
        hideError(errorElement)
        this.classList.remove('is-invalid')
        this.classList.add('is-valid')
      }
    })
  }

  console.log("[v0] Validación instantánea configurada")
}

// Función auxiliar para crear elementos de error
function createErrorElement(inputElement, errorId) {
  const errorElement = document.createElement('div')
  errorElement.id = errorId
  errorElement.className = 'invalid-feedback'
  errorElement.style.display = 'none'
  inputElement.parentNode.appendChild(errorElement)
  return errorElement
}

// Función auxiliar para mostrar errores
function showError(errorElement, message) {
  errorElement.textContent = message
  errorElement.style.display = 'block'
}

// Función auxiliar para ocultar errores
function hideError(errorElement) {
  errorElement.style.display = 'none'
}

// Inicializar checkAuthStatus cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus()
  setupInstantValidation()
})

console.log("[v0] Funciones de autenticación expuestas al objeto window")
