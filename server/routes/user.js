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

// * DELETE /user/cancelSavedMovie
router.delete('/cancelSavedMovie', userController.cancelSavedMovie.delete);

// * POST /user/likedMovie
router.post('/likedMovie', userController.likedMovie.post);

// * DELETE /user/cancelLikedMovie
router.delete('/cancelLikedMovie', userController.cancelLikedMovie.delete);

module.exports = router;
