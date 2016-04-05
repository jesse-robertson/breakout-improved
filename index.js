var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Define socket event constants
var BOUNCE_EVENT     = 'boing',
    LOSS_EVENT       = 'lost-ball',
    DISCONNECT_EVENT = 'disconnect';

// Make socket.io default to websockets
io.set('transports', ['websocket']);

// Serve public/ folder as static assets
app.use(express.static('public'));

// Start express server
server.listen(process.env.PORT, process.env.IP);

// Respond to incoming socket connections and data
io.on('connection', function (socket) {
    
    // When a client sends a bounce event...
    socket.on(BOUNCE_EVENT, function(data) {
        
        // ...broadcast the event to the other players
        socket.broadcast.emit(BOUNCE_EVENT, {
            id: socket.id,
            position : data.position,
            velocity : data.velocity
        });
    });
    
    // When a client disconnects...
    socket.on(DISCONNECT_EVENT, function() {
        
        // ...broadcast a loss event to the other players 
        socket.broadcast.emit(LOSS_EVENT, {
            id : socket.id
        });
    });
});
