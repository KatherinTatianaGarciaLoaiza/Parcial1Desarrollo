import { Router } from "express";
import { body, query } from "express-validator";
import { DoctorController } from "../controllers/DoctorController.mjs";
import { authenticateDoctor } from "../middlewares/middleware.mjs";

class DoctorRoutes {
  constructor() {
    this.router = Router();
    this.controller = new DoctorController();

    this.router
      .route("/login")
      // Ruta para iniciar sesión como médico
      .post(
        [
          body("email").isEmail().withMessage("El correo es obligatorio"),
          body("password").notEmpty().withMessage("La contraseña es obligatoria"),
        ],
        this.controller.login
      );

    this.router
      .route("/appointment")
      // Ruta para listar todas las citas del médico (con filtro opcional por fecha)
      .get(
        authenticateDoctor,
        query("date")
          .optional()
          .matches(/^\d{2}-\d{2}-\d{4}$/)
          .withMessage("La fecha debe tener el formato DD-MM-YYYY"),
        this.controller.getAppointments
      )
      // Ruta para crear una nueva cita
      .post(
        authenticateDoctor,
        [
          body("patientId").notEmpty().withMessage("El ID del paciente es obligatorio"),
          body("date").matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("La fecha debe tener el formato DD-MM-YYYY"),
          body("time").matches(/^\d{2}:\d{2}$/).withMessage("La hora debe tener el formato HH:MM"),
        ],
        this.controller.createAppointment
      );

    this.router
      .route("/appointment/:appointmentId")
      // Ruta para editar una cita específica
      .put(
        authenticateDoctor,
        [
          body("patientId").optional().notEmpty().withMessage("El ID del paciente debe ser válido"),
          body("date").optional().matches(/^\d{2}-\d{2}-\d{4}$/).withMessage("La fecha debe tener el formato DD-MM-YYYY"),
          body("time").optional().matches(/^\d{2}:\d{2}$/).withMessage("La hora debe tener el formato HH:MM"),
        ],
        this.controller.updateAppointment
      )
      // Ruta para eliminar una cita específica
      .delete(authenticateDoctor, this.controller.deleteAppointment);
  }
}

export { DoctorRoutes };
