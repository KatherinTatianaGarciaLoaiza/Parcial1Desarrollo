// ProductoService.mjs
import { Db } from "../config/db.mjs";
import { Producto } from "../models/Producto.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class ProductoService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM products");
      return results.rows ? results.rows : null;
    } catch (error) {
      console.error("Error al listar productos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createProducto = async (nombre, categoria, precio) => {
    try {
      const results = await new Db().query(
        `INSERT INTO products (name_product, category_product, price_product) VALUES ($1, $2, $3) RETURNING *`,
        [nombre, categoria, precio]
      );
      return results.rows ? results.rows : null;
    } catch (error) {
      console.error("Error al crear producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateProducto = async (id, nombre, categoria, precio) => {
    try {
      console.log(id);
      const results = await new Db().query(
        `UPDATE products SET name_product=$1, category_product=$2, price_product=$3 WHERE id_product = $4 RETURNING *`,
        [nombre, categoria, precio, id]
      );
      return results.rows ? results.rows : null;
    } catch (error) {
      console.error("Error al actualizar producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteProducto = async (id) => {
    try {
      const results = await new Db().query(
        `DELETE FROM products WHERE id_product = $1 RETURNING id_product`,
        [id]
      );
      return results.rows ? results.rows : null;
    } catch (error) {
      console.error("Error al eliminar producto", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { ProductoService };
