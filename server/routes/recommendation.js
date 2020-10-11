const express = require('express');
const router = express.Router();

const { recommendationController } = require('../controller');

// * GET /recommendation
router.get('/', recommendationController.recommendation.get);

// * GET /recommendation/latest-movies
router.get('/latest-movies', recommendationController.latestMovies.get);

// * GET /recommendation/highly-rated-movies
router.get(
  '/highly-rated-movies',
  recommendationController.highlyRatedMovies.get
);

// * GET /recommendation/operator-recommendation
router.get(
  '/operator-recommendation',
  recommendationController.operatorRecommendation.get
);

// * GET /recommendation/sf-masterpiece
router.get('/sf-masterpiece', recommendationController.sfMasterpiece.get);

module.exports = router;
