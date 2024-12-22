const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust to your actual user model location

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Must provide both email and password' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,    // Makes the cookie inaccessible via JavaScript
        secure: process.env.NODE_ENV === 'production',  // Only sends cookie over HTTPS in production
        sameSite: 'Strict',  // Helps prevent CSRF attacks
        maxAge: 3600000,    // 1 hour expiration
    });

    res.json({ message: 'User logged in successfully' });
};
