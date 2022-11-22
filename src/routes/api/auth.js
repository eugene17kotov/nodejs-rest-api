const express = require('express');

const router = express.Router();

const {
    signupController,
    loginController,
    logoutController,
} = require('../../controllers/authController');

const { userSchema } = require('../../schemas/validationUserSchema');
const { validationBody } = require('../../middlewares/validationBody');

const { authMiddleware } = require('../../middlewares/authMiddleware');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.post(
    '/signup',
    validationBody(userSchema),
    ctrlWrapper(signupController)
);

router.post('/login', validationBody(userSchema), ctrlWrapper(loginController));

router.get('/logout', authMiddleware, ctrlWrapper(logoutController));

module.exports = router;
