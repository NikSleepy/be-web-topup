const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'SECRET_KEY';

const generateTokens = (payload) => {
  try {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  } catch (error) {
    return {
      message: 'Failed to generate token',
      error: error,
    };
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return {
      message: 'Invalid token',
      error: error,
    };
  }
};

module.exports = {
  generateTokens,
  verifyToken,
};
