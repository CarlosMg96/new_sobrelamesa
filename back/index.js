require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware CORS
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { createConnection } = require('./config/conection');
const { createDatabaseIfNotExists } = require('./config/init_config');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.use('/api/', authRoutes);
app.use('/api/', productRoutes);

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});


const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  try {
    const connection = await createConnection();
    await createDatabaseIfNotExists(connection);
    await connection.end();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize the server:', err);
    process.exit(1); // Exit the process with a failure code
  }
};

initializeServer();
