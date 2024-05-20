require('dotenv').config();
const mysql = require('mysql2');

//Función de creación de conexión con la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = () => {
    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.error('Error al crear la base de datos:', err);
            return;
        }
        console.log('Base de datos creada exitosamente o ya existente.');
        createTableUsers(); // Llama a la función para crear la tabla users
    });
};

// Función para crear la tabla users si no existe
const createTableUsers = () => {
    db.query(`USE ${process.env.DB_NAME}`, (err, result) => {
        if (err) {
            console.error('Error al seleccionar la base de datos:', err);
            return;
        }
        console.log('Base de datos seleccionada.');

        db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullname VARCHAR(100) NOT NULL,
            email VARCHAR(70) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            pwd VARCHAR(100) NOT NULL,
            remember_token VARCHAR(100),
            role ENUM('MASTER', 'ADMIN', 'ALMACEN', 'VENTAS') NOT NULL,
            status INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`, (err, result) => {
            if (err) {
                console.error('Error al crear la tabla users:', err);
                return;
            }
            console.log('Tabla users creada exitosamente o ya existente.');
            createDefaultUser(); // Llama a la función para crear el usuario por defecto
        });
    });
};

// Función para crear un usuario por defecto
const createDefaultUser = () => {
    db.query(`INSERT INTO users (fullname, email, password, pwd, role) VALUES (?, ?, ?, ?, ?)`, 
        ['Isa Dev', 'isa-dev@mail.com', '753159', '1234', 'MASTER'], 
        (err, result) => {
            if (err) {
                console.error('Error al crear el usuario por defecto:', err);
                return;
            }
            console.log('Usuario por defecto creado exitosamente.');
        }
    );
};

// Llama a la función para crear la base de datos si no existe
createDatabaseIfNotExists();

module.exports = db;
