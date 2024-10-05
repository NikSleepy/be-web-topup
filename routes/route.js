const express = require('express');
const router = express.Router();
const {
  getUsers,
  register,
  login,
  logout,
  verifyToken,
} = require('../controllers/userController');
const { order, getOrderById } = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

router.get('/users', auth, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verifyToken',auth, verifyToken);

router.post('/order', auth, order);
router.get('/orders', auth, getOrderById);

module.exports = router;
