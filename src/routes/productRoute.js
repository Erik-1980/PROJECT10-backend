const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/multer');

// Получение списка всех продуктов
router.get('/', adminMiddleware, productController.getProducts);

// Создание нового продукта
router.post('/', adminMiddleware, upload.single('image'), productController.createProducts);

// Создание новой категории
router.post('/category', adminMiddleware, productController.createCategories);

// Получение всех категорий
router.get('/category', productController.getCategories);

// Обновление информации о продукте
router.put('/update', adminMiddleware, productController.updateProduct);

// Удаление продукта
router.delete('/:id', adminMiddleware, productController.deleteProduct);

// Удаление категории
router.delete('/category/:id', adminMiddleware, productController.deleteCategory);

// Получение информации о конкретном продукте
router.post('/onlyoneproduct', adminMiddleware, productController.getOneProduct);


module.exports = router;