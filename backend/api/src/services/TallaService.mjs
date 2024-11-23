// TallaService.mjs
import { Db } from "../config/db.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class TallaService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM sizes");
      return results.rows ? results.rows : null;
    } catch (error) {
      console.error("Error al listar tallas", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { TallaService };
