const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', // Update this with the appropriate origin(s) if needed
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers you need to allow
    credentials: true, // Set this to true if you're including cookies in cross-origin requests
  },
});
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/',
  allow_discovery: true,
});

app.use(cors());
app.use('/peerjs', peerServer);
app.use(express.static('dist'));

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', userId);
    });
  });
});


const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

