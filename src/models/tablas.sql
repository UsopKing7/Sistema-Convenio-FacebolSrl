CREATE DATABASE IF NOT EXISTS sistema_convenios;
USE sistema_convenios;

CREATE TABLE empresas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_empresa VARCHAR(100),
  representante VARCHAR(100),
  celular VARCHAR(20),
  correo VARCHAR(100),
  descripcion TEXT,
  nit VARCHAR(50),
  contrasena VARCHAR(255)
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_rol VARCHAR(100),
  descripcion_rol TEXT
);

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  telefono VARCHAR(20),
  rol_id INT,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE permisos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100)
);

-- Tabla de relación entre roles y permisos
CREATE TABLE roles_permisos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  permiso_id INT,
  rol_id INT,
  FOREIGN KEY (permiso_id) REFERENCES permisos(id),
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla de clientes
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado BOOLEAN DEFAULT TRUE,
  nombre VARCHAR(100),
  apellido_paterno VARCHAR(100),
  apellido_materno VARCHAR(100),
  ci VARCHAR(20),
  extension VARCHAR(10),
  celular VARCHAR(15),
  direccion TEXT,
  correo VARCHAR(100)
);

-- Tabla de tarjetas
CREATE TABLE tarjetas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(50),
  modalidad_qr VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE,
  cliente_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de convenios
CREATE TABLE convenios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado VARCHAR(50),
  folio VARCHAR(50),
  folio_interno VARCHAR(50),
  modalidad VARCHAR(100),
  presupuesto DECIMAL(12,2),
  empresa_id INT,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Tabla de tipos de sede
CREATE TABLE tipos_sede (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_sede VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE
);

-- Tabla de lugares
CREATE TABLE lugares (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado BOOLEAN DEFAULT TRUE,
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  provincia VARCHAR(100)
);

-- Tabla de sucursales
CREATE TABLE sucursales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  direccion TEXT,
  horario VARCHAR(100),
  lugar_id INT,
  empresa_id INT,
  tipo_sede_id INT,
  FOREIGN KEY (lugar_id) REFERENCES lugares(id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  FOREIGN KEY (tipo_sede_id) REFERENCES tipos_sede(id)
);
