require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/db");
const { Clipboard } = require("./model/clipboard.model");


// middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


const PORT = process.env.PORT || 3000;

// global variables
let clipboard = new Map();

// Routes
app.get("/api/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  if (!clipboard.has(roomId)) {
    clipboard.set(roomId, "");
  } else {
    // clipboard already has content
    // send back the content
    const tempContent = clipboard.get(roomId);
    // clipboard.delete(roomId);
    return res.send({ roomId: roomId, text: tempContent });
  }
  console.log(roomId);
  res.send({ roomId: roomId });
});

app.post("/api/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const text = req.body.text;
  clipboard.set(roomId, text);
  res.send({ roomId: roomId, text: text });
});

app.delete("/api/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  clipboard.delete(roomId);
  res.send({ roomId: roomId });
});

// Socket.io

// Socket.IO connection handling
io.on("connection", (socket) => {
    const roomId = socket.handshake.query.roomId;
    console.log("New client connected to room: " + roomId);
  
    // Join the room corresponding to the roomId
    socket.join(roomId);
  
    // If the clipboard has content for this room, send it to the newly connected client
    if (clipboard.has(roomId)) {
      const text = clipboard.get(roomId);
      socket.emit("paste", { text: text });
      console.log(`Sent 'paste' event with text: ${text} to newly connected client`);
    }
  
    socket.on("copy", (text) => {
      console.log(`Received 'copy' event with text: ${text}`);
      clipboard.set(roomId, text);
  
      // Emit a 'clipboard-updated' event to the connected sockets in the room
      socket.broadcast.to(roomId).emit("paste", { text: text });
      console.log(`Broadcasted 'paste' event with text: ${text}`);
      // io.to(roomId).emit('paste', { text: text });
  
    });
  
    // Handle socket disconnection
    socket.on("disconnect", () => {
      // Leave the room on disconnect
      console.log("Client disconnected");
      socket.leave(roomId);
    });
  });
  

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
//   connectDB()
//     .then(() => {
//       console.log(`Server is running on port ${PORT}`);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
});
