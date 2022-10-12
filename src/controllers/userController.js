/// Standard requires
const router = require('express').Router();
/// Local requires
const userService = require('../service/userService');
const Validation = require('../validations/validations');


router.post('/register', async (req, res) => {

    try {
        await Validation.registerValidation(req.body);
        const accsessToken = await userService.register(req.body);
        res.status(200).json({ accsessToken });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

router.post('/login', async (req, res) => {

    try {
        await Validation.loginValidation(req.body);
        const accsessToken = await userService.login(req.body);
        res.status(200).json({ accsessToken });
    } catch (err) {
        res.status(400).json({ Error: err.message });
    }
});

module.exports = router;