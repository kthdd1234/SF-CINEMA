const express = require('express');
const router = express.Router();

const { moviesController } = require('../controller');

// * GET /movies
router.get('/', moviesController.movies.get);

module.exports = router;
