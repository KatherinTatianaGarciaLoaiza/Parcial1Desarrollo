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
          body("name_user").trim().notEmpty(),
          body("email_user").isEmail(),
          body("password_user").trim().notEmpty(),
          body("identification_user").trim().notEmpty(),
          body("rol_user").trim().notEmpty(),          
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
