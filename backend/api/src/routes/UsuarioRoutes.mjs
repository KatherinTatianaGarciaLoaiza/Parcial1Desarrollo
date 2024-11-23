// UsuarioRoutes.mjs
import { Router } from "express";
import { body } from "express-validator";
import { UsuarioController } from "../controllers/UsuarioController.mjs";
import { authenticateAdmin } from "../middlewares/middleware.mjs";

class UsuarioRoutes {
  constructor() {
    this.router = Router();
    this.controller = new UsuarioController();

    this.router
    .route("/login")
    // Ruta para iniciar sesión como médico
    .post(
      [
        body("email_user").isEmail().withMessage("El correo es obligatorio"),
        body("password_user").notEmpty().withMessage("La contraseña es obligatoria"),
      ],
      this.controller.login
    );

    this.router
      .route("/")
      .get(
        authenticateAdmin,
        this.controller.getAll)
      .post(
        authenticateAdmin,
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
        authenticateAdmin,
        [
          body("name_user").optional().trim().notEmpty(),
          body("email_user").optional().isEmail(),
          body("password_user").optional().trim().notEmpty(),
          body("identification_user").trim().notEmpty(),
          body("rol_user").optional().trim().notEmpty(),
        ],
        this.controller.updateUsuario
      )
      .delete(
        authenticateAdmin,
        this.controller.deleteUsuario);
  }
}

export { UsuarioRoutes };
