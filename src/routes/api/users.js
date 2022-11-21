const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');

const { subscriptionSchema } = require('../../schemas/validationUserSchema');

const { validationBody } = require('../../middlewares/validationBody');

const {
    getCurrentController,
    updateSubscriptionController,
} = require('../../controllers/usersController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

router.use(authMiddleware);

router.get('/current', ctrlWrapper(getCurrentController));

router.patch(
    '/',
    validationBody(subscriptionSchema),
    ctrlWrapper(updateSubscriptionController)
);

module.exports = router;
