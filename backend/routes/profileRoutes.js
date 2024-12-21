const express = require('express');
const {getAllProfiles} = require("../controllers/profileController");

const router = express.Router();

router.get('/', getAllProfiles);

module.exports = router;