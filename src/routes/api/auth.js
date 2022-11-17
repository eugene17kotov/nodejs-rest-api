const express = require('express');

const router = express.Router();

const {
    registrationController,
    loginController,
} = require('../../controllers/authController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.post('/registration');

router.post('/login');

module.exports = router;
