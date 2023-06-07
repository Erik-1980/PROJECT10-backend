const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const userMiddleware = require('../middlewares/userMiddleWare');

// Получение содержимого корзины текущего пользователя
router.get('/', userMiddleware, cartController.getCart);

// Добавление продукта в корзину
router.get('/:id', userMiddleware, cartController.addToCart);

// Удаление продукта из корзины
router.delete('/:id',  userMiddleware, cartController.deleteFromCart);

module.exports = router;