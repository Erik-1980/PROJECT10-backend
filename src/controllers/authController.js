const User  = require('../models/UsersModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Регистрация
exports.register = async (req, res, next) => {
  const { userInfo } = req.body;
  const user = await User.getUserByUsername(userInfo.email);
  if(user != undefined && userInfo.email===user.email){
    return res.status(409).json({ error_message: 'User with this e-mail is already registered!'});
  }
  const user_phone = await User.getUserByPhone(userInfo.phone);
  if(user_phone != undefined && userInfo.phone===user_phone.phone){
    return res.status(409).json({ error_message: 'User with this phone is already registered!'});
  }
  try {
    const hashedPassword = CryptoJS.SHA256(userInfo.password).toString();
    await User.createUser(userInfo.firstname, userInfo.lastname, userInfo.email, hashedPassword, userInfo.country, userInfo.region, userInfo.city, userInfo.adress, userInfo.phone, userInfo.gender);
    res.status(201).json({ message: 'You have successfully registered!'});
  } catch (error) {
    next(error);
  }
};

// Аутентификация
exports.login = async (req, res, next) => {
  const { values } = req.body;
  const hashedPassword = CryptoJS.SHA256(values.password).toString();
  try {
    const user = await User.getUserByUsername(values.email);
    if (!user || user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user.id, user.email, user.isAdmin, user.verification);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Обновление токена
exports.refreshToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const newToken = generateToken(decodedToken.id, decodedToken.email, decodedToken.isAdmin, decodedToken.verification);
    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
};

// Генерация JWT токена
function generateToken(id, email, isAdmin, verification) {
  const secret = JWT_SECRET;
  const token = jwt.sign({ id, email, isAdmin, verification }, secret, { expiresIn: '1h' });
  return token;
}