const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user',{
    userId:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true,
    },
    username: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
    name: {type: Sequelize.STRING, allowNull: false},
    surname: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    annualPlace: {type: Sequelize.STRING, allowNull: true},
    admin: {type: Sequelize.BOOLEAN, allowNull: false},
})

module.exports = User