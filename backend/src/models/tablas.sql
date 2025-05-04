CREATE DATABASE IF NOT EXISTS sistema_convenios;
USE sistema_convenios;

CREATE TABLE empresas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre_empresa VARCHAR(100),
  representante VARCHAR(100),
  celular VARCHAR(20),
  correo VARCHAR(100) UNIQUE,
  descripcion TEXT,
  nit VARCHAR(50) UNIQUE
);

CREATE TABLE roles (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre_rol VARCHAR(100),
  descripcion_rol TEXT
);

CREATE TABLE usuarios (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE,
  telefono VARCHAR(20),
  contrasena VARCHAR(255), 
  rol_id CHAR(36),
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE permisos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre VARCHAR(100)
);

CREATE TABLE roles_permisos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  permiso_id CHAR(36),
  rol_id CHAR(36),
  FOREIGN KEY (permiso_id) REFERENCES permisos(id),
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE clientes (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  estado BOOLEAN DEFAULT TRUE,
  nombre VARCHAR(100),
  apellido_paterno VARCHAR(100),
  apellido_materno VARCHAR(100),
  ci VARCHAR(20),
  extension VARCHAR(10),
  celular VARCHAR(15),
  direccion TEXT,
  correo VARCHAR(100) UNIQUE
);

CREATE TABLE tarjetas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  codigo VARCHAR(50),
  modalidad_qr VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE,
  cliente_id CHAR(36),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE convenios (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  estado VARCHAR(50),
  folio VARCHAR(50),
  folio_interno VARCHAR(50),
  modalidad VARCHAR(100),
  presupuesto DECIMAL(12,2),
  empresa_id CHAR(36),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

CREATE TABLE tipos_sede (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre_sede VARCHAR(100),
  estado BOOLEAN DEFAULT TRUE
);

CREATE TABLE lugares (
  id INT PRIMARY KEY AUTO_INCREMENT,
  estado BOOLEAN DEFAULT TRUE,
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  provincia VARCHAR(100)
);

CREATE TABLE sucursales (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  direccion TEXT,
  horario VARCHAR(100),
  lugar_id INT,
  empresa_id CHAR(36),
  tipo_sede_id INT,
  FOREIGN KEY (lugar_id) REFERENCES lugares(id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  FOREIGN KEY (tipo_sede_id) REFERENCES tipos_sede(id)
);
