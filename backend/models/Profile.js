const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Profile = sequelize.define('Profile', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    bio: { type: DataTypes.TEXT },
    avatarUrl: { type: DataTypes.STRING }, // For profile pictures
});

User.hasOne(Profile, { onDelete: 'CASCADE' }); // Deleting a user removes the profile
Profile.belongsTo(User);

module.exports = Profile;