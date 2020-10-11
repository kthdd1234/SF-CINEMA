const express = require('express');
const router = express.Router();

const { saveController } = require('../Controller');

// * POST /save/checked
router.post('/checked', saveController.save.post);

// * DELETE /save/cancel
router.delete('/cancel', saveController.save.delete);

module.exports = router;
