// backend/server.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const adminRoutes = require('./routes/adminAuthRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
