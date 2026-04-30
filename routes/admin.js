const express = require("express");
const User = require("../models/User");
const Message = require("../models/Message");
const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete user
router.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Analytics
router.get("/analytics/users", async (req, res) => {
  const count = await User.countDocuments();
  res.json({ totalUsers: count });
});

router.get("/analytics/messages", async (req, res) => {
  const count = await Message.countDocuments();
  res.json({ totalMessages: count });
});

router.get("/analytics/active", async (req, res) => {
  const since = new Date(Date.now() - 24*60*60*1000);
  const active = await Message.distinct("sender", { createdAt: { $gte: since } });
  res.json({ activeUsers: active.length });
});

module.exports = router;
