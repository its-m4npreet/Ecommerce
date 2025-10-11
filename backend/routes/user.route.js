const express = require("express");
const {
  register, userLogin, getUserById, updateUser, changePassword,
  getUserAddresses, createAddress, updateAddress, deleteAddress
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", userLogin);
userRouter.get("/:userId", getUserById);
userRouter.put("/:userId", updateUser);
userRouter.patch("/:userId/password", changePassword);

// Address routes
userRouter.get("/:userId/addresses", getUserAddresses);
userRouter.post("/:userId/addresses", createAddress);
userRouter.put("/:userId/addresses/:addressId", updateAddress);
userRouter.delete("/:userId/addresses/:addressId", deleteAddress);

// Public profile by username
// userRouter.get("/profile/:username", getUserProfileByUsername);

module.exports = { userRouter };

