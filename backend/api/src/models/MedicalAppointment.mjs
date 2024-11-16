import { Patient } from "./Patient.mjs";
import { Doctor } from "./Doctor.mjs";

class MedicalAppointment {
  constructor(id, date, hour, patient, doctor) {
    if (!(patient instanceof Patient)) {
      throw new Error("El objeto patient debe ser de la clase Patient");
    }
    if (!(doctor instanceof Doctor)) {
      throw new Error("El objeto doctor debe ser de la clase Doctor");
    }

    this.id = id;
    this.date = date;
    this.hour = hour;
    this.patient = patient;
    this.doctor = doctor;
  }
}

export { MedicalAppointment };
