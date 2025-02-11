const express = require("express");
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile').development);
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting

    const [newUser] = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    }).returning('*');

    // respond with new user
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await knex('users').where({ email }).select('*');

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // return an Ok response with user info
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

module.exports = router;
