// test-db.js
const pool = require('./db');

(async () => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    console.log('✅ DB Test Result:', rows);
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
  }
})();
