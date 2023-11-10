const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  allUsers,
  getUserDetails,
  deleteUser,
  updateUser,
  updateProfile
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.get("/all/users", isAuthenticatedUser, allUsers);
router.get("/user/details/:id", isAuthenticatedUser, getUserDetails);
router.delete("/delete/user/:id", isAuthenticatedUser, deleteUser);
router.put("/update/user/:id", isAuthenticatedUser, updateUser);
router.put("/update/profile/:id", isAuthenticatedUser, upload.single("avatar"), updateProfile);

module.exports = router;
