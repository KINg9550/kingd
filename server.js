require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");
const moderationRoutes = require("./routes/moderation");
const uploadRoutes = require("./routes/upload"); // <-- added

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// API routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/moderation", moderationRoutes);
app.use("/upload", uploadRoutes); // <-- added
app.use("/uploads", express.static("uploads")); // <-- serve uploaded files

// Socket.IO for real-time messaging
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("private_message", ({ sender, receiver, content }) => {
    io.to(receiver).emit("new_private_message", { sender, content });
  });

  socket.on("public_post", ({ sender, content }) => {
    io.emit("new_public_post", { sender, content });
  });

  socket.on("react", ({ msgId, type }) => {
    io.emit("new_reaction", { msgId, type });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
