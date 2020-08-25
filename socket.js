const socket = require('socket.io')
let io;

exports.setServerIO = (server) => {
  return io = server ? socket(server) : null
}

exports.sendDataBodyListener = (data) => {
  io.on("connection", socket => {
    socket.on("initial_data", () => {
      io.emit("get_data", data);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}


