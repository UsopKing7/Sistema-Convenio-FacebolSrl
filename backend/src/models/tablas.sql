CREATE DATABASE IF NOT EXISTS sistema_convenios;
USE sistema_convenios;

CREATE TABLE empresas (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
  nombre_empresa VARCHAR(100) NOT NULL,
  representante VARCHAR(100) NOT NULL,
  celular VARCHAR(20),
  correo VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT,
  nit VARCHAR(50) UNIQUE NOT NULL,
  facebook TEXT DEFAULT NULL,
  linkedin TEXT DEFAULT NULL,
  tiktok TEXT DEFAULT NULL,
  longitud TEXT,
  altitud TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre_rol VARCHAR(100) NOT NULL,
  descripcion_rol TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  contrasena VARCHAR(255) NOT NULL,
  rol_id CHAR(36) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE permisos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre_permiso VARCHAR(100) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roles_permisos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  permiso_id CHAR(36) NOT NULL,
  rol_id CHAR(36) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
  FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT UNQ_ROL_PERM UNIQUE (permiso_id, rol_id)
);

CREATE TABLE usuarios_permisos (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  usuario_id CHAR(36) NOT NULL,
  permiso_id CHAR(36) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
  CONSTRAINT UNQ_USUARIO_PERM UNIQUE (usuario_id, permiso_id)
);

CREATE TABLE convenios (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  estado BOOLEAN DEFAULT TRUE,
  folio VARCHAR(50) NOT NULL,
  folio_interno VARCHAR(50),
  modalidad VARCHAR(100),
  presupuesto DECIMAL(12,2) NOT NULL,
  empresa_id CHAR(36) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

CREATE TABLE tipos_sede (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  nombre_sede VARCHAR(100) UNIQUE NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lugares (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unq_ciudad_departamento (ciudad, departamento)
);

CREATE TABLE sucursales (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  direccion TEXT NOT NULL,
  horario VARCHAR(100),
  lugar_id CHAR(36) NOT NULL,
  empresa_id CHAR(36) NOT NULL,
  tipo_sede_id CHAR(36) NOT NULL,
  estado BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lugar_id) REFERENCES lugares(id),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  FOREIGN KEY (tipo_sede_id) REFERENCES tipos_sede(id)
);
