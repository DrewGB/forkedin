const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Recipe = sequelize.define('Recipe', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    ingredients: { type: DataTypes.JSON }, // Array of ingredients
    steps: { type: DataTypes.JSON }, // Array of steps
    imageUrl: { type: DataTypes.STRING },
});

User.hasMany(Recipe, { onDelete: 'CASCADE' }); // A user's recipes are deleted when the user is removed
Recipe.belongsTo(User);

module.exports = Recipe;