// TallaService.mjs
import { Db } from "../config/db.mjs";
import { Talla } from "../models/Talla.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class TallaService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM talla");
      return results.rows.map((row) => Talla.fromObject(row));
    } catch (error) {
      console.error("Error al listar tallas", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { TallaService };
