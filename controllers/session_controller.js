
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/user_schema");



router.get("/new", (req, res) => {
  res.status(200).json({ message: "Please log in" });
});

router.post("/", (req, res) => {
  user.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred while trying to log in. Please try again." });
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser;
          res.status(200).json({ token: "Successfully logged in", user: foundUser });
        } else {
          res.status(400).json({ error: "Invalid username or password." });
        }
      } else {
        res.status(400).json({ error: "User not found. Please create an account." });
      }
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;


