const bcrypt = require('bcrypt');
const pool = require('../config/db');
const { generateTokens, verifyRefreshToken, verifyAccessToken, revokeRefreshToken } = require('../utils/tokenService');

// SIGNUP
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || 'user']
    );

    const user = result.rows[0];
    const tokens = await generateTokens(user);

    res.status(201).json({
        message: 'User registered successfully',
        user, ...tokens
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = result.rows[0];

    if (user.role === 'admin') {
      return res.status(403).json({ error: 'Admins cannot log in here. Use the admin login route.' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    const tokens = await generateTokens(user);

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      ...tokens
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// REFRESH TOKEN
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

    const userData = await verifyRefreshToken(refreshToken);
    const tokens = await generateTokens(userData);

    res.status(200).json({
      message: 'Token refreshed successfully ✅',
      ...tokens
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

    await revokeRefreshToken(refreshToken);
    res.status(200).json({ message: 'Logged out successfully' });

  }catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, login, refresh, logout };