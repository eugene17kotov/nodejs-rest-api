const { getCurrent } = require('../services/usersService');

const { unauthorizedError } = require('../helpers/errors');

const getCurrentController = async (req, res) => {
    const { _id: userId } = req.user;

    const user = await getCurrent(userId);

    if (!user) throw unauthorizedError;

    const { email, subscription } = user;

    res.status(200).json({ email, subscription });
};

module.exports = { getCurrentController };
