const User = require('../models/user');

const getCurrent = async userId => {
    const user = await User.findById(userId).catch(() => {
        return null;
    });

    return user;
};

module.exports = { getCurrent };
