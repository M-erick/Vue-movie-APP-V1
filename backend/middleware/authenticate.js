
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/.env' }); 

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    // If token is valid, attach user information to request
    req.user = decoded;
    next();
  });
};
