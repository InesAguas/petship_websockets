const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
      origin: 'http://localhost:8082',
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true
    }
  });


app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('authenticate' , function (response) {
        if(response.token) {
          socket.join(response.token);
          console.log('user joined room ' + response.token);
        }   
    });

    socket.on('message', function (response) {
        if(response.id_recebe) {
          socket.to(response.id_recebe).emit('message', response);
        }
        //socket.broadcast.emit('message_emit', response)
    })
  });

server.listen(8080, () => {
  console.log('Listening on http://0.0.0.0:8080');
});

