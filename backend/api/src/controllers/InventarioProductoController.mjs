// InventarioProductoController.mjs
import { InventarioProductoService } from "../services/InventarioProductoService.mjs";
//import { CustomError } from "../utils/CustomError.mjs";

class InventarioProductoController {
  #inventarioProductoService;
  constructor() {
    this.#inventarioProductoService = new InventarioProductoService();
  }

  getAll = async (req, res) => {
    try {
      const inventario = await this.#inventarioProductoService.getAll();
      res.status(200).send(inventario);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  addInventarioProducto = async (req, res) => {
    const { productoId, tallaId, colorId, cantidad } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    try {
      const inventarioProducto = await this.#inventarioProductoService.addInventarioProducto(productoId, tallaId, colorId, cantidad);
      res.status(201).send(inventarioProducto);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  updateCantidad = async (req, res) => {
    const { id } = req.params;
    const { nuevaCantidad } = req.body;
    try {
      const updated = await this.#inventarioProductoService.updateCantidad(id, nuevaCantidad);
      res.status(200).send(updated);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };
}

export { InventarioProductoController };
