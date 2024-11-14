// InventarioProducto.mjs
import { Producto } from "./Producto.mjs";
import { Talla } from "./Talla.mjs";
import { Color } from "./Color.mjs";

class InventarioProducto {
  constructor(inventarioId, producto, talla, color, cantidad) {
    if (!(producto instanceof Producto)) {
      throw new Error("El objeto debe ser de la clase Producto");
    }
    if (!(talla instanceof Talla)) {
      throw new Error("El objeto debe ser de la clase Talla");
    }
    if (!(color instanceof Color)) {
      throw new Error("El objeto debe ser de la clase Color");
    }

    this.inventarioId = inventarioId;
    this.producto = producto;
    this.talla = talla;
    this.color = color;
    this.cantidad = cantidad;
  }

  ajustarCantidad(nuevaCantidad) {
    this.cantidad = nuevaCantidad;
  }
}

export { InventarioProducto };
