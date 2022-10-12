/// Local requires
const { Brand } = require('../models/models');

class BrandService {

    constructor() {

    };

    async create(params) {

        const { name } = params;
        const brand = await Brand.create({ name });
        return brand;
    }

    async getAll() {

        const brands = await Brand.findAll()
        return brands;
    }

}

module.exports = new BrandService();