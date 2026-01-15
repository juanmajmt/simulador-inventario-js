let productos = []
let productosFiltrados = []

fetch("./data/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data
    productosFiltrados = data
    renderCatalogo()
  })

function renderCatalogo() {
  const contenedor = document.getElementById("catalogo")
  contenedor.innerHTML = ""

  productosFiltrados.forEach(p => {
    const card = document.createElement("div")
    card.className = "col-md-3"

    card.innerHTML = `
      <div class="mini-card h-100">
        <strong>${p.nombre}</strong>
        <p class="mono mt-1">$ ${p.precio}</p>
        <button class="btn btn-primary btn-sm mt-2" data-id="${p.id}">
          Agregar
        </button>
      </div>
    `
    contenedor.appendChild(card)
  })
}

document.getElementById("buscador").addEventListener("input", function (e) {
  const texto = e.target.value.toLowerCase()

  productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  )

  renderCatalogo()
})

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    agregarAlCarrito(Number(e.target.dataset.id))
  }
})
