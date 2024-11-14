// InventarioProductoService.mjs
import { Db } from "../config/db.mjs";
import { InventarioProducto } from "../models/InventarioProducto.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class InventarioProductoService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM inventario_producto");
      return results.rows.map((row) => InventarioProducto.fromObject(row));
    } catch (error) {
      console.error("Error al listar inventario de productos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  addInventarioProducto = async (productoId, tallaId, colorId, cantidad) => {
    try {
      const result = await new Db().query(
        `INSERT INTO inventario_producto (producto_id, talla_id, color_id, cantidad) VALUES ($1, $2, $3, $4) RETURNING *`,
        [productoId, tallaId, colorId, cantidad]
      );
      return result.rowCount ? InventarioProducto.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al agregar inventario de producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateCantidad = async (inventarioId, nuevaCantidad) => {
    try {
      const result = await new Db().query(
        `UPDATE inventario_producto SET cantidad=$1 WHERE id = $2 RETURNING *`,
        [nuevaCantidad, inventarioId]
      );
      return result.rowCount ? InventarioProducto.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al actualizar cantidad de inventario", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { InventarioProductoService };
