// UsuarioService.mjs
import { Db } from "../config/db.mjs";
import { Usuario } from "../models/Usuario.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class UsuarioService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM users");
      return results.rows;
    } catch (error) {
      console.error("Error al listar usuarios", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createUsuario = async (nombre, correo, contraseña, rol, documento) => {
    try {
      const result = await new Db().query(
        `INSERT INTO users (name_user, email_user, password_user, rol_user, identification_user) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, correo, contraseña, rol, documento]
      );
      return result.rows ? result.rows : null;
    } catch (error) {
      console.error("Error al crear usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateUsuario = async (id, nombre, correo, contraseña, rol, documento) => {
    try {
      const result = await new Db().query(
        `UPDATE users SET name_user=$1, email_user=$2, password_user=$3, rol_user=$4, identification_user = $5 WHERE id_user = $6 RETURNING *`,
        [nombre, correo, contraseña, rol, documento, id]
      );
      return result.rows ? result.rows : null;
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteUsuario = async (id) => {
    try {
      const result = await new Db().query(
        `DELETE FROM users WHERE id_user = $1 RETURNING id_user`,
        [id]
      );
      return result.rows ? result.rows : null;
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { UsuarioService };
