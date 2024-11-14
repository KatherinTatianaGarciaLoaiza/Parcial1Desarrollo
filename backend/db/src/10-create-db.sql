BEGIN;

-- Tabla de usuarios
CREATE TABLE 
    users (
        id_user serial PRIMARY KEY,
        name_user VARCHAR(60) NOT NULL,
        email_user CHAR(70) NOT NULL UNIQUE,
        password_user CHAR(20) NOT NULL,
        identification_user VARCHAR(30) NOT NULL UNIQUE,
        rol_user CHAR(15) NOT NULL
    );

-- Tabla de colores
CREATE TABLE 
    colors (
        id_color serial PRIMARY KEY,
        color CHAR(15) NOT NULL
    );

-- Tabla de tamaños
CREATE TABLE    
    sizes (
        id_size serial PRIMARY KEY,
        size CHAR(15) NOT NULL
    );

-- Tabla de productos
CREATE TABLE 
    products (
        id_product serial PRIMARY KEY,
        name_product CHAR(100) NOT NULL,
        category_product CHAR(100) NOT NULL,
        price_product INT NOT NULL
    );

-- Tabla de inventario de productos
CREATE TABLE 
    inventory_product (
        id_inventory serial PRIMARY KEY,
        id_product INT NOT NULL,
        id_color INT NOT NULL,
        id_size INT NOT NULL,
        amount INT NOT NULL,
        FOREIGN KEY (id_product) REFERENCES products(id_product),
        FOREIGN KEY (id_color) REFERENCES colors(id_color),
        FOREIGN KEY (id_size) REFERENCES sizes(id_size)
    );

-- Tabla de historial de stock
CREATE TABLE 
    stock_history (
        id_history serial PRIMARY KEY,
        id_user INT NOT NULL,
        id_product INT NOT NULL,
        action_user CHAR(20) NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_product) REFERENCES products(id_product)
    );

COMMIT;