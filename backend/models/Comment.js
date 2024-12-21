const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Recipe = require("./Recipe");

const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
});

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User);

Recipe.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Recipe);

module.exports = Comment;