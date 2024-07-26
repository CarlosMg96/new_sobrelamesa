const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Ruta de prueba para "Hola Mundo"
router.get('/auth/hello', (req, res) => {
  res.send('Hola Mundo');
});

router.post('/auth/register', verifyToken, checkRole(['MASTER']), authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', verifyToken, authController.me);
router.get('/auth/get_users', verifyToken, checkRole(['MASTER']), authController.get_users);

module.exports = router;
