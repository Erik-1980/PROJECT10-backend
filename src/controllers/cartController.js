const Cart = require('../models/cartsModel');
const Product = require('../models/productsModel');
const { JWT_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

// Получение корзины user
exports.getCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Sorry, you are not logged in' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const cart = await Cart.getCartByUserId(decodedToken.id);
    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// Добавление продукта в корзину user
exports.addToCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Sorry, you are not logged in, you need to log in to add a product to the cart.' });
    };
    const product = await Product.getProductById(req.params.id);
    if (!product || product.quantity === 0) {
      return res.status(404).json({ error: 'Sorry, this product was not found or is out of stock. It will be available soon.' });
    };
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user_product = await Cart.getCartByUserIdAndProductId(decodedToken.id, product.id);
    if (!user_product){
      const addcart = await Cart.add(decodedToken.id, product.id);
      res.status(201).json({ message: 'product added to cart!'})
      return addcart
    } else {
      res.status(409).json({ message_error: 'this product is already in your cart!'})
    }
  } catch (error) {
    next(error);
  }
};

// Удаление продукта из корзины user
exports.deleteFromCart = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Sorry, you are not logged in, you need to log in to remove a product from cart.' });
    };
    jwt.verify(token, JWT_SECRET);
    const cart = await Cart.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Product not found' });
    } else {
      await Cart.deleteProductFromCart(req.params.id)
    }
    res.status(201).json({ message: 'product removed from cart!'})
  } catch (error) {
    next(error);
  }
};