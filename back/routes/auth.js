const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

router.post('/register', verifyToken, checkRole(['MASTER']), authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.me);

module.exports = router;
