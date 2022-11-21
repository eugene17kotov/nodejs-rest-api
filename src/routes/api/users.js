const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');

const { getCurrentController } = require('../../controllers/usersController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.get('/current', authMiddleware, ctrlWrapper(getCurrentController));

module.exports = router;
