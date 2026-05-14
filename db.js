const { Pool } = require('pg');

const pool = new Pool({
    user: 'retailprocure',
    password: 'retailprocure_password',
    host: 'localhost',
    port: '5433',
    database: 'retailprocure',
});

module.exports = pool;
