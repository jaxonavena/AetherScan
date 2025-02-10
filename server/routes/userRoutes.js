const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
