const STORAGE_KEY = "inventarioTrasarti"

function leerInventarioStorage() {
  const datos = localStorage.getItem(STORAGE_KEY)
  if (!datos) return []
  const inventario = JSON.parse(datos)
  if (!Array.isArray(inventario)) return []
  return inventario
}

function guardarInventarioStorage(inventario) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventario))
}

function borrarInventarioStorage() {
  localStorage.removeItem(STORAGE_KEY)
}
