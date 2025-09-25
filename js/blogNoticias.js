// Blog y Noticias - Gestión de contenido dinámico
class BlogNoticias {
  constructor() {
    this.articlesGrid = document.getElementById("articles-grid")
    this.loadMoreBtn = document.getElementById("load-more-btn")
    this.currentPage = 1
    this.articlesPerPage = 6

    this.init()
  }

  init() {
    this.bindEvents()
    this.loadInitialArticles()
  }

  bindEvents() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener("click", () => this.loadMoreArticles())
    }

    // Event listeners para los botones "Leer Más"
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-primary") && e.target.textContent === "Leer Más") {
        this.handleReadMore(e.target)
      }
    })
  }

  loadInitialArticles() {
    // Los artículos iniciales ya están en el HTML
    // Aquí se puede agregar lógica para cargar desde API
    console.log("[v0] Artículos iniciales cargados")
  }

  async loadMoreArticles() {
    try {
      this.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Cargando...'
      this.loadMoreBtn.disabled = true

      // Simular carga de datos (reemplazar con API real)
      const newArticles = await this.fetchArticles(this.currentPage + 1)

      if (newArticles && newArticles.length > 0) {
        this.renderArticles(newArticles)
        this.currentPage++
      } else {
        this.loadMoreBtn.style.display = "none"
        this.showMessage("No hay más artículos disponibles", "info")
      }
    } catch (error) {
      console.error("[v0] Error cargando artículos:", error)
      this.showMessage("Error al cargar más artículos", "error")
    } finally {
      this.loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Cargar Más Artículos'
      this.loadMoreBtn.disabled = false
    }
  }

  async fetchArticles(page) {
    // Simular datos de ejemplo (reemplazar con API real)
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockArticles = [
          {
            id: `article-${page}-1`,
            type: "Guía",
            title: "Mejores Configuraciones para Streaming",
            summary: "Aprende a configurar OBS y tu setup para streams profesionales.",
            image: "/placeholder-wyc2z.png",
            category: "guide",
          },
          {
            id: `article-${page}-2`,
            type: "Noticia",
            title: "Actualización Masiva en Battle Royale",
            summary: "Nuevo mapa, armas y mecánicas que cambiarán el meta del juego.",
            image: "/placeholder-9v9yd.png",
            category: "news",
          },
          {
            id: `article-${page}-3`,
            type: "Guía",
            title: "Estrategias Avanzadas para Ranked",
            summary: "Técnicas profesionales para subir de rango rápidamente.",
            image: "/placeholder-dahoy.png",
            category: "guide",
          },
        ]

        // Simular que después de la página 3 no hay más artículos
        resolve(page <= 3 ? mockArticles : [])
      }, 1500)
    })
  }

  renderArticles(articles) {
    articles.forEach((article) => {
      const articleCard = this.createArticleCard(article)
      this.articlesGrid.appendChild(articleCard)
    })

    // Animación de entrada para las nuevas tarjetas
    const newCards = this.articlesGrid.querySelectorAll(".card:not(.animated)")
    newCards.forEach((card, index) => {
      card.classList.add("animated")
      setTimeout(() => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = "all 0.5s ease"

        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      }, index * 100)
    })
  }

  createArticleCard(article) {
    const col = document.createElement("div")
    col.className = "col-lg-4 col-md-6 col-sm-12 mb-4"

    const badgeClass = article.category === "guide" ? "bg-success" : "bg-primary"

    col.innerHTML = `
            <div class="card bg-dark text-white h-100">
                <img src="${article.image}" class="card-img-top" alt="${article.title}">
                <div class="card-body d-flex flex-column">
                    <span class="badge ${badgeClass} mb-2 align-self-start">${article.type}</span>
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text flex-grow-1">${article.summary}</p>
                    <button class="btn btn-primary mt-auto" data-article-id="${article.id}">Leer Más</button>
                </div>
            </div>
        `

    return col
  }

  handleReadMore(button) {
    const articleId = button.getAttribute("data-article-id")

    // Aquí se puede implementar la lógica para abrir el artículo completo
    // Por ejemplo, redirigir a una página de detalle o abrir un modal
    console.log("[v0] Abriendo artículo:", articleId)

    // Ejemplo de implementación con modal o redirección
    this.openArticleDetail(articleId)
  }

  openArticleDetail(articleId) {
    // Implementar lógica para mostrar el artículo completo
    // Puede ser un modal, una nueva página, etc.

    // Por ahora, mostrar un mensaje de ejemplo
    this.showMessage(`Abriendo artículo: ${articleId}`, "info")

    // Ejemplo de redirección:
    // window.location.href = `article-detail.html?id=${articleId}`;
  }

  showMessage(message, type = "info") {
    // Crear toast notification
    const toast = document.createElement("div")
    toast.className = `alert alert-${type === "error" ? "danger" : "info"} alert-dismissible fade show position-fixed`
    toast.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"

    toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `

    document.body.appendChild(toast)

    // Auto-remove después de 5 segundos
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove()
      }
    }, 5000)
  }

  // Método para filtrar artículos por categoría
  filterByCategory(category) {
    const cards = this.articlesGrid.querySelectorAll(".col-lg-4")

    cards.forEach((card) => {
      const badge = card.querySelector(".badge")
      const cardCategory = badge.textContent.toLowerCase()

      if (category === "all" || cardCategory === category.toLowerCase()) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Método para buscar artículos
  searchArticles(query) {
    const cards = this.articlesGrid.querySelectorAll(".col-lg-4")
    const searchTerm = query.toLowerCase()

    cards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase()
      const summary = card.querySelector(".card-text").textContent.toLowerCase()

      if (title.includes(searchTerm) || summary.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new BlogNoticias()
})

// Exportar para uso en otros módulos si es necesario
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogNoticias
}
