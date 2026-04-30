const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get profile
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("username profile");
  res.json(user);
});

// Update profile
router.put("/:id", async (req, res) => {
  const { avatar, bio, status } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.profile.avatar = avatar || user.profile.avatar;
  user.profile.bio = bio || user.profile.bio;
  user.profile.status = status || user.profile.status;

  await user.save();
  res.json({ message: "Profile updated", profile: user.profile });
});

module.exports = router;
