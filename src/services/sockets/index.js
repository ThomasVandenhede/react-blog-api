import { ChatMessage } from "../../api/chat";

export const socketEvents = io => (socket, next) => {
  console.log(`Connexion établie avec l'ID: ${socket.id}`);

  socket.on("connected", username => {
    socket.username = username;
    io.emit(
      "connectedUsers",
      Object.values(io.sockets.sockets).map(e => e.username)
    );
  });

  socket.on("disconnect", () => {
    io.emit(
      "connectedUsers",
      Object.values(io.sockets.sockets).map(e => e.username)
    );
  });

  socket.on("chat", async message => {
    console.log("TCL: message", message);
    const chatMessage = await new ChatMessage(message).save();
    io.emit("chat", chatMessage);
  });

  return next();
};
