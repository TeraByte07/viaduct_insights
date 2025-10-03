// backend/testDb.js
const pool = require('./config/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected to Postgres at:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();
