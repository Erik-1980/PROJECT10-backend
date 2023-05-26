const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/multer');

// Получение списка всех продуктов
router.get('/products', productController.getProducts);

// Создание нового продукта
router.post('/product', adminMiddleware, upload.single('image'), productController.createProducts);

// Создание новой категории
router.post('/category', adminMiddleware, productController.createCategories);

// Получение всех категорий
router.get('/category', productController.getCategories);

// Обновление информации о продукте
router.put('/updateproduct', adminMiddleware, productController.updateProducts);

// Обновление информации о категории
router.put('/updatecategory', adminMiddleware, productController.updateCategories);

// Удаление продукта
router.delete('/product/:id', adminMiddleware, productController.deleteProduct);

// Удаление категории
router.delete('/category/:id', adminMiddleware, productController.deleteCategory);


module.exports = router;