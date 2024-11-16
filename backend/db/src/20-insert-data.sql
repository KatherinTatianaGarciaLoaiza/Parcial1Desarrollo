INSERT INTO 
    specialty (name)
VALUES 
    ('Medicina General'),
    ('Cardiología'),
    ('Urología'),
    ('Fisiología'),
    ('Pediatría');

INSERT INTO
    doctor (name, age, email, password, specialty_id)
VALUES
    ('Camilo Pérez', 35, 'camilo.perez@example.com', 'password1', 1),
    ('Santiago Penagos', 40, 'santiago.penagos@example.com', 'password2', 2),
    ('Mariana Botero', 45, 'mariana.botero@example.com', 'password3', 3),
    ('Ana Acosta', 38, 'ana.acosta@example.com', 'password4', 4),
    ('Carlos López', 50, 'carlos.lopez@example.com', 'password5', 5);

INSERT INTO
    patient (name, age, email, password)
VALUES
    ('Pepito Pérez', 23, 'pepito.perez@example.com', 'pass123'),
    ('Pedro Andrade', 22, 'pedro.andrade@example.com', 'pass456'),
    ('Camila López', 21, 'camila.lopez@example.com', 'pass789'),
    ('Antonia Gómez', 20, 'antonia.gomez@example.com', 'pass321'),
    ('Martina Mejía', 19, 'martina.mejia@example.com', 'pass654'),
    ('José Carabalí', 18, 'jose.carabali@example.com', 'pass987'),
    ('Isabella Santillana', 17, 'isabella.santillana@example.com', 'pass111'),
    ('Jesús Correa', 28, 'jesus.correa@example.com', 'pass222'),
    ('Camilo Sarmiento', 26, 'camilo.sarmiento@example.com', 'pass333'),
    ('Laura Hernández', 25, 'laura.hernandez@example.com', 'pass444');

COMMIT;