const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust to your actual user model location

exports.login = async (req, res) => {
    console.log("Login reached")
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Must provide both email and password' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).json({ error: 'Invalid credentials' });
    }
    console.log(user)
    console.log(await user.validatePassword(password));
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );

    console.log(token)

    res.status(200).json({ message: 'User logged in successfully', token });
};
