import { Db } from "../config/db.mjs";
import { Doctor } from "../models/Doctor.mjs";
import { CustomError } from "../utils/CustomError.mjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.mjs";

class DoctorService {
  login = async (email, password) => {
    try {
      const result = await new Db().query(
        `SELECT * FROM doctor WHERE email = $1 AND password = $2`,
        [email, password]
      );

      if (!result.rowCount) {
        throw new CustomError("401", "Credenciales inválidas");
      }

      const doctor = result.rows.map(({ id, name, age, email, password, specialty }) => new Doctor(id, name, age, email, '', specialty));
      const token = jwt.sign({ id: doctor.id, email: doctor.email }, TOKEN_SECRET, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      console.error("Error al iniciar sesión del médico", error);
      throw new CustomError(error.code, error.message);
    }
  };

  getAppointments = async (doctorId, date = null) => {
    try {
      const query = date
        ? `SELECT * FROM medicalappointment WHERE doctor_id = $1 AND date = $2`
        : `SELECT * FROM medicalappointment WHERE doctor_id = $1`;
      const result = await new Db().query(query, date ? [doctorId, date] : [doctorId]);

      return result.rows;
    } catch (error) {
      console.error("Error al obtener citas del médico", error);
      throw new CustomError(error.code, error.message);
    }
  };

  createAppointment = async (doctorId, patientId, date, hour) => {
    try {
      const result = await new Db().query(
        `INSERT INTO medicalappointment (doctor_id, patient_id, date, hour) VALUES ($1, $2, $3, $4) RETURNING *`,
        [doctorId, patientId, date, hour]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error al crear cita", error);
      throw new CustomError(error.code, error.message);
    }
  };
}

export { DoctorService };