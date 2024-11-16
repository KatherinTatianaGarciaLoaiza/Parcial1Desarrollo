import { Db } from "../config/db.mjs";
import { CustomError } from "../utils/CustomError.mjs";
import { createToken } from "../middlewares/middleware.mjs";

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

      const doctor = result.rows[0]; // Asumiendo que solo hay un doctor con ese email y password
      const token = createToken({ id: doctor.id, role: 'doctor' });

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

  updateAppointment = async (appointmentId, doctorId, patientId, date, hour) => {
    try {
      const result = await new Db().query(
        `UPDATE medicalappointment SET doctor_id = $2, patient_id = $3, date = $4, hour = $5 WHERE id = $1 RETURNING *`,
        [appointmentId, doctorId, patientId, date, hour]
      );

      if (!result.rowCount) {
        throw new CustomError("404", "Cita no encontrada");
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error al actualizar cita", error);
      throw new CustomError(error.code, error.message);
    }
  };

  deleteAppointment = async (appointmentId) => {
    try {
      const result = await new Db().query(
        `DELETE FROM medicalappointment WHERE id = $1 RETURNING *`,
        [appointmentId]
      );

      if (!result.rowCount) {
        throw new CustomError("404", "Cita no encontrada");
      }

      return result.rows[0];
    } catch (error) {
      console.error("Error al eliminar cita", error);
      throw new CustomError(error.code, error.message);
    }
  };
}

export { DoctorService };