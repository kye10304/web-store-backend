require('../config/env');
require('../models');
const {sequelize} = require('../../sequelize.js');

beforeAll(async () => {
    await sequelize.sync({force: true})
});

afterAll(async () => {
    await sequelize.close()
})

