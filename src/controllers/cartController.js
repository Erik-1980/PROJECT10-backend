const Cart = require('../models/CartsModel');
const Product = require('../models/ProductsModel');
const { JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

// Получение корзины user
exports.getCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const cart = await Cart.findAllByUserId(decodedToken.userId);
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// Добавление продукта в корзину user
exports.addToCart = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    };
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user_product = await Cart.findByUserIdAndProductId(decodedToken.userId, product.id)
    if (!user_product){
      addcart = new Cart(decodedToken.userId, product.id, 1);
      await addcart.save()
    } else {
      user_product.quantity += 1;
      await Cart.updateQuantity(decodedToken.userId, product.id, user_product.quantity)
    }
    res.status(201).json({ message: 'product added to cart!'})
  } catch (error) {
    next(error);
  }
};

// Удаление продукта из корзины user
exports.deleteFromCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const product = await Cart.findByUserIdAndProductId(decodedToken.userId, req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    };
    if (product.quantity>1){
      product.quantity -= 1;
      await Cart.updateQuantity(decodedToken.userId, req.params.id, product.quantity)
    } else {
      await Cart.deleteCartByUserIdAndProductId(decodedToken.userId, req.params.id )
    }
    res.status(201).json({ message: 'product removed from cart!'})
  } catch (error) {
    next(error);
  }
};

// Удаление всех продуктов из корзины user
exports.deleteAllFromCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const product = await Cart.findAllByUserId(decodedToken.userId);
    if (product.length===0) {
      return res.status(404).json({ error: 'Product not found' });
    }
      await Cart.deleteAllCartsByUserId(decodedToken.userId)
    res.status(201).json({ message: 'products removed from cart!'})
  } catch (error) {
    next(error);
  }
};