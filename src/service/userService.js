/// Standard requires
const bcrypt = require('bcrypt');
/// Local requires
const { User, Basket } = require('../models/models');
const Utils = require('../database/utils/utils');

class UserService {

    constructor() {

    };

    async register(params) {
        
        const { email, password, role } = params;
        const candidate = await User.findOne( { where: { email } });
        if (candidate) {
            return new Error('User with this email already exists');
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        await Basket.create({ userId: user.id });
        const token = Utils.genarateJwt(user.id, user.email, user.role);
        return token; 
    }

    async login(params) {

        const { email, password } = params;
        const user = await User.findOne({ where: { email} });
        if (! user) {
            return new Error('User is not found');
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (! comparePassword) {
            return new Error('Invalid password');
        }
        const token = Utils.genarateJwt(user.id, user.email, user.role);
        return token; 
    }
};

module.exports = new UserService();