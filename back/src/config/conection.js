require('dotenv').config();
const mysql = require('mysql2/promise');

// Función para crear la conexión a la base de datos
const createConnection = async () => {
  try {
    // console.log('Attempting to connect with:', {
    //   host: process.env.MYSQL_HOST,
    //   user: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DB
    // });
    
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      namedPlaceholders: true,
      supportBigNumbers: true,
      bigNumberStrings: true,
      dateStrings: true
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    console.error('Environment variables:', {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_DB: process.env.MYSQL_DB
    });
    process.exit(1);
  }
};
module.exports = { createConnection };
