const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  members: [String],
  messages: [{ sender: String, content: String, createdAt: Date }]
});

module.exports = mongoose.model("Group", GroupSchema);
