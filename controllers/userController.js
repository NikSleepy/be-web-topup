// controllers/userController.js
const db = require('../config/db');
// Get all users
const getUsers = async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM user');
    res.status(200).json({
      message: ' successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Create a new user
const createUser = async(req, res) => {
  try {
    const { email, password } = req.body;
    await db.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, password]);
    res.status(200).json({
      message: 'User created successfully',
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
  
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (result[0].password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      data: result[0],
    });

  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
}

module.exports = {
  getUsers,
  createUser,
  login
};
