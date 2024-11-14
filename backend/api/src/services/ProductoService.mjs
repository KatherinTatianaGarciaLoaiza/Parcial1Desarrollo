// ProductoService.mjs
import { Db } from "../config/db.mjs";
import { Producto } from "../models/Producto.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class ProductoService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM producto");
      return results.rows.map((row) => Producto.fromObject(row));
    } catch (error) {
      console.error("Error al listar productos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createProducto = async (nombre, categoria, precio) => {
    try {
      const result = await new Db().query(
        `INSERT INTO producto (nombre, categoria, precio) VALUES ($1, $2, $3) RETURNING *`,
        [nombre, categoria, precio]
      );
      return result.rowCount ? Producto.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al crear producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateProducto = async (id, nombre, categoria, precio) => {
    try {
      const result = await new Db().query(
        `UPDATE producto SET nombre=$1, categoria=$2, precio=$3 WHERE id = $4 RETURNING *`,
        [nombre, categoria, precio, id]
      );
      return result.rowCount ? Producto.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al actualizar producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteProducto = async (id) => {
    try {
      const result = await new Db().query(
        `DELETE FROM producto WHERE id = $1 RETURNING id`,
        [id]
      );
      return result.rowCount ? result.rows[0] : null;
    } catch (error) {
      console.error("Error al eliminar producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { ProductoService };
