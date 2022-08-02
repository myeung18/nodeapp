const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

var config = {
    user: process.env.APPLICATION_DB_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.APPLICATION_DB_INITIAL_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
    ssl : {
        rejectUnauthorized : false,
        key: fs.readFileSync(path.resolve(__dirname, 'pg_server.key')).toString(),
        cert: fs.readFileSync(path.resolve(__dirname, 'pg_server.crt')).toString(),
    }
};

const pool = new Pool(config)
pool.connect()
  .then(client => {
    console.log('connected')
        // promise
    client.query('SELECT * FROM names')
    .then(res => {
      console.log(res.rows)
      client.release();
    })
    .catch(e => console.error(e.stack))
  })
  .catch(err => console.error('error connecting', err.stack))
  .then(() => pool.end())