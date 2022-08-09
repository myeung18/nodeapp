const http = require('http')
const fs = require('fs')

const express = require('express');
const app = express();

const { Pool } = require('pg');
var config = {
    user: process.env.APPLICATION_DB_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.APPLICATION_DB_INITIAL_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
};

app.get('/hi', (req, res) => {
    console.log(process.env.APPLICATION_DB_USER)
    console.log(process.env.POSTGRES_HOST)
    console.log(process.env.POSTGRES_DB)
    console.log(process.env.APPLICATION_DB_INITIAL_PASSWORD)
    res.send("hi from there. ");
});

app.use(express.static('.'));

app.get('/load', (req, res) => {
    const pool = new Pool(config)
    pool.connect().then(client => {
        console.log('connected')
        // promise
        client.query('SELECT * FROM names')
        .then(res => {
        console.log(res.rows)
        client.release();
        })
        .catch(e => console.error(e.stack))
    }).catch(err => console.error('error connecting', err.stack))
    .then(() => pool.end())
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'text/html'})
//     fs.createReadStream('index.html').pipe(res)
// });

// server.listen(process.env.PORT | 8081)
