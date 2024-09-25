// controllers/userController.js
const users = ['John', 'Jane']; // Temporary in-memory storage (replace with DB later)

// Get all users
const getUsers = (req, res) => {
    console.log('getUsers', users);
  res.json(users);
};

// Create a new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  getUsers,
  createUser,
};
