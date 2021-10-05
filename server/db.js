const dotenv = require('dotenv');
dotenv.config({ path: '../client/.env' });

const Pool = require("pg").Pool;
const password = process.env.POSTGRES_PW

const pool = new Pool({
    user: 'postgres',
    password: password,
    host: 'localhost',
    port: 5432,
    database: 'weatherapp'
});


module.exports = pool;