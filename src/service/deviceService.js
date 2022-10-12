/// Standard requires
const uuid = require('uuid');
const path = require('path');
/// Local requires
const { Device, DeviceInfo } = require('../models/models');

class DeviceService {

    constructor() {

    };

    async create(params, img) {

        let { name, price, brandId, typeId, info} = params;
        let fileName = uuid.v4() + ".jpg";
        img.img.mv(path.resolve(__dirname, '..', 'static', fileName));
        console.log(fileName);
        const device = await Device.create({ name, price, brandId, typeId, img: fileName });
        if (info) {
            info = JSON.parse(info);
            info.forEach(element => {
                DeviceInfo.create({
                    title: element.title,
                    description: element.description,
                    deviceId: element.deviceId
                });
            });
        }
        return device;
    }

    async getAll(params) {

        let { brandId, typeId, limit, page } = params;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return devices;
    }

    async getOne(params) {

        const { id } = params;
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return device;
    }
};

module.exports = new DeviceService();