const { verifyToken } = require('../helpers/token');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      massage: 'unauthorized',
    });
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
