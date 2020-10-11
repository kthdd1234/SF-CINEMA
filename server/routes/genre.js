const express = require('express');
const router = express.Router();

const { genreController } = require('../controller');

// * GET /genre
router.get('/', genreController.genre.get);

module.exports = router;
