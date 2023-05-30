// require('dotenv').config();
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const SimplePeer = require('simple-peer');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Serve the client-side files
// app.use(express.static('public'));

// // Socket.IO connection handler
// io.on('connection', (socket) => {
//   console.log('New user connected:', socket.id);

//   // Create a new SimplePeer instance for the participant
//   const peer = new SimplePeer({ initiator: false });

//   // Handle the 'offer' event sent by the caller
//   socket.on('offer', (offer) => {
//     // Process the offer and respond with an answer
//     peer.signal(offer);
//   });

//   // Handle the 'answer' event sent by the callee
//   socket.on('answer', (answer) => {
//     // Process the answer
//     peer.signal(answer);
//   });

//   // Handle the 'iceCandidate' event sent by either party
//   socket.on('iceCandidate', (candidate) => {
//     // Add the ICE candidate to the connection
//     peer.signal(candidate);
//   });

//   // Listen to signaling events from the SimplePeer connection
//   peer.on('signal', (data) => {
//     // Emit the appropriate event based on the signal type
//     if (data.type === 'offer') {
//       socket.emit('offer', data);
//     } else if (data.type === 'answer') {
//       socket.emit('answer', data);
//     } else if (data.type === 'candidate') {
//       socket.emit('iceCandidate', data);
//     }
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     // Destroy the SimplePeer instance on disconnection
//     peer.destroy();
//   });
// });

// // Start the server
// const port = process.env.PORT || 3001;
// server.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
