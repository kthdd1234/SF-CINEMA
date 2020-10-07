const express = require('express');
const router = express.Router();

const { mainController } = require('../controller');

// GET/main/contents
router.get('/contents', mainController.contents.get);

// * GET/main/background
router.get('/background', mainController.background.get);

// * GET/main/genre
router.get('/genre', mainController.genre.get);

// * POST/main/search
router.get('/search', mainController.searchMovie.get);

// * GET /main/random
router.get('/random', mainController.random.get);

// * GET /main/rating
router.get('/rating', mainController.rating.get);

// * GET /main/date
router.get('/date', mainController.date.get);

// * GET /main/operator
router.get('/operator', mainController.operator.get);

// * GET /main/masterpiece
router.get('/masterpiece', mainController.masterpiece.get);

// * GET /main/series
router.get('/series', mainController.series.get);

module.exports = router;
