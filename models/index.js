const Sequelize = require('sequelize');
const sequelize = require('../db');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Article = require('./articlesModel');
db.Game = require('./gamesModel');
db.User = require('./userModel');

db.Article.belongsTo(db.User, {foreignKey: "userId"});
db.User.hasMany(db.Article, {foreignKey: "userId"});

module.exports = db