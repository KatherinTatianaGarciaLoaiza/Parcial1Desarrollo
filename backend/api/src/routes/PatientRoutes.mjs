import { Router } from "express";
import { PatientController } from "../controllers/PatientController.mjs";

class PatientRoutes {
  constructor() {
    this.router = Router();
    this.controller = new PatientController();

    this.router
      .route("/:patientId")
      // Ruta para obtener los datos de un paciente especificado
      .get(this.controller.getPatientById);

    this.router
      .route("/:patientId/appointment")
      // Ruta para listar todas las citas asignadas al paciente especificado
      .get(this.controller.getAppointments);
  }
}

export { PatientRoutes };
