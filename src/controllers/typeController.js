/// Standard requires
const router = require('express').Router();
/// Local requires
const typeService = require('../service/typeService');

router.post('/create', async (req, res) => {

    try {
        const type = await typeService.create(req.body);
        res.status(201).json({ device });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

module.exports = router;