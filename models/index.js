const Sequelize = require('sequelize');
const sequelize = require('../db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Article = require('./articlesModel');
db.Game = require('./gamesModel');
db.User = require('./userModel');

module.exports = db