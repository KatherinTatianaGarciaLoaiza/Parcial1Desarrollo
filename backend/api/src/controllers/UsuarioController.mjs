// UsuarioController.mjs
import { validationResult } from "express-validator";
import { UsuarioService } from "../services/UsuarioService.mjs";
//import { CustomError } from "../utils/CustomError.mjs";

class UsuarioController {
  #usuarioService;
  constructor() {
    this.#usuarioService = new UsuarioService();
  }

  getAll = async (req, res) => {
    try {
      const usuarios = await this.#usuarioService.getAll();
      res.status(200).send(usuarios);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  createUsuario = async (req, res) => {
    const { name_user, email_user, password_user, rol_user, identification_user } = req.body;
    //const result = validationResult(req);
    //if (!result.isEmpty()) {
      //return res.status(400).send({ errors: result.array() });
    //}

    try {
      const usuario = await this.#usuarioService.createUsuario(name_user, email_user, password_user, rol_user, identification_user);
      res.status(201).send(usuario);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { name_user, email_user, password_user, rol_user, identification_user } = req.body;
    try {
      const updated = await this.#usuarioService.updateUsuario(id, name_user, email_user, password_user, rol_user, identification_user);
      res.status(200).send(updated);
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };

  deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await this.#usuarioService.deleteUsuario(id);
      res.status(deleted ? 204 : 404).end();
    } catch (error) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  };
}

export { UsuarioController };
