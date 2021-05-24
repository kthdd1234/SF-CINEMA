const express = require('express');
const router = express.Router();

const { exploreController } = require('../controller');

// * GET /explore
router.get('/', exploreController.explore.get);

module.exports = router;
