const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db-topup',
  password: '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
  connection.release(); // Jangan lupa untuk melepaskan koneksi setelah digunakan
});

module.exports = promisePool;
