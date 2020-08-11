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

// * POST /user/savedMovie
router.post('/savedMovie', userController.savedMovie.post);

// * POST /user/likedMovie
router.post('/likedMovie', userController.likedMovie.post);

// * POST /user/disLikedMovie
router.post('/disLikedMovie', userController.disLikedMovie.post);

// * POST /user/cancelSavedMovie
router.post('/cancelSavedMovie', userController.cancelSavedMovie.post);

// * POST /user/cancelLikedMovie
router.post('/cancelLikedMovie', userController.cancelLikedMovie.post);

// * POST /user/cancelDisLikedMovie
router.post('/cancelDisLikedMovie', userController.cancelDisLikedMovie.post);

module.exports = router;
