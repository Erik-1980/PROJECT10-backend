const User = require('../models/usersModel');

// Получение всех user
exports.getAllUsers = async (req, res, next) => {// +
  try {
    const users = await User.findAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
