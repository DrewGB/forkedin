const express = require('express');
const {getAllProfiles, createProfile, updateProfile, getMyProfile, getOneProfile} = require("../controllers/profileController");
const upload = require('../config/multer');
const {authenticate} = require("../utils/authenticate");

const router = express.Router();

router.get('/all', getAllProfiles);
router.get('/', authenticate, getMyProfile);
router.get('/:id', getOneProfile);
router.post('/', authenticate, upload.single('avatar'), createProfile);
router.put('/', authenticate, upload.single('avatar'), updateProfile);


module.exports = router;