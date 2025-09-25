// ===== SISTEMA DE RESEÑAS DE PRODUCTOS =====

// Variables globales se manejan desde main.js
function initializeReviewsSystem() {
  // Inicializar reseñas en localStorage si no existen
  if (!localStorage.getItem("levelup_reviews")) {
    const defaultReviews = {
      JM001: [
        {
          id: "rev_001",
          userName: "Carlos Mendoza",
          rating: 5,
          title: "Excelente juego de estrategia",
          description:
            "Catan es un clásico que nunca pasa de moda. La calidad de los componentes es excelente y las partidas son siempre emocionantes. Perfecto para reuniones familiares.",
          date: "2024-01-15",
          verified: true,
        },
        {
          id: "rev_002",
          userName: "Ana García",
          rating: 4,
          title: "Muy entretenido",
          description:
            "Muy buen juego, aunque puede ser un poco complejo para principiantes. Una vez que entiendes las reglas, es súper adictivo.",
          date: "2024-01-08",
          verified: true,
        },
        {
          id: "rev_003",
          userName: "Diego Ramírez",
          rating: 5,
          title: "¡Increíble experiencia!",
          description:
            "Uno de los mejores juegos de mesa que he comprado. La estrategia, la negociación, todo está perfectamente balanceado. Lo recomiendo 100%.",
          date: "2024-01-02",
          verified: true,
        },
      ],
      AC001: [
        {
          id: "rev_004",
          userName: "María López",
          rating: 5,
          title: "Auriculares increíbles",
          description:
            "La calidad de sonido es espectacular. Los uso para gaming y música, y en ambos casos superan mis expectativas. Muy cómodos para sesiones largas.",
          date: "2024-01-20",
          verified: true,
        },
        {
          id: "rev_005",
          userName: "Roberto Silva",
          rating: 4,
          title: "Excelente relación calidad-precio",
          description:
            "Muy buenos auriculares, el sonido es claro y los graves están bien definidos. El micrófono funciona perfecto para gaming online.",
          date: "2024-01-18",
          verified: true,
        },
        {
          id: "rev_006",
          userName: "Laura Martín",
          rating: 5,
          title: "Perfectos para gaming",
          description:
            "Los compré específicamente para jugar y son perfectos. El sonido envolvente me ayuda mucho en los FPS. Construcción sólida y muy cómodos.",
          date: "2024-01-12",
          verified: true,
        },
        {
          id: "rev_007",
          userName: "Andrés Vega",
          rating: 4,
          title: "Muy recomendables",
          description:
            "Buena compra, el diseño es elegante y la calidad de construcción es sólida. El cable es un poco corto pero nada grave.",
          date: "2024-01-05",
          verified: true,
        },
      ],
      JM002: [
        {
          id: "rev_014",
          userName: "Pedro González",
          rating: 4,
          title: "Muy estratégico",
          description:
            "Carcassonne es un juego excelente para los amantes de la estrategia. Fácil de aprender pero difícil de dominar.",
          date: "2024-01-30",
          verified: true,
        },
        {
          id: "rev_015",
          userName: "Isabel Moreno",
          rating: 5,
          title: "Perfecto para familia",
          description:
            "Ideal para jugar en familia. Las reglas son claras y cada partida es diferente. Muy recomendado.",
          date: "2024-01-26",
          verified: true,
        },
        {
          id: "rev_016",
          userName: "Luis Fernández",
          rating: 4,
          title: "Gran calidad",
          description:
            "Los componentes son de excelente calidad y el juego es muy entretenido. Vale la pena la inversión.",
          date: "2024-01-21",
          verified: true,
        },
      ],
      AC002: [
        {
          id: "rev_017",
          userName: "Carolina Díaz",
          rating: 5,
          title: "Excelente mouse",
          description:
            "Muy preciso y cómodo para gaming. Los botones programables son muy útiles y la iluminación RGB es genial.",
          date: "2024-02-01",
          verified: true,
        },
        {
          id: "rev_018",
          userName: "Rodrigo Sánchez",
          rating: 4,
          title: "Buena compra",
          description: "Mouse sólido y confiable. La precisión es excelente para juegos FPS. Recomendado para gamers.",
          date: "2024-01-29",
          verified: true,
        },
        {
          id: "rev_019",
          userName: "Valentina Cruz",
          rating: 5,
          title: "Perfecto para gaming",
          description:
            "El mejor mouse que he tenido. Muy cómodo y la precisión es increíble. Los botones adicionales son muy útiles.",
          date: "2024-01-27",
          verified: true,
        },
      ],
      CO001: [
        {
          id: "rev_020",
          userName: "Sebastián Rojas",
          rating: 5,
          title: "Consola increíble",
          description:
            "La PS5 es impresionante. Los gráficos son espectaculares y la velocidad de carga es increíble. Vale cada peso.",
          date: "2024-02-03",
          verified: true,
        },
        {
          id: "rev_021",
          userName: "Camila Torres",
          rating: 5,
          title: "Experiencia única",
          description:
            "Los juegos se ven y se sienten increíbles. El control DualSense es revolucionario. Muy recomendada.",
          date: "2024-01-31",
          verified: true,
        },
        {
          id: "rev_022",
          userName: "Matías Silva",
          rating: 4,
          title: "Excelente consola",
          description:
            "Gran consola, aunque es un poco grande. Los exclusivos son fantásticos y el rendimiento es excelente.",
          date: "2024-01-28",
          verified: true,
        },
      ],
    }
    localStorage.setItem("levelup_reviews", JSON.stringify(defaultReviews))
  }
}

function getProductReviews(productId) {
  const reviews = JSON.parse(localStorage.getItem("levelup_reviews")) || {}
  return reviews[productId] || []
}

function addProductReview(productId, reviewData) {
  const reviews = JSON.parse(localStorage.getItem("levelup_reviews")) || {}

  if (!reviews[productId]) {
    reviews[productId] = []
  }

  const newReview = {
    id: "rev_" + Date.now(),
    userName: reviewData.userName,
    rating: Number.parseInt(reviewData.rating),
    title: reviewData.title,
    description: reviewData.description.substring(0, 500), // Límite de 500 caracteres
    date: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    verified: checkUserPurchasedProduct(productId), // Verificar si compró el producto
  }

  reviews[productId].unshift(newReview) // Agregar al inicio
  localStorage.setItem("levelup_reviews", JSON.stringify(reviews))

  return newReview
}

function checkUserPurchasedProduct(productId) {
  // Verificar si el usuario actual ha comprado este producto
  if (!window.currentUser) return false

  const userOrders = JSON.parse(localStorage.getItem("levelup_orders")) || []
  return userOrders.some(
    (order) => order.userId === window.currentUser.email && order.items.some((item) => item.id === productId),
  )
}

function calculateAverageRating(reviews) {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.length).toFixed(1)
}

function getRatingDistribution(reviews) {
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    distribution[review.rating]++
  })
  return distribution
}

function renderProductReviews(productId) {
  const reviews = getProductReviews(productId)
  const reviewsList = document.getElementById("reviewsList")
  const reviewsCount = document.getElementById("reviewsCount")
  const averageRating = document.getElementById("averageRating")
  const averageStars = document.getElementById("averageStars")
  const reviewsSummary = document.getElementById("reviewsSummary")

  if (!reviewsList) return

  // Actualizar contador de reseñas
  if (reviewsCount) {
    reviewsCount.textContent = reviews.length
  }

  // Calcular y mostrar rating promedio
  const avgRating = calculateAverageRating(reviews)
  if (averageRating) {
    averageRating.textContent = avgRating
  }

  // Mostrar estrellas promedio
  if (averageStars) {
    averageStars.innerHTML = generateStarsHTML(Number.parseFloat(avgRating))
  }

  // Actualizar resumen
  if (reviewsSummary) {
    reviewsSummary.textContent = `Basado en ${reviews.length} reseña${reviews.length !== 1 ? "s" : ""}`
  }

  // Actualizar distribución de ratings
  const distribution = getRatingDistribution(reviews)
  for (let i = 1; i <= 5; i++) {
    const progressBar = document.querySelector(`.rating-bar:nth-child(${6 - i}) .progress-bar`)
    const countSpan = document.querySelector(`.rating-bar:nth-child(${6 - i}) .rating-count`)
    if (progressBar && countSpan) {
      const percentage = reviews.length > 0 ? (distribution[i] / reviews.length) * 100 : 0
      progressBar.style.width = `${percentage}%`
      countSpan.textContent = distribution[i]
    }
  }

  // Renderizar lista de reseñas
  if (reviews.length === 0) {
    reviewsList.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-chat-square-text fs-1 text-muted mb-3"></i>
        <h5 class="text-muted">No hay reseñas aún</h5>
        <p class="text-muted">Sé el primero en dejar una reseña de este producto</p>
      </div>
    `
    return
  }

  reviewsList.innerHTML = reviews
    .map(
      (review) => `
    <div class="review-card mb-4">
      <div class="d-flex">
        <div class="review-avatar me-3">
          <div class="avatar-circle">
            ${review.userName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div class="review-content flex-grow-1">
          <div class="review-header d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 class="review-author mb-1">
                ${review.userName}
                ${review.verified ? '<i class="bi bi-patch-check-fill text-success ms-1" title="Compra verificada"></i>' : ""}
              </h6>
              <div class="review-rating mb-1">
                ${generateStarsHTML(review.rating)}
              </div>
              ${review.title ? `<h6 class="text-white mb-2">${review.title}</h6>` : ""}
            </div>
            <small class="text-muted">${formatDate(review.date)}</small>
          </div>
          <p class="review-text mb-0">${review.description}</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("")
}

function generateStarsHTML(rating) {
  let starsHTML = ""
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += '<i class="bi bi-star-fill text-warning"></i>'
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHTML += '<i class="bi bi-star-half text-warning"></i>'
    } else {
      starsHTML += '<i class="bi bi-star text-muted"></i>'
    }
  }

  return starsHTML
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return date.toLocaleDateString("es-ES", options)
}

function initializeReviewForm(productId) {
  const reviewForm = document.getElementById("reviewForm")
  const starRating = document.getElementById("starRating")
  const selectedRating = document.getElementById("selectedRating")
  const reviewBody = document.getElementById("reviewBody")
  const reviewFormEnabled = document.getElementById("reviewFormEnabled")
  const reviewFormDisabled = document.getElementById("reviewFormDisabled")

  if (!reviewForm) return

  // Verificar si el usuario puede dejar reseñas
  const canReview = window.currentUser && checkUserPurchasedProduct(productId)

  if (canReview) {
    reviewFormEnabled.classList.remove("d-none")
    reviewFormDisabled.classList.add("d-none")
  } else {
    reviewFormEnabled.classList.add("d-none")
    reviewFormDisabled.classList.remove("d-none")
  }

  // Configurar sistema de estrellas interactivo
  if (starRating) {
    const stars = starRating.querySelectorAll(".star-interactive")

    stars.forEach((star, index) => {
      star.addEventListener("mouseenter", () => {
        highlightStars(stars, index + 1)
      })

      star.addEventListener("mouseleave", () => {
        const currentRating = Number.parseInt(selectedRating.value) || 0
        highlightStars(stars, currentRating)
      })

      star.addEventListener("click", () => {
        const rating = index + 1
        selectedRating.value = rating
        highlightStars(stars, rating)
        updateStarIcons(stars, rating)
      })
    })
  }

  // Configurar límite de caracteres para la descripción
  if (reviewBody) {
    const maxLength = 500

    // Crear contador de caracteres
    const charCounter = document.createElement("small")
    charCounter.className = "text-muted mt-1 d-block"
    charCounter.textContent = `0/${maxLength} caracteres`
    reviewBody.parentNode.appendChild(charCounter)

    reviewBody.addEventListener("input", () => {
      const currentLength = reviewBody.value.length
      charCounter.textContent = `${currentLength}/${maxLength} caracteres`

      if (currentLength > maxLength) {
        charCounter.classList.add("text-danger")
        reviewBody.value = reviewBody.value.substring(0, maxLength)
        charCounter.textContent = `${maxLength}/${maxLength} caracteres`
      } else {
        charCounter.classList.remove("text-danger")
      }
    })
  }

  // Manejar envío del formulario
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      userName: window.currentUser.fullName || window.currentUser.nombreCompleto || "Usuario",
      rating: selectedRating.value,
      title: document.getElementById("reviewTitle").value.trim(),
      description: reviewBody.value.trim(),
    }

    // Validaciones
    if (!formData.rating || formData.rating < 1) {
      window.showNotification("Por favor selecciona una calificación", "warning")
      return
    }

    if (!formData.description) {
      window.showNotification("Por favor escribe tu reseña", "warning")
      return
    }

    if (formData.description.length < 10) {
      window.showNotification("La reseña debe tener al menos 10 caracteres", "warning")
      return
    }

    // Agregar reseña
    const newReview = addProductReview(productId, formData)

    // Limpiar formulario
    reviewForm.reset()
    selectedRating.value = "0"
    highlightStars(starRating.querySelectorAll(".star-interactive"), 0)

    // Actualizar vista de reseñas
    renderProductReviews(productId)

    // Cambiar a la pestaña de reseñas si no está activa
    const reviewsTab = document.getElementById("reviews-tab")
    if (reviewsTab) {
      reviewsTab.click()
    }

    window.showNotification("¡Reseña agregada exitosamente!", "success")
  })
}

function highlightStars(stars, rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active")
      star.classList.remove("bi-star")
      star.classList.add("bi-star-fill")
    } else {
      star.classList.remove("active")
      star.classList.remove("bi-star-fill")
      star.classList.add("bi-star")
    }
  })
}

function updateStarIcons(stars, rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove("bi-star")
      star.classList.add("bi-star-fill")
      star.classList.add("text-warning")
    } else {
      star.classList.remove("bi-star-fill")
      star.classList.add("bi-star")
      star.classList.remove("text-warning")
    }
  })
}

function loadProductReviews(productId) {
  console.log("[v0] Cargando reseñas para producto:", productId)

  // Asegurar que el sistema esté inicializado
  initializeReviewsSystem()

  // Renderizar las reseñas del producto
  renderProductReviews(productId)

  // Inicializar el formulario de reseñas
  initializeReviewForm(productId)
}

// Inicializar sistema de reseñas cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  initializeReviewsSystem()
})

window.loadProductReviews = loadProductReviews
window.renderProductReviews = renderProductReviews
window.initializeReviewsSystem = initializeReviewsSystem
