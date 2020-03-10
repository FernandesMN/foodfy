const { Pool } = require('pg');

module.exports = new Pool({
    user: 'matheus',
    password: '21fal@çia19',
    host: 'localhost',
    port: '5432',
    database: 'foodfy'
});