const express = require('express');
const router = express.Router();
const { signup, login, logout, verifyUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verify', verifyUser);

module.exports = router;
