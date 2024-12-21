const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Recipe = require("./Recipe");

const Like = sequelize.define('Like', {});

User.hasMany(Like, { onDelete: 'CASCADE' });
Like.belongsTo(User);

Recipe.hasMany(Like, { onDelete: 'CASCADE' });
Like.belongsTo(Recipe);

module.exports = Like;