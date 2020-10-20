const express = require('express');
const router = express.Router();

const { saveController } = require('../controller');

// * POST /save/completed
router.post('/completed', saveController.save.post);

// * DELETE /save/cancel
router.delete('/cancel', saveController.save.delete);

module.exports = router;
