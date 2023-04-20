const express = require('express');
const Sequelize = require('sequelize');
const router = require('./router');
const db = require('./db');
var cors = require ('cors');

let port = process.env.port || 3000;

const app = express();
app.use(cors());
db.sync();
// db.sync({alter: true});

app.use(express.json());
app.use('/api', router);
app.listen(port, ()=>console.log("Listening to port" + port));
