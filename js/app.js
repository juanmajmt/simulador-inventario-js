let inventario = []
let proximoId = 1

function cargarInventario() {
  inventario = leerInventarioStorage()
  proximoId = inventario.length ? Math.max(...inventario.map(p => p.id)) + 1 : 1
}

function guardarInventario() {
  guardarInventarioStorage(inventario)
}

function buscarProductoPorId(id) {
  return inventario.find(p => p.id === id) || null
}

function renderInventario() {
  const cuerpo = document.getElementById("inventory-body")
  if (!cuerpo) return

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
  const totalUnitsEl = document.getElementById("total-units")
  const totalValueEl = document.getElementById("total-value")
  const topProductEl = document.getElementById("top-product")
  if (!totalUnitsEl || !totalValueEl || !topProductEl) return

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

  totalUnitsEl.textContent = unidades
  totalValueEl.textContent = "$ " + valorTotal
  topProductEl.textContent = mayorStock ? mayorStock.nombre + " (" + mayorStock.stock + ")" : "-"
}

function agregarProducto(nombre, precio, stock) {
  const nuevo = { id: proximoId++, nombre, precio, stock }
  inventario.push(nuevo)
  guardarInventario()
  renderInventario()
}

function venderProducto(id, cantidad) {
  const prod = buscarProductoPorId(id)
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

function initInventarioUI() {
  const form = document.getElementById("product-form")
  const body = document.getElementById("inventory-body")
  const resetBtn = document.getElementById("reset-data")

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const nombreEl = document.getElementById("product-name")
      const precioEl = document.getElementById("product-price")
      const stockEl = document.getElementById("product-stock")

      if (!nombreEl || !precioEl || !stockEl) return

      const nombre = nombreEl.value.trim()
      const precio = Number(precioEl.value)
      const stock = Number(stockEl.value)

      if (!nombre) return
      if (!Number.isFinite(precio) || precio < 0) return
      if (!Number.isFinite(stock) || stock < 0) return

      agregarProducto(nombre, precio, stock)
      form.reset()
    })
  }

  if (body) {
    body.addEventListener("click", function (e) {
      const boton = e.target.closest("button")
      if (!boton) return

      const accion = boton.dataset.accion
      const id = Number(boton.dataset.id)
      if (!Number.isFinite(id)) return

      if (accion === "vender") {
        venderProducto(id, 1)
      }

      if (accion === "eliminar") {
        eliminarProducto(id)
      }
    })
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      borrarInventarioStorage()
      inventario = []
      proximoId = 1
      renderInventario()
    })
  }

  cargarInventario()
  renderInventario()
}

document.addEventListener("DOMContentLoaded", initInventarioUI)
