const express = require('express');
const router = express.Router();

const { contentsController } = require('../controller');

// * GET /contents
router.get('/', contentsController.contents.get);

module.exports = router;
