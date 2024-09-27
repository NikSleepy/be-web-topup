const express = require('express');
const router = express.Router();
const { getUsers, register, login } = require('../controllers/userController');
const { order, getOrderById } = require('../controllers/orderController');

router.get('/users', getUsers);
router.post('/register', register); 
router.post('/login', login);

router.post('/order', order);
router.post('/orders', getOrderById);

module.exports = router;
