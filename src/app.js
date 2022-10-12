/// Standard requires
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload')
/// Local requires
const path = require('path');
const sequelize = require('./database/db');
const models = require('./models/models');
const userRouter = require('./controllers/userController');
const deviceRouter = require('./controllers/deviceController');
const brandRouter = require('./controllers/brandController');
const typeRouter = require('./controllers/typeController');

const app = express()
///
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

/// Routes
app.use('/api/user', userRouter);
app.use('/api/device', deviceRouter);
app.use('/api/brand', brandRouter);
app.use('api/type', typeRouter);

/// Server listening
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();

