const express = require('express');
const router = express.Router();

const { seriesController } = require('../controller');

// * GET /series
router.get('/', seriesController.series.get);

module.exports = router;
