const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/adminMiddleWare');


// Получение списка всех пользователей
router.get('/', adminMiddleware, userController.getAllUsers);

module.exports = router;