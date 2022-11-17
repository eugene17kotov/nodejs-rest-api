const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const { tokenType, token } = req.headers['autorization'].split(' ');

    if (!token) {
        next({
            status: 401,
            message: `Please, provide a token`,
        });
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next({
            status: 401,
            message: `Invalid token`,
        });
    }
};

module.exports = { authMiddleware };

// if (!user) {
//     const error = new Error(`User with email "${email}" not found`);
//     error.status = 401;
//     throw error;
// }
