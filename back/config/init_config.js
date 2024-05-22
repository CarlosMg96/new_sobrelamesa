const { createConnection } = require('./conection');
const bcrypt = require('bcryptjs');

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = async (connection) => {
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log('Base de datos creada exitosamente o ya existente.');
    await createTableUsers(connection); // Llama a la función para crear la tabla users
  } catch (err) {
    console.error('Error al crear la base de datos:', err);
  }
};

// Función para crear la tabla users si no existe
const createTableUsers = async (connection) => {
  try {
    await connection.query(`USE ${process.env.DB_NAME}`);
    console.log('Base de datos seleccionada.');

    await connection.query(`CREATE TABLE IF NOT EXISTS users (
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
    )`);
    console.log('Tabla users creada exitosamente o ya existente.');
    await createDefaultUser(connection); // Llama a la función para crear el usuario por defecto
  } catch (err) {
    console.error('Error al crear la tabla users:', err);
  }
};

// Función para crear un usuario por defecto
const createDefaultUser = async (connection) => {
    try {
      // Verificar si el usuario ya existe
      const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', ['isadev@mail.com']);
  
      if (existingUsers.length > 0) {
        console.log('El usuario ya existe, no se creará de nuevo.');
        return;
      }
  
      // Encriptar las contraseñas
      const hashedPassword = bcrypt.hashSync('753159', 8);
      const hashedPwd = bcrypt.hashSync('1234', 8);
  
      // Crear el usuario si no existe
      await connection.execute(
        'INSERT INTO users (fullname, email, password, pwd, role) VALUES (?, ?, ?, ?, ?)',
        ['Isa Dev', 'isadev@mail.com', hashedPassword, hashedPwd, 'MASTER']
      );
      console.log('Usuario por defecto creado exitosamente.');
    } catch (err) {
      console.error('Error al crear el usuario por defecto:', err);
    }
  };


module.exports = { createDatabaseIfNotExists}
