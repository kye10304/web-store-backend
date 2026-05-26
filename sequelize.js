const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'retailprocure',
    'retailprocure',
    'retailprocure_password',
    {
        host: 'localhost',
        port: '5433',
        dialect: 'postgres',
        logging: false
    }
)

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected successfully');
    } catch (err) {
        console.error('DB connection error:', err);
        throw err;
    }
};

module.exports = { sequelize, connectDB };