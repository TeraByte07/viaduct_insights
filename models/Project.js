const pool = require('../config/db');

// Example using raw SQL queries
exports.findAll = async () => {
  const result = await pool.query('SELECT * FROM projects');
  return result.rows;
};

exports.create = async (project) => {
  const result = await pool.query(
    'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
    [project.name, project.description]
  );
  return result.rows[0];
};