const User = require('../models/UsersModel');
const Cart = require('../models/CartsModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');


// Получение всех user
exports.getAllUsers = async (req, res, next) => {// +
  try {
    const users = await User.findAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

// Получение одного user
exports.getUserById = async (req, res, next) => {// +
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const id = decodedToken.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({  user });
  } catch (err) {
    next(err);
  }
};

// Удаление user
exports.deleteUser = async (req, res, next) => {// +
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // await Cart.deleteAllByUserId(id)
    await User.deleteUserById(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
