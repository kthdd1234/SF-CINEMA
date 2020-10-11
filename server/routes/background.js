const express = require('express');
const router = express.Router();

const { backgroundController } = require('../controller');

// * GET/background/image
router.get('/image', backgroundController.background.get);

module.exports = router;
