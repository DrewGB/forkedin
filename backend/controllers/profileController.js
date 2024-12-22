const Profile = require('../models/Profile');

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json("Failed to fetch profiles");
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const userId = parseInt( req.user.userId ); // Assuming the user ID is available in the `req.user` object
        const profile = await Profile.findOne({where: {userId}});

        if (!profile) {
            return res.status(404).json({message: "Profile not found"});
        }

        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({message: "Failed to fetch the profile"});
    }
}

exports.getOneProfile = async (req, res) => {
    const profileId = req.params.id

    const profile = await Profile.findByPk(profileId);
    if (!profile) {
        return res.status(404).json({message: "Profile not found"});
    }
    res.status(200).json(profile);
}

exports.createProfile = async (req, res) => {
    const userId = req.user.userId;
    const { firstName, lastName, bio, age } = req.body;
    const avatarUrl = req.file?.path;

    try {

        const existingProfile = await Profile.findOne({ where: { userId } });
        if (existingProfile) {
            return res.status(400).json({ error: "User already has a profile" });
        }

        if (!firstName || !lastName) {
            return res.status(400).json({ error: "First and last name are required" });
        }

        const profile = await Profile.create({
            userId,
            firstName,
            lastName,
            bio,
            age,
            avatarUrl: avatarUrl || null
        });

        res.status(201).json(profile);
    } catch (err) {
        console.error('Error creating profile:', err); // Log errors
        res.status(500).json({ error: "Failed to create the profile" });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        const profile = await Profile.findOne({ where: { userId } });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const updatedProfile = await profile.update(req.body);

        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error('Error updating profile:', err); // Log errors
        res.status(500).json({ error: "Failed to update the profile" });
    }
};