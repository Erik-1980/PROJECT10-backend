const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userMiddleware = require('../middlewares/userMiddleWare');

// Регистрация
router.post('/register', authController.register);

// Вход
router.post('/login', authController.login);

// Обновление токена
router.get('/refreshtoken', authController.refreshToken);

// Верификация
router.get('/usersverify', userMiddleware, authController.usersVerify)

// Верификация ответ
router.get('/responseverify', authController.responseVerify)

module.exports = router;