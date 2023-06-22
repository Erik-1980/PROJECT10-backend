const Product = require('../models/productsModel');
const Order = require('../models/ordersModel');
const jwt = require('jsonwebtoken');
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, JWT_SECRET } = require('../config/config');

const stripe = require("stripe")(STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

exports.getOrders = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const id = decodedToken.id
  try {
    const orders = await Order.getOrders(id);
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.getAllOrders();
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.stripe = async (req, res, next) => {
  try {
    res.status(200).json({ publishableKey: STRIPE_PUBLISHABLE_KEY });
  } catch (err) {
    next(err);
  }
};

exports.payment = async (req, res, next) => {
  const { id, quantity } = req.body;
  const product = await Product.getProductById(id);
  if (!product) {
    return res.status(404).json({ message_error: 'Product not found' });
  };
  if (product.quantity < quantity) {
    return res.status(404).json({ message_error: 'The quantity you specified is not available at the moment, leave a request and we will solve your problem' });
  }
  const amount = (Math.round((product.price - (product.price * product.discount / 100)) / 10) * 10 - 5) * quantity * 100;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: amount,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
};

exports.updatequantity = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id, quantity } = req.body;
  const decodedToken = jwt.verify(token, JWT_SECRET);
  try {
    const product = await Product.getProductById(id);
    if (product) {
      const new_quantity = product.quantity - quantity
      await Product.updateProductQuantity(id, new_quantity);
      await Order.createOrder(id, decodedToken.id, quantity);
    };
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const { id, newOrderStatus } = req.body;
  console.log(id, newOrderStatus);
  try {
    const order = await Order.getOrdersById(id);
    if (order) {
      await Order.updateStatus(id, newOrderStatus);
      res.status(200).json({ message: 'Status updated!' });
    };
  } catch (err) {
    next(err);
  }
};