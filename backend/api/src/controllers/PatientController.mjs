import { PatientService } from "../services/PatientService.mjs";

class PatientController {
  #patientService;
  constructor() {
    this.#patientService = new PatientService();
  }

  // GET: Obtener los datos de un paciente especificado
  getPatientById = async (req, res) => {
    const { patientId } = req.params;

    try {
      const patient = await this.#patientService.getPatientById(patientId);
      if (!patient) {
        return res.status(404).send({ message: "Paciente no encontrado" });
      }
      res.status(200).send(patient);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener el paciente", error });
    }
  };

  // GET: Listar todas las citas de un paciente especificado
  getAppointments = async (req, res) => {
    const { patientId } = req.params;
    try {
      const appointments = await this.#patientService.getAppointments(patientId);
      if (!appointments.length) {
        return res.status(404).send({ message: "No hay citas para este paciente" });
      }
      res.status(200).send(appointments);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener las citas", error });
    }
  };
}

export { PatientController };
