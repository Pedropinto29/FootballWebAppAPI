const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game',{
    gameId:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true
    },
    homeTeam: {type: Sequelize.STRING, allowNull: false},
    awayTeam: {type: Sequelize.STRING, allowNull: false},
    homeScore: {type: Sequelize.INTEGER, allowNull: true},
    awayScore: {type: Sequelize.INTEGER, allowNull: true},
    // score: {type: Sequelize.STRING, allowNull: false},
    competition: {type: Sequelize.STRING, allowNull: false},
    date: {type: Sequelize.STRING, allowNull: false},
    time: {type: Sequelize.STRING, allowNull: false},
})

module.exports = Game