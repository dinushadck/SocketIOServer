const server = require('http').createServer();

const io = require('socket.io')(server);

const clients = {};

io.on('connection', client => {
  client.on('reply', data => { 
    if(data.event === "register"){
        clients[data.myId] = client;        

    }
      if(data.event === "send"){
          clients[data.to].emit("event", data);
      }
   });
  client.on('disconnect', () => { /* … */ });
});

server.listen(3100);