const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');

const app = express();

const cors = require('cors');

app.use(
    cors({
        origin: 'http://localhost:3000', // Frontend origin
    })
);
app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/auth', authRoutes);

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Connected to the database.');

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
