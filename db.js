const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    database:'footballapp',
    username : 'root',
    password : 'root', 
    dialect: 'mysql',
    host: 'localhost'
    }
);

module.exports = sequelize;