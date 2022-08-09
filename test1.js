const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const express = require('express');
const app = express();

app.get('/hi', (req, res) => {
    console.log(process.env.APPLICATION_DB_USER)
    console.log(process.env.POSTGRES_HOST)
    console.log(process.env.POSTGRES_DB)
    console.log(process.env.APPLICATION_DB_INITIAL_PASSWORD)
    res.send("hi from there. ");
});

function getBinding(type) {
    fs.readdirSync()

}


app.listen(8081, () => {
    console.log('listening on port 8081');
});
