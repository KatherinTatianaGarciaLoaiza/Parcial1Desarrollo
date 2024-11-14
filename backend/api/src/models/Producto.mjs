// Producto.mjs
class Producto {
    constructor(productoId, nombre, categoria, precio) {
      this.productoId = productoId;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
    }
  
    actualizarPrecio(nuevoPrecio) {
      this.precio = nuevoPrecio;
    }
  }
  
  export { Producto };  