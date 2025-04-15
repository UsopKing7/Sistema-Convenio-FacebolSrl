CREATE DATABASE IF NOT EXISTS agreement_system;
USE agreement_system;

CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  password VARCHAR(255) NOT NULL,
  state BOOLEAN DEFAULT TRUE,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  guard_name VARCHAR(100)
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companies_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol TEXT,
  id_rol INT,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companies_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (id_rol) REFERENCES roles(id)
);

CREATE TABLE company_movements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companies_id INT NOT NULL,
  movement_type VARCHAR(30) NOT NULL,
  amount INT NOT NULL,
  description TEXT,
  movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companies_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado BOOLEAN DEFAULT TRUE,
  nombre VARCHAR(100),
  apellidos VARCHAR(100),
  ci VARCHAR(20),
  extension VARCHAR(10),
  celular VARCHAR(15),
  direccion TEXT,
  correo VARCHAR(100)
);

CREATE TABLE cards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(50),
  modalidad_qr VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE,
  id_cliente INT,
  FOREIGN KEY (id_cliente) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE cards_clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_tarjeta INT,
  id_cliente INT,
  FOREIGN KEY (id_tarjeta) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (id_cliente) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE branch_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_sede VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE places (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado BOOLEAN DEFAULT TRUE,
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
);

CREATE TABLE branches (
  id INT PRIMARY KEY AUTO_INCREMENT,
  direccion TEXT,
  horario VARCHAR(100),
  id_lugar INT,
  id_empresa INT,
  id_tipo_sede INT,
  FOREIGN KEY (id_lugar) REFERENCES places(id),
  FOREIGN KEY (id_empresa) REFERENCES companies(id),
  FOREIGN KEY (id_tipo_sede) REFERENCES branch_types(id)
);

CREATE TABLE permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  guard_name VARCHAR(100)
);

CREATE TABLE role_permissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_permiso INT,
  id_rol INT,
  FOREIGN KEY (id_permiso) REFERENCES permissions(id),
  FOREIGN KEY (id_rol) REFERENCES roles(id)
);
