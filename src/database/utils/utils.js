/// Standard requires
const jwt = require('jsonwebtoken');

class Utils {

    constructor() {

    };

    genarateJwt = (id, email, role) => {
        return jwt.sign(
            { id, email, role },
            process.env.SECRET_KEY,
        )
    };
};

module.exports = new Utils();

