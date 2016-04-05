var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.set('transports', ['websocket']);

app.use(express.static('public'));

server.listen(process.env.PORT, process.env.IP);

io.on('connection', function (socket) {
    socket.on('boing', function(data) {
        socket.broadcast.emit('boing', {
            id: socket.id,
            position : data.position,
            velocity : data.velocity
        });
    });
    socket.on('disconnect', function() {
        socket.broadcast.emit('lost-ball', {
            id : socket.id
        });
    });
});
