const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.isAdmin !== true) {
      return res.status(401).json({ error: 'You do not have permission to perform this action' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'You do not have permission to perform this action' });
  }
};  