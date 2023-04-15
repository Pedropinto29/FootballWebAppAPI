const express = require('express');
const Sequelize = require('sequelize');
const router = require('./router');
const db = require('./db');

let port = process.env.port || 3000;

const app = express();
db.sync();
// db.sync({alter: true});

app.use(express.json());
app.use('/api', router);
app.listen(port, ()=>console.log("Listening to port" + port));
