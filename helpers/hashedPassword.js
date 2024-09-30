const bycrpt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bycrpt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bycrpt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePassword };
