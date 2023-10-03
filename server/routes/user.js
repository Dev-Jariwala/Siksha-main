const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authUser,
  isAdmin,
} = require("../controllers/authControllers");
const {
  userLogin,
  userRegister,
  userLogout,
  validateUsername,
  validateEmail,
  verifyNewUserEmail,
  sendOTP,
  userUpdate,
  fetchAllUsers,
  changeRole,
  userDelete,
} = require("../controllers/userController");
const nodemailer = require("nodemailer");

// User Login Route
router.post("/login", userLogin);

// User Register Route
router.post("/register", userRegister);

// User Logout Route
router.get("/logout", isAuthenticated, userLogout);

// User Authenticate Route
router.get("/authenticate", authUser);

// Fetch All Users Route
router.get("/fetch-allusers", isAdmin, fetchAllUsers);

// User name available status route
router.get("/validateUsername/:username", validateUsername);

// User email available status route
router.get("/validateEmail/:email", validateEmail);

// User update Route
router.put("/update", isAuthenticated, userUpdate);

// User change role Route
router.put("/role/:userId", isAdmin, changeRole);

// User delete role Route
router.delete("/delete/:userId", isAdmin, userDelete);

// Example verification endpoint
router.get("/sendotp", sendOTP);

module.exports = router;
