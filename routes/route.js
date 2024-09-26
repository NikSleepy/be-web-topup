const express = require('express');
const router = express.Router();
const { getUsers, createUser, login } = require('../controllers/userController');

router.get('/users', getUsers);
router.post('/user', createUser); 
router.post('/login', login);

module.exports = router;
