const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser} = require('../controllers/userController');
const { authenticate } = require('../utils/authenticate');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser)

module.exports = router;
