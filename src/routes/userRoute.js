const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleware');


// Получение списка всех пользователей
router.get('/', adminMiddleware, userController.getAllUsers);

// Получение информации о пользователе
router.get('/currentuser', adminMiddleware, userController.getUserById);

// Удаление пользователя
router.delete('/:id', adminMiddleware, userController.deleteUser);

module.exports = router;