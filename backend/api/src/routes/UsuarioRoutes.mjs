// UsuarioRoutes.mjs
import { Router } from "express";
import { body } from "express-validator";
import { UsuarioController } from "../controllers/UsuarioController.mjs";

class UsuarioRoutes {
  constructor() {
    this.router = Router();
    this.controller = new UsuarioController();

    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(
        [
          body("nombre").trim().notEmpty(),
          body("correo").isEmail(),
          body("contraseña").trim().notEmpty(),
          body("documento").trim().notEmpty(),
          body("rol").trim().notEmpty(),          
        ],
        this.controller.createUsuario
      );

    this.router
      .route("/:id")
      .put(
        [
          body("nombre").optional().trim().notEmpty(),
          body("correo").optional().isEmail(),
          body("contraseña").optional().trim().notEmpty(),
          body("rol").optional().trim().notEmpty(),
        ],
        this.controller.updateUsuario
      )
      .delete(this.controller.deleteUsuario);
  }
}

export { UsuarioRoutes };
