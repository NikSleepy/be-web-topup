// controllers/userController.js
const db = require('../config/db');
const { hashPassword, comparePassword } = require('../helpers/hashedPassword');
const { generateTokens } = require('../helpers/token');

// Get all users
const getUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const [result] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    res.status(200).json({
      message: ' successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Create a new user
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await hashPassword(password);
    await db.query(
      'INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username]
    );
    res.status(200).json({
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Database query failed', error: error });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await db.query('SELECT * FROM user WHERE email = ?', [
      email,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await comparePassword(password, result[0].password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateTokens({ id: result[0].id, email: result[0].email });

    res.cookie('token', token, {
      httpOnly: true,
      secure: 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Database query failed', error: error });
  }
};

const verifyToken = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(403).json({
        massage: 'token not valid',
      });
    }

    res.status(200).json({
      message: 'Token is valid',
      // token: token,
    });
  } catch (error) {
    return res.status(403).json({
      massage: 'Token is not valid',
    });
  }
};

// logout or distroy the token
const logout = async (req, res) => {
  try {
    await res.clearCookie('token', {
      httpOnly: true,
      secure: 'production',
    });

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Database query failed', error: error });
  }
};

module.exports = {
  getUsers,
  register,
  login,
  logout,
  verifyToken,
};
