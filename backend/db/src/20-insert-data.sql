-- Insertar datos en la tabla Colors
INSERT INTO 
    Colors (color)
VALUES 
    ('Rojo'),
    ('Verde'),
    ('Azul'),
    ('Negro'),
    ('Blanco');

-- Insertar datos en la tabla Sizes
INSERT INTO 
    Sizes (size)
VALUES 
    ('S'),
    ('M'),
    ('L'),
    ('XL'),
    ('XXL');

-- Insertar datos en la tabla Products
INSERT INTO 
    Products (name_product, category_product, price_product)
VALUES 
    ('Camiseta Deportiva', 'Ropa Deportiva', 50000),
    ('Pantalón Jeans', 'Ropa Casual', 80000),
    ('Zapatillas Running', 'Calzado Deportivo', 120000),
    ('Chaqueta Impermeable', 'Ropa Exterior', 150000),
    ('Sombrero de Paja', 'Accesorios', 30000);

-- Insertar datos en la tabla Users
INSERT INTO 
    Users (name_user, email_user, password_user, identification_user, rol_user)
VALUES 
    ('Admin1', 'admin1@example.com', 'adminpass1', 123456789, 'admin'),
    ('Admin2', 'Admin2@example.com', 'bodpass1', 987654321, 'admin'),
    ('Usuario1', 'usuario1@example.com', 'userpass1', 456789123, 'employed');

-- Insertar datos en la tabla Inventory_Product
INSERT INTO 
    Inventory_Product (id_product, id_size, id_color, amount)
VALUES 
    (1, 1, 1, 50),
    (1, 2, 2, 30),
    (2, 3, 3, 20),
    (3, 4, 4, 15),
    (4, 5, 5, 10);