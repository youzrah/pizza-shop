const express = require('express');
const router = express.Router();
// const upload = require("../utils/multer");

const { registerUser } = require('../controllers/userController');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/register', registerUser)

module.exports = router;