const express = require('express');
const router = express.Router();

const { searchController } = require('../controller');

// * GET /search
router.get('/', searchController.search.get);

module.exports = router;
