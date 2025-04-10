CREATE DATABASE agreement_system;
USE agreement_system;

CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  phone varchar(20),
  address TEXT,
  password varchar(255) NOT NULL,
  state BOOLEAN DEFAULT TRUE,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE users (
  id INT KEY AUTO_INCREMENT,
  companies_id INT NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  rol TEXT,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companies_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE company_movements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companies_id INT NOT NULL,
  movement_type VARCHAR(30) NOT NULL,
  amount INT NOT NULL,
  description TEXT,
  movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companies_id) REFERENCES companies(id) ON DELETE CASCADE
);

ALTER TABLE company_movements ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
