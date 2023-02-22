const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user_schema");

router.get("/new", async (req, res) => {
  res.send("<SignUp />");
});

router.get("/", async (req, res) => {
  try {
    res.json(await User.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/signup", async (req, res) => {
  const randomSaltSync = Math.floor(Math.random() * 10) + 1;
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(randomSaltSync)
  );
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.json(await newUser.save());
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

