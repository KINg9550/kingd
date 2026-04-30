const express = require("express");
const User = require("../models/User");
const Message = require("../models/Message");
const router = express.Router();

// Ban user
router.put("/ban/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found
