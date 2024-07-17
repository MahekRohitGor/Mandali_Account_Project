const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');

  // Check if not token
  if (!token) {
    console.log('No token found in request headers');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    // Split "Bearer " from token
    const tokenPart = token.split(' ')[1];
    if (!tokenPart) {
      console.log('Token format is incorrect');
      return res.status(401).json({ msg: 'Token format is incorrect' });
    }

    // Verify token
    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET || config.get('jwtSecret'));
    // console.log('Decoded token:', decoded);
    req.user = decoded;
    // console.log('req.user:', req.user);
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};