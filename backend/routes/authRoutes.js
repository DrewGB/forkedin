const express = require('express');
const { login } = require('../controllers/authController');
const authenticate = require('../utils/authenticate');
const router = express.Router();

router.post('/login', login);

