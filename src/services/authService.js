const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const registration = async (email, password) => {
    const user = new User({ email, password });

    await user.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error(`User with email "${email}" not found`);
        error.status = 401;
        throw error;
    }

    if (!(await bcrypt.compare(password, user.password))) {
        const error = new Error(`Wrong password`);
        error.status = 401;
        throw error;
    }

    const { _id, createdAt } = user;

    const token = jwt.sign({ _id, createdAt }, process.env.JWT_SECRET);

    return token;
};

module.exports = { registration, login };
