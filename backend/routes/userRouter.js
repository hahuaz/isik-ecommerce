const express = require("express");
const { authControl } = require("../controllers/authController");

const {
  updateUser,
  createUser,
  loginUser,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/userController");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", loginUser)
  .post("/forgot-password", forgotPassword)
  .patch("/reset-password/:resetToken", resetPassword)

  .patch("/", authControl, updateUser)
  .patch("/update-password", authControl, updatePassword)

  .get("", authControl, getUser);

module.exports = router;
