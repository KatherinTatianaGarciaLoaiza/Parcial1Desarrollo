// ColorController.mjs
import { ColorService } from "../services/ColorService.mjs";
//import { CustomError } from "../utils/CustomError.mjs";

class ColorController {
  #colorService;
  constructor() {
    this.#colorService = new ColorService();
  }

  getAll = async (req, res) => {
    try {
      const colores = await this.#colorService.getAll();
      res.status(200).send(colores);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };
}

export { ColorController };
