const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Recipe = require("./Recipe");

const Share = sequelize.define('Share', {
    platform: { type: DataTypes.STRING }, // e.g., 'Facebook', 'Twitter'
});

User.hasMany(Share, { onDelete: 'CASCADE' });
Share.belongsTo(User);

Recipe.hasMany(Share, { onDelete: 'CASCADE' });
Share.belongsTo(Recipe);

module.exports = Share;