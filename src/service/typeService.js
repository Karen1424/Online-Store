/// Local requires
const { Type } = require('../models/models');

class TypeService {

    constructor() {

    };

    async create(params) {

        const { name } = req.body
        const type = await Type.create({ name })
        return type;
    }

    async getAll() {

        const types = await Type.findAll()
        return types
    }

}

module.exports = new TypeService();