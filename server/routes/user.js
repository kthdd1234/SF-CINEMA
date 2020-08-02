const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { authenticateToken } = require('../controller/authenticate');

// * POST /user/signup
router.post('/signup', userController.signup.post);

// * POST /user/login
router.post('/login', userController.login.post);

// * GET /user/profile
router.get('/profile', authenticateToken, userController.profile.get);

module.exports = router;
