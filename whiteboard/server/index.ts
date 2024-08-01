import { createServer } from "http";
import express from "express";
import next from "next";
import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, CtxOptions } from "../common/types/socket"

const PORT = 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const app = express();
const server = createServer(app); // Create the server

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server); // Initialize socket.io with types

app.get("/room", async (_, res) => {
  res.render('_room.tsx')
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("draw", (moves: [number, number][], options: CtxOptions) => {
    console.log("drawing");
    socket.broadcast.emit("socket_draw", moves, options);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

nextApp.prepare().then(() => {
  // Handle all requests with Next.js
  app.all("*", (req, res) => nextHandler(req, res));

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
