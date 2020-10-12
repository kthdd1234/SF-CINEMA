const express = require('express');
const router = express.Router();

const { likeController } = require('../Controller');

// * POST /like/completed
router.post('/completed', likeController.like.post);

// * DELETE /like/cancel
router.delete('/cancel', likeController.like.delete);

module.exports = router;
