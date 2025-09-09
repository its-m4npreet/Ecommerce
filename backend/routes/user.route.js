const express = require("express");
const {
  register,userLogin
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", userLogin);

// Public profile by username
// userRouter.get("/profile/:username", getUserProfileByUsername);

module.exports = { userRouter };

