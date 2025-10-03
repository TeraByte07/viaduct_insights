// backend/utils/tokenService.js
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES }
  );

  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );

  // Save refresh token in DB
  await pool.query('INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)', [user.id, refreshToken]);

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

const verifyRefreshToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // Check if token exists in DB
  const result = await pool.query('SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2', [decoded.id, token]);
  if (result.rows.length === 0) throw new Error('Invalid refresh token');

  return decoded;
};

const revokeRefreshToken = async (token) => {
  await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
};

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken, revokeRefreshToken };
