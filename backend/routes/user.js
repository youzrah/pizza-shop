const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser } = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


module.exports = router;