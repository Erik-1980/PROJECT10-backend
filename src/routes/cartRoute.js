const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Добавление продукта в корзину
router.post('/:id', cartController.addToCart);

// Получение содержимого корзины текущего пользователя
router.get('/all', cartController.getCart);

// Удаление всех продуктов из корзины
router.delete('/all',  cartController.deleteAllFromCart);

// Удаление продукта из корзины
router.delete('/:id',  cartController.deleteFromCart);

module.exports = router;