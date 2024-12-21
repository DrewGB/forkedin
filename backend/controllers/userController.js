const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try{
        const user = await User.create({email, password});
        res.status(201).json({message: 'User created successfully.',
        user: { id: user.id, name: user.name, email: user.email}});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to create user.' });
    }
}

exports.updateUser = async (req, res) => {
    const { email, password } = req.body;
    const id = req.params.id;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.email = email;
        user.password = password;
        await user.save()
        res.status(200).json({message: 'User updated successfully.',
        user: { id: user.id, name: user.name, email: user.email}});
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        console.error(error);
        res.status(500).json({ error: 'Failed to update user.' });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        await user.destroy();
        res.status(200).json({message: 'User deleted successfully.'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
}
