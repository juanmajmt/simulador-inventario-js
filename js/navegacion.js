const vistas = {
  inventario: document.getElementById("vista-inventario"),
  ventas: document.getElementById("vista-ventas"),
  historial: document.getElementById("vista-historial")
}

function mostrarVista(nombre) {
  Object.values(vistas).forEach(v => v.classList.add("d-none"))
  vistas[nombre].classList.remove("d-none")
}

document.getElementById("btn-inventario").addEventListener("click", () => {
  mostrarVista("inventario")
})

document.getElementById("btn-venta").addEventListener("click", () => {
  mostrarVista("ventas")
})

document.getElementById("btn-historial").addEventListener("click", () => {
  mostrarVista("historial")
})
