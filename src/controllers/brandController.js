/// Standard requires
const router = require('express').Router();
/// Local requires
const Validation = require('../validations/validations');
const brandService = require('../service/brandService');


router.post('/create', async (req, res) => {

    try {
        const brand = await brandService.create(req.body);
        res.status(201).json({ brand });
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

module.exports = router;