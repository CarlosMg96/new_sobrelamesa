create database db_sobrelamesa;

use db_sobrelamesa;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(70) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    pwd VARCHAR(100) NOT NULL,
    remember_token VARCHAR(100),
    role ENUM('MASTER', 'ADMIN', 'ALMACEN', 'VENTAS') NOT NULL,
    status int default 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


