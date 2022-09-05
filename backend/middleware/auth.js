const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw 'Invalid user ID';
    } 
    else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};

