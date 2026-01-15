function finalizarCompra() {
  if (carrito.length === 0) return

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  registrarVenta(
    carrito.map(p => ({
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad
    })),
    total
  )

  carrito = []
  renderCarrito()

  document.getElementById("checkout-result").textContent =
    "Venta registrada por $ " + total

  renderVentas()
}

document
  .getElementById("finalizar-compra")
  .addEventListener("click", finalizarCompra)
