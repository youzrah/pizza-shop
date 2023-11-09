const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser, loginUser, logout } = require('../controllers/userController');
// const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.post('/register', upload.single('avatar'), registerUser)
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router;