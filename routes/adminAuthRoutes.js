// backend/routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { signup, login, refresh } = require('../controllers/adminAuthController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);

module.exports = router;
