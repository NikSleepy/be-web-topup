const db = require('../config/db');

const order = async (req, res) => {
  try {
    const { uid, server, item, price, quantity, whatshapp, payment, user_id } =
      req.body;
    await db.query(
      'INSERT INTO orders (uid, server, item, price, quantity, whatshapp, payment, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [uid, server, item, price, quantity, whatshapp, payment, user_id]
    );
    res.status(200).json({
      message: 'Order created successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.body;
    const [result] = await db.query('SELECT * FROM orders WHERE user_id = ?', [id]);
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
