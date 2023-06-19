const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userMiddleware = require('../middlewares/userMiddleWare');

router.get('/config', userMiddleware, orderController.stripe);

router.post('/create-payment-intent', userMiddleware, orderController.payment);

router.post('/updatequantity', userMiddleware, orderController.updatequantity);

module.exports = router;