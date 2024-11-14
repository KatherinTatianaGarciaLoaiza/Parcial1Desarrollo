// ProductoController.mjs
import { validationResult } from "express-validator";
import { ProductoService } from "../services/ProductoService.mjs";
//import { CustomError } from "../utils/CustomError.mjs";

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
    const { nombre, categoria, precio } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    try {
      const producto = await this.#productoService.createProducto(nombre, categoria, precio);
      res.status(201).send(producto);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, precio } = req.body;
    try {
      const updated = await this.#productoService.updateProducto(id, nombre, categoria, precio);
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
