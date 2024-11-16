import { Db } from "../config/db.mjs";
import { Patient } from "../models/Patient.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class PatientService {
  getPatientById = async (patientId) => {
    try {
      const result = await new Db().query(
        `SELECT * FROM patient WHERE id = $1`,
        [patientId]
      );
      return result.rows.map(({ id, name, age, email }) => new Patient(id, name, age, email));
    } catch (error) {
      console.error("Error al obtener datos del paciente", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getAppointments = async (patientId) => {
    try {
      const result = await new Db().query(
        `SELECT * FROM medicalappointment WHERE patient_id = $1`,
        [patientId]
      );
      return result.rows;
    } catch (error) {
      console.error("Error al listar citas del paciente", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { PatientService };
