BEGIN;

-- Tabla de especialidades
CREATE TABLE 
    specialty (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

-- Tabla de doctores
CREATE TABLE 
    doctor (
        id SERIAL PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        age INT NOT NULL,
        email CHAR(70) NOT NULL UNIQUE,
        password CHAR(20) NOT NULL,
        specialty_id INT NOT NULL,
        FOREIGN KEY (specialty_id) REFERENCES specialty(id)
    );

-- Tabla de pacientes
CREATE TABLE 
    patient (
        id SERIAL PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        age INT NOT NULL,
        email CHAR(70) NOT NULL UNIQUE,
        password CHAR(20) NOT NULL
    );

-- Tabla de citas médicas
CREATE TABLE 
    medicalappointment (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        hour TIME NOT NULL,
        patient_id INT NOT NULL,
        doctor_id INT NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patient(id),
        FOREIGN KEY (doctor_id) REFERENCES doctor(id)
    );

COMMIT;
