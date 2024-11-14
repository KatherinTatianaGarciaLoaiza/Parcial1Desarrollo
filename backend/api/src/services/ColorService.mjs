// ColorService.mjs
import { Db } from "../config/db.mjs";
import { Color } from "../models/Color.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class ColorService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM color");
      return results.rows.map((row) => Color.fromObject(row));
    } catch (error) {
      console.error("Error al listar colores", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { ColorService };
