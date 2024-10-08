const db = require('../config/db');

// post order
const order = async (req, res) => {
  try {
    const { id } = req.user;
    const { uid, server, item, price, quantity, whatshapp, payment, name } = req.body;
    await db.query(
      'INSERT INTO orders (uid, server, name, item, price, quantity, whatshapp, payment, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [uid, server, name, item, price, quantity, whatshapp, payment, id]
    );
    res.status(200).json({
      message: 'Order created successfully',
    });
  } catch (error) {
    res.status(500).json({ massage: 'server error', error: error });  
  }
};

//get order by id
const getOrderById = async (req, res) => {
  try {
    const { id } = req.user;
    const [result] = await db.query('SELECT * FROM orders WHERE user_id = ?', [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({
      message: 'Order found successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = {
  order,
  getOrderById,
};
