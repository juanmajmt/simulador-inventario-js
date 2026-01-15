const VENTAS_KEY = "ventasRealizadas"

function leerVentas() {
  const datos = localStorage.getItem(VENTAS_KEY)
  return datos ? JSON.parse(datos) : []
}

function guardarVentas(ventas) {
  localStorage.setItem(VENTAS_KEY, JSON.stringify(ventas))
}

function registrarVenta(items, total) {
  const ventas = leerVentas()

  const ahora = new Date()
  const venta = {
    id: ventas.length + 1,
    fecha: ahora.toLocaleDateString(),
    hora: ahora.toLocaleTimeString(),
    total,
    items
  }

  ventas.push(venta)
  guardarVentas(ventas)
}

function renderVentas() {
  const cont = document.getElementById("historial-ventas")
  if (!cont) return

  const ventas = leerVentas()
  cont.innerHTML = ""

  if (ventas.length === 0) {
    cont.textContent = "No hay ventas registradas"
    return
  }

  ventas.forEach(v => {
    const row = document.createElement("div")
    row.className = "mini-card mb-3"

    row.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>Venta ${v.fecha} ${v.hora}</strong><br>
          <span class="mono">$ ${v.total}</span>
        </div>
        <button class="btn btn-outline-light btn-sm" data-ver="${v.id}">
          Ver resumen
        </button>
      </div>
      <div class="d-none mt-3" id="detalle-${v.id}">
        ${v.items.map(i => `
          <div class="d-flex justify-content-between">
            <span>${i.nombre} x ${i.cantidad}</span>
            <span>$ ${i.precio * i.cantidad}</span>
          </div>
        `).join("")}
      </div>
    `
    cont.appendChild(row)
  })
}

document.addEventListener("click", e => {
  if (e.target.dataset.ver) {
    const id = e.target.dataset.ver
    const detalle = document.getElementById("detalle-" + id)
    detalle.classList.toggle("d-none")
  }
})
