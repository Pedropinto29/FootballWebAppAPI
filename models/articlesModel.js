const Sequelize = require('sequelize')
const db = require('../db.js')

const Article = db.define('article',{
    articleId:{
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {type: Sequelize.STRING, allowNull: false},
    subtitle: {type: Sequelize.STRING, allowNull: false},
    body : {type: Sequelize.STRING, allowNull: false},
})

module.exports = Article