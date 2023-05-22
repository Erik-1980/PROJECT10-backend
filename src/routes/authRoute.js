const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Регистрация
router.post('/register', authController.register);

// Вход
router.post('/login', authController.login);

// Обновление токена
router.get('/refreshtoken', authController.refreshToken)

module.exports = router;