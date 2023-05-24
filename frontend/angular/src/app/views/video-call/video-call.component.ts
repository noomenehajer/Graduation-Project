import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
//import { io, Socket } from 'socket.io-client';

 // package.json : //
/*"simple-peer": "^16.1.0",
"socket.io-client": "^4.3.2", */

// import SimplePeer from 'simple-peer';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent  {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  // private socket: Socket| undefined;;
  // private isAudioEnabled = true;
  // private peer: SimplePeer.Instance;

  // ngOnInit() {
  //   this.socket = io();

  //   this.peer = new SimplePeer({ initiator: true });

  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       const localVideoElement = this.localVideo.nativeElement;
  //       localVideoElement.srcObject = stream;
  //       this.toggleAudioTracks(stream);
  //       this.peer.addStream(stream);
  //     })
  //     .catch((error) => {
  //       console.error('Error accessing media devices:', error);
  //     });

  //   this.socket.on('offer', (offer) => {
  //     this.peer.signal(offer);
  //   });

  //   this.socket.on('answer', (answer) => {
  //     this.peer.signal(answer);
  //   });

  //   this.socket.on('iceCandidate', (candidate) => {
  //     this.peer.signal(candidate);
  //   });

  //   this.peer.on('signal', (data) => {
  //     if (data.type === 'offer') {
  //       this.socket.emit('offer', data);
  //     } else if (data.type === 'answer') {
  //       this.socket.emit('answer', data);
  //     } else if (data.type === 'candidate') {
  //       this.socket.emit('iceCandidate', data);
  //     }
  //   });

  //   this.peer.on('stream', (stream) => {
  //     const remoteVideoElement = this.remoteVideo.nativeElement;
  //     remoteVideoElement.srcObject = stream;
  //   });
  // }

  // toggleAudio() {
  //   this.isAudioEnabled = !this.isAudioEnabled;
  //   const localVideoElement = this.localVideo.nativeElement;
  //   const mediaStream = localVideoElement.srcObject;
  //   this.toggleAudioTracks(mediaStream);
  // }

  // toggleAudioTracks(stream: MediaStream) {
  //   stream.getAudioTracks().forEach((track) => {
  //     track.enabled = this.isAudioEnabled;
  //   });
  // }
}
