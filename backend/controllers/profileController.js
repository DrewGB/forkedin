const Profile = require('../models/Profile');

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json("Failed to fetch profiles");
    }
}