CREATE DATABASE agreement_system;
USE agreement_system;

CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  gmail varchar(100) UNIQUE NOT NULL,
  phone varchar(20),
  direccion TEXT,
  passwd varchar(255) NOT NULL,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE users (
  id INT KEY AUTO_INCREMENT,
  companies_id INT NOT NULL,
  nombre varchar(100) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  passwd varchar(255) NOT NULL,
  rol ENUM('admin', 'empleado') DEFAULT 'empleado',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companies_id) REFERENCES companies(id) ON DELETE CASCADE
);

