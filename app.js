const server = require('http').createServer();

const io = require('socket.io')(server);

const clients = {};

io.on('connection', client => {
  client.on('reply', data => {
    if (data.event === "register") {
      if (data.myId) {
        clients[data.myId] = client;
      }

    }
    if (data.event === "send") {
      try {
        if (clients[data.to]) {
          clients[data.to].emit("event", data);
        }
      } catch (ex) {
        console.error(ex);
      }

    }
  });
  client.on('disconnect', () => { /* … */ });
});

server.listen(3100);

console.log('Server Started on Port 3100');