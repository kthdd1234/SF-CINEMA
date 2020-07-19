const express = require('express');
const router = express.Router();

const { mainController } = require('../controller');

// * GET /main/randomMovies
router.get('/randomMovies', mainController.randomMovies.get);

// * GET /main/highlyRated
router.get('/highlyRated', mainController.highlyRated.get);

// * GET /main/recentlyReleased
router.get('/recentlyReleased', mainController.recentlyReleased.get);

// * GET /main/operatorMovies
router.get('/operatorMovies', mainController.operatorMovies.get);

// * GET /main/masterpiece
router.get('/masterpiece', mainController.masterpiece.get);

// * GET /main/series
router.get('/series', mainController.series.get);

module.exports = router;
