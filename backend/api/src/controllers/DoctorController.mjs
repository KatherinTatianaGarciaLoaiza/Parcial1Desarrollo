import { Doctor } from "../models/Doctor.mjs";
import { MedicalAppointment } from "../models/MedicalAppointment.mjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET, TOKEN_MAX_AGE } from "../config/config.mjs";
import { DoctorService } from "../services/DoctorService.mjs";

class DoctorController {
  #doctorService;
  constructor() {
    this.#doctorService = new DoctorService();
  }

  // POST: Login del doctor (Retorna JWT si email y password son correctos)
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const doctor = await this.#doctorService.login(email, password);
      if (!doctor) {
        return res.status(401).send({ message: "Credenciales inválidas" });
      }

      const token = jwt.sign({ id: doctor.id, email: doctor.email }, TOKEN_SECRET, {
        expiresIn: TOKEN_MAX_AGE,
      });

      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ message: "Error al iniciar sesión", error });
    }
  };

  // GET: Listar todas las citas de un médico (puede incluir un filtro por fecha)
  getAppointments = async (req, res) => {
    const { id: doctorId } = req.doctor;
    const { date } = req.query;

    try {
      const appointments = await this.#doctorService.getAppointments(doctorId, date);
      if (!appointments.length) {
        return res.status(404).send({ message: "No hay citas para este doctor" });
      }
      res.status(200).send(appointments);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener las citas", error });
    }
  };

  // POST: Crear una nueva cita
  createAppointment = async (req, res) => {
    const { patientId, date, hour } = req.body;
    const { id: doctorId } = req.doctor;

    try {
      console.log(req.doctor.id, patientId, date, hour);
      const appointment = await this.#doctorService.createAppointment(doctorId, patientId, date, hour);
      res.status(201).send(appointment);
    } catch (error) {
      res.status(500).send({ message: "Error al crear la cita", error });
    }
  };

  // PUT: Editar una cita específica
  updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { patientId, date, hour } = req.body;

    try {
      const updatedAppointment = await MedicalAppointment.update(appointmentId, patientId, date, hour);
      if (!updatedAppointment) {
        return res.status(404).send({ message: "Cita no encontrada" });
      }
      res.status(200).send(updatedAppointment);
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar la cita", error });
    }
  };

  // DELETE: Eliminar una cita específica
  deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
      const deleted = await MedicalAppointment.delete(appointmentId);
      if (!deleted) {
        return res.status(404).send({ message: "Cita no encontrada" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).send({ message: "Error al eliminar la cita", error });
    }
  };
}

export { DoctorController };