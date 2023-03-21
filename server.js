const express = require('express');
const routes = require('./Routes/router');

let port = process.env.port || 3000;

const app = express()

app.use('/api', routes);
app.use(express.json);
app.listen(port, ()=>console.log("Listening to port" + port));
