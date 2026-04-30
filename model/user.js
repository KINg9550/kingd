const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  resetToken: String,
  resetTokenExpiry: Date,
  profile: {
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    status: { type: String, default: "Hey there! I'm kingweb." }
  }
});

module.exports = mongoose.model("User", UserSchema);
