// UsuarioService.mjs
import { Db } from "../config/db.mjs";
import { Usuario } from "../models/Usuario.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class UsuarioService {
  getAll = async () => {
    try {
      const results = await new Db().query("SELECT * FROM users");
      return results.rows.map(({id_user, name_user, email_user, password_user, 
        identification_user, rol_user}) => new Usuario(id_user, name_user, email_user,
          password_user, identification_user, rol_user));
    } catch (error) {
      console.error("Error al listar usuarios", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createUsuario = async (nombre, correo, contraseña, rol, documento) => {
    try {
      const result = await new Db().query(
        `INSERT INTO usuario (nombre, correo, contraseña, rol, documento) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, correo, contraseña, rol, documento]
      );
      return result.rowCount ? Usuario.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al crear usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateUsuario = async (id, nombre, correo, contraseña, rol) => {
    try {
      const result = await new Db().query(
        `UPDATE usuario SET nombre=$1, correo=$2, contraseña=$3, rol=$4 WHERE id = $5 RETURNING *`,
        [nombre, correo, contraseña, rol, id]
      );
      return result.rowCount ? Usuario.fromObject(result.rows[0]) : null;
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteUsuario = async (id) => {
    try {
      const result = await new Db().query(
        `DELETE FROM usuario WHERE id = $1 RETURNING id`,
        [id]
      );
      return result.rowCount ? result.rows[0] : null;
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { UsuarioService };
