const http = require('http')
const fs = require('fs')

const express = require('express');
const app = express();

const {Pool} = require('pg');

const pgBinding = require("kube-service-bindings")
let bindingInfo;

try {
    bindingInfo = pgBinding.getBinding('POSTGRESQL', 'pg-crdb')

    console.log(bindingInfo)
} catch (err) {
    console.log(err)
}

var config = {
    user: process.env.APPLICATION_DB_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.APPLICATION_DB_INITIAL_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
};

config = {
    database: 'defaultdb',
    host: 'free-tier9.gcp-us-west2.cockroachlabs.cloud',
    options: '--cluster%3Dfruit-service-db-966',
    password: 'N1X5ZCd6vYbicPRQhDNNcw',
    port: '26257',
    provider: 'CRDB',
    ssl: true,
    sslmode: 'verify-full',
    sslrootcert: '/home/myeung/mygit/todel/kube-service-bindings/bindings/crdb/root.crt',
    type: 'postgresql',
    user: 'marco'
}

app.get('/hi', (req, res) => {
    console.log(process.env.APPLICATION_DB_USER)
    console.log(process.env.POSTGRES_HOST)
    console.log(process.env.POSTGRES_DB)
    console.log(process.env.APPLICATION_DB_INITIAL_PASSWORD)
    res.send("hi from there. ");
});
app.use(express.static('public'));

app.get('/load', (req, res) => {
    (async () => {
        const connectionString = bindingInfo.connectionString
        console.log("connstr", connectionString)

        const pool2 = new Pool({connectionString});

        // Connect to database
        const client = await pool2.connect();

        client.query('select * from fruit').then(res => {
            console.log(res.rows);
            client.release();
        }).catch(e => console.error(e.stack));

        console.log("passed this point")
    })().catch((err) => console.log("err from async: " + err.stack));

// const pool = new Pool({bindingInfo.connectionString})
    // pool.connect().then(client => {
    //     console.log('connected')
    //     // promise
    //     client.query('SELECT * FROM names')
    //     .then(res => {
    //     console.log(res.rows)
    //     client.release();
    //     })
    //     .catch(e => console.error(e.stack))
    // }).catch(err => console.error('error connecting', err.stack))
    // .then(() => pool.end())
});

app.listen(8081, () => {
    console.log('listening on port 8081');
});

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'content-type': 'text/html'})
//     fs.createReadStream('index.html').pipe(res)
// });

// server.listen(process.env.PORT | 8081)
