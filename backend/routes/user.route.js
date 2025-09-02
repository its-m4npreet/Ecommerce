const express =require(express);

const { userModel } = require("../models/user.model");

const userRoute=express.Router();

userRoute.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new userModel(req.body);
    // await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

module.exports = { userRoute };
