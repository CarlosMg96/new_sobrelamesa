require('dotenv').config();
const mysql = require('mysql2/promise');

// Función para crear la conexión a la base de datos
const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      namedPlaceholders: true,  // Añade esta línea
      supportBigNumbers: true,
      bigNumberStrings: true,
      dateStrings: true
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
};

module.exports = { createConnection };
