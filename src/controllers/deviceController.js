/// Standard requires
const router = require('express').Router();
/// Local requires
const Validation = require('../validations/validations');
const deviceService = require('../service/deviceService');

router.post('/create', async (req, res) => {

    try {
        await Validation.deviceValidation(req.body);
        const device = await deviceService.create(req.body, req.files);
        res.status(201).json({ device });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const devices = await deviceService.getAll(req.body);
        res.status(201).json({ devices });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

router.get('/getOne', async (req, res) => {
    try {
        const device = await deviceService.getAll(req.body);
        res.status(201).json({ device });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

module.exports = router;