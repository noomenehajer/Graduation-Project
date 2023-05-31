import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 } from 'uuid';
import Peer from 'peerjs';

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userId: string;
  declined?: boolean;
}

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  currentUserId: string = uuidv4();
  videos: VideoElement[] = [];
  incomingCall: any;
  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(`Initialize Peer with id ${this.currentUserId}`);
    const myPeer: Peer = new Peer(this.currentUserId, {
      host: 'localhost',
      port: 3001,
      path: '/peerjs',
      secure: false,
      debug: 3,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' },
          {
            urls: 'turn:global.turn.twilio.com:3478',
            username: 'your_username',
            credential: 'your_password'
          }
        ]

      }
    });

    this.route.params.subscribe((params) => {
      console.log('Route params:', params);
      console.log(`User ${this.currentUserId} is joining room ${params['roomId']}`);

      myPeer.on('open', (userId: string) => {
        console.log('Peer connection open. User ID:', userId);
        this.socket.emit('join-room', params['roomId'], userId);
      });
    });

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })
      .catch((err) => {
        console.error('[Error] Not able to retrieve user media:', err);
        return null;
      })
      .then((stream: MediaStream | null) => {
        if (stream) {
          this.addMyVideo(stream);
        }

        myPeer.on('call', (call: any) => {
          console.log('Receiving call...', call);
          call.answer(stream);

          call.on('stream', (otherUserVideoStream: MediaStream) => {
            console.log('Receiving other stream', otherUserVideoStream);
            this.addOtherUserVideo(call.metadata.userId, otherUserVideoStream);
          });

          call.on('error', (err: any) => {
            console.error(err);
          });
        });

        this.socket.on('user-connected', (userId: string) => {
          console.log('Receiving user-connected event', `Calling ${userId}`);

          setTimeout(() => {
            if (stream) {
              const call = myPeer.call(userId, stream, {
                metadata: { userId: this.currentUserId },
              });
              call.on('stream', (otherUserVideoStream: MediaStream) => {
                console.log('Receiving other user stream after his connection');
                this.addOtherUserVideo(userId, otherUserVideoStream);
              });

              call.on('close', () => {
                this.videos = this.videos.filter((video) => video.userId !== userId);
              });
            }
          }, 5000);
        });

        this.socket.on('user-disconnected', (userId: string) => {
          console.log(`Receiving user-disconnected event from ${userId}`);
          this.videos = this.videos.filter((video) => video.userId !== userId);
        });

        // Add all existing users' video streams to the videos array
        this.socket.on('all-users', (userIds: string[]) => {
          console.log('Receiving all-users event', userIds);
          userIds.forEach((userId) => {
            if (userId !== this.currentUserId) {
              if (stream) {
                const call = myPeer.call(userId, stream, {
                  metadata: { userId: this.currentUserId },
                });
                call.on('stream', (otherUserVideoStream: MediaStream) => {
                  console.log('Receiving other user stream after joining room');
                  this.addOtherUserVideo(userId, otherUserVideoStream);
                });

                call.on('close', () => {
                  this.videos = this.videos.filter((video) => video.userId !== userId);
                });
              }
            }
          });
        });
      });
  }

  addMyVideo(stream: MediaStream) {
    this.videos.push({
      muted: true,
      srcObject: stream,
      userId: this.currentUserId,
    });
  }

  addOtherUserVideo(userId: string, stream: MediaStream) {
    console.log('Adding video for user:', userId);
    const existingUser = this.videos.find((video) => video.userId === userId);
    if (!existingUser) {
      this.videos.push({
        muted: false,
        srcObject: stream,
        userId,
      });
      console.log('Videos array:', this.videos);
    }
  }


  onLoadedMetadata(event: Event) {
    (event.target as HTMLVideoElement).play();
  }

  toggleAudio(userId: string) {
    const videoElement = this.videos.find((video) => video.userId === userId);
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
    }
  }

  toggleVideo(userId: string) {
    const videoElement = this.videos.find((video) => video.userId === userId);
    if (videoElement && videoElement.srcObject) {
      const videoTrack = videoElement.srcObject.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
    }
  }

  declineCall(userId: string) {
    const videoElement = this.videos.find((video) => video.userId === userId);
    if (videoElement) {
      // Stop the video track
      const videoTrack = videoElement.srcObject.getVideoTracks()[0];
      videoTrack.stop();
      videoElement.declined = true;
      // Remove the video element from the videos array
      this.videos = this.videos.filter((video) => video.userId !== userId);
    }
    console.log(`Call declined for user: ${userId}`);
 this.router.navigate(['/']);
}


}


