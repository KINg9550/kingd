const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Private chat
router.post("/private", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const msg = new Message({ sender, receiver, content });
  await msg.save();
  res.json(msg);
});

// Public post
router.post("/public", async (req, res) => {
  const { sender, content } = req.body;
  const msg = new Message({ sender, receiver: null, content });
  await msg.save();
  res.json(msg);
});

// Get public posts
router.get("/public", async (req, res) => {
  const posts = await Message.find({ receiver: null });
  res.json(posts);
});

module.exports = router;
