const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Profile = sequelize.define('Profile', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER},
    bio: { type: DataTypes.TEXT },
    avatarUrl: { type: DataTypes.STRING },
});

User.hasOne(Profile, { onDelete: 'CASCADE' }); // Deleting a user removes the profile
Profile.belongsTo(User);

module.exports = Profile;