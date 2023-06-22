const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userMiddleware = require('../middlewares/userMiddleWare');
const adminMiddleware = require('../middlewares/adminMiddleWare');

router.get('/', userMiddleware, orderController.getOrders);

router.get('/allorders', adminMiddleware, orderController.getAllOrders);

router.get('/config', userMiddleware, orderController.stripe);

router.post('/create-payment-intent', userMiddleware, orderController.payment);

router.put('/updatequantity', userMiddleware, orderController.updatequantity);

router.put('/updateorderstatus', adminMiddleware, orderController.updateOrderStatus);

module.exports = router;