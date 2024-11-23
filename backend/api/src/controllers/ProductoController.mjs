// ProductoController.mjs
import { ProductoService } from "../services/ProductoService.mjs";

class ProductoController {
  #productoService;
  constructor() {
    this.#productoService = new ProductoService();
  }

  getAll = async (req, res) => {
    try {
      const productos = await this.#productoService.getAll();
      res.status(200).send(productos);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  createProducto = async (req, res) => {
    const { name_product, category_product, price_product } = req.body;

    try {
      const producto = await this.#productoService.createProducto(name_product, category_product, price_product);
      res.status(201).send(producto);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  updateProducto = async (req, res) => {
    const { id } = req.params;
    const { name_product, category_product, price_product } = req.body;
    try {
      const updated = await this.#productoService.updateProducto(id, name_product, category_product, price_product);
      res.status(200).send(updated);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await this.#productoService.deleteProducto(id);
      res.status(deleted ? 204 : 404).end();
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };
}

export { ProductoController };
