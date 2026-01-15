let carrito = []

function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id)
  const item = carrito.find(p => p.id === id)

  if (item) {
    item.cantidad++
  } else {
    carrito.push({ ...prod, cantidad: 1 })
  }

  renderCarrito()
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id)
  renderCarrito()
}

function renderCarrito() {
  const cont = document.getElementById("carrito")
  cont.innerHTML = ""

  carrito.forEach(p => {
    const row = document.createElement("div")
    row.className = "d-flex justify-content-between mb-2"

    row.innerHTML = `
      <span>${p.nombre} x ${p.cantidad}</span>
      <span>$ ${p.precio * p.cantidad}</span>
      <button class="btn btn-outline-danger btn-sm" data-remove="${p.id}">X</button>
    `
    cont.appendChild(row)
  })
}

document.addEventListener("click", e => {
  if (e.target.dataset.remove) {
    eliminarDelCarrito(Number(e.target.dataset.remove))
  }
})
