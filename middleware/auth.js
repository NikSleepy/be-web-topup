const { redirect } = require('express/lib/response');
const { verifyToken } = require('../helpers/token');

const auth = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('http://localhost:3000/login');
  }

  try {
    const user = verifyToken(token);
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({
      massage: 'Token is not valid',
    });
  }
};

module.exports = {
  auth,
};
