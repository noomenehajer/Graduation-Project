// const socket = io();

// let isAudioEnabled = true; // Flag to track audio state

// const peer = new SimplePeer({ initiator: true });

// // Get access to the user's media devices
// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//   .then((stream) => {
//     // Display the local video stream
//     const localVideo = document.getElementById('localVideo');
//     localVideo.srcObject = stream;

//     // Toggle audio tracks based on the initial state
//     toggleAudioTracks(stream);

//     // Send the local stream to the remote peer
//     peer.addStream(stream);
//   })
//   .catch((error) => {
//     console.error('Error accessing media devices:', error);
//   });

// // Handle the 'offer' event sent by the caller
// socket.on('offer', (offer) => {
//   // Process the offer and respond with an answer
//   peer.signal(offer);
// });

// // Handle the 'answer' event sent by the callee
// socket.on('answer', (answer) => {
//   // Process the answer
//   peer.signal(answer);
// });

// // Handle the 'iceCandidate' event sent by either party
// socket.on('iceCandidate', (candidate) => {
//   // Add the ICE candidate to the connection
//   peer.signal(candidate);
// });

// // Listen to signaling events from the SimplePeer connection
// peer.on('signal', (data) => {
//   // Emit the appropriate event based on the signal type
//   if (data.type === 'offer') {
//     socket.emit('offer', data);
//   } else if (data.type === 'answer') {
//     socket.emit('answer', data);
//   } else if (data.type === 'candidate') {
//     socket.emit('iceCandidate', data);
//   }
// });

// // Handle incoming stream from the remote peer
// peer.on('stream', (stream) => {
//   // Display the remote video stream
//   const remoteVideo = document.getElementById('remoteVideo');
//   remoteVideo.srcObject = stream;
// });

// // Toggle audio tracks when the audio control button is clicked
// const audioControl = document.getElementById('audioControl');
// audioControl.addEventListener('click', () => {
//   isAudioEnabled = !isAudioEnabled;
  
//   // Get the local media stream
//   const localVideo = document.getElementById('localVideo');
//   const mediaStream = localVideo.srcObject;
  
//   // Toggle audio tracks
//   toggleAudioTracks(mediaStream);
// });

// // Function to toggle audio tracks of a media stream
// function toggleAudioTracks(stream) {
//   stream.getAudioTracks().forEach((track) => {
//     track.enabled = isAudioEnabled;
//   });
// }
