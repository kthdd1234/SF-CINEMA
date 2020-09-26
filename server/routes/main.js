const express = require('express');
const router = express.Router();

const { mainController } = require('../controller');

// GET/main/contents
router.get('/contents', mainController.contents.get);

// * GET/main/backgroundImg
router.get('/backgroundImg', mainController.backgroundImg.get);

// * GET/main/genres
router.get('/genres', mainController.genres.get);

// * POST/main/searchMovie
router.get('/searchMovie', mainController.searchMovie.get);

// * GET /main/randomMovies
router.get('/randomMovies', mainController.randomMovies.get);

// * GET /main/highlyRated
router.get('/highlyRated', mainController.highlyRated.get);

// * GET /main/releaseOrder
router.get('/releaseOrder', mainController.releaseOrder.get);

// * GET /main/operatorMovies
router.get('/operatorMovies', mainController.operatorMovies.get);

// * GET /main/masterpiece
router.get('/masterpiece', mainController.masterpiece.get);

// * GET /main/series
router.get('/series', mainController.series.get);

module.exports = router;
