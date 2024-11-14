// TallaController.mjs
import { TallaService } from "../services/TallaService.mjs";
//import { CustomError } from "../utils/CustomError.mjs";

class TallaController {
  #tallaService;
  constructor() {
    this.#tallaService = new TallaService();
  }

  getAll = async (req, res) => {
    try {
      const tallas = await this.#tallaService.getAll();
      res.status(200).send(tallas);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };
}

export { TallaController };
