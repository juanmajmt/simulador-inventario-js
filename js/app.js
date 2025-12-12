let inventario = []

let proximoId = 1

function cargarInventario() {
  inventario = leerInventarioStorage()

  proximoId = inventario.length
    ? Math.max(...inventario.map(p => p.id)) + 1
    : 1
}

function guardarInventario() {
  guardarInventarioStorage(inventario)
}

function buscarProducto({ id = null, nombre = null }) {
  if (id !== null) return inventario.find(p => p.id === id) || null
  if (nombre !== null) {
    const nombreLower = nombre.toLowerCase()
    return inventario.find(p => p.nombre.toLowerCase() === nombreLower) || null
  }
  return null
}

function renderInventario() {
  const cuerpo = document.getElementById("inventory-body")
  cuerpo.innerHTML = ""

  if (inventario.length === 0) {
    cuerpo.innerHTML = `<tr><td colspan="5" class="text-center text-muted">Inventario vacío</td></tr>`
    actualizarResumen()
    return
  }

  inventario.forEach(prod => {
    const fila = document.createElement("tr")

    fila.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td class="text-end">$ ${prod.precio}</td>
      <td class="text-end">${prod.stock}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-light me-1" data-accion="vender" data-id="${prod.id}">Vender</button>
        <button class="btn btn-sm btn-outline-danger" data-accion="eliminar" data-id="${prod.id}">Eliminar</button>
      </td>
    `
    cuerpo.appendChild(fila)
  })

  actualizarResumen()
}

function actualizarResumen() {
  let unidades = 0
  let valorTotal = 0
  let mayorStock = inventario[0] || null

  for (let i = 0; i < inventario.length; i++) {
    const p = inventario[i]
    unidades += p.stock
    valorTotal += p.stock * p.precio
    if (mayorStock && p.stock > mayorStock.stock) {
      mayorStock = p
    }
  }

  document.getElementById("total-units").textContent = unidades
  document.getElementById("total-value").textContent = "$ " + valorTotal
  document.getElementById("top-product").textContent = mayorStock
    ? mayorStock.nombre + " (" + mayorStock.stock + ")"
    : "-"
}

function agregarProducto(nombre, precio, stock) {
  const nuevo = { id: proximoId++, nombre, precio, stock }
  inventario.push(nuevo)
  guardarInventario()
  renderInventario()
}

function venderProducto(id, cantidad) {
  const prod = buscarProducto({ id })
  if (!prod) return
  if (cantidad <= 0) return
  if (cantidad > prod.stock) return

  prod.stock -= cantidad
  guardarInventario()
  renderInventario()
}

function eliminarProducto(id) {
  const idx = inventario.findIndex(p => p.id === id)
  if (idx === -1) return

  inventario.splice(idx, 1)
  guardarInventario()
  renderInventario()
}

document.getElementById("product-form").addEventListener("submit", function (e) {
  e.preventDefault()

  const nombre = document.getElementById("product-name").value.trim()
  const precio = Number(document.getElementById("product-price").value)
  const stock = Number(document.getElementById("product-stock").value)

  if (!nombre || Number.isNaN(precio) || Number.isNaN(stock)) return

  agregarProducto(nombre, precio, stock)
  e.target.reset()
})

document.getElementById("inventory-body").addEventListener("click", function (e) {
  const boton = e.target
  const id = Number(boton.dataset.id)

  if (boton.dataset.accion === "vender") {
    venderProducto(id, 1)
  }

  if (boton.dataset.accion === "eliminar") {
    eliminarProducto(id)
  }
})

document.getElementById("reset-data").addEventListener("click", function () {
  borrarInventarioStorage()
  inventario = []
  proximoId = 1
  renderInventario()
})

cargarInventario()
renderInventario()
