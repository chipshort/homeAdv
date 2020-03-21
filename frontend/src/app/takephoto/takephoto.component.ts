import {Component, Input, OnInit} from '@angular/core';
import { ChallengeService } from '../challenge.service';
import {Challenge} from '../challengetype';

@Component({
  selector: 'app-takephoto',
  templateUrl: './takephoto.component.html',
  styleUrls: ['./takephoto.component.css']
})
export class TakephotoComponent implements OnInit {
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576},
    facingMode: 'environment'
  };

  @Input() challenge: Challenge;

  constructor(private challengeService: ChallengeService) { }

  public ngOnInit(): void {
    // this.initVideo();
    navigator.mediaDevices.enumerateDevices()
      .then(md => {
        this.initVideo();
      });
  }

  async initVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: this.videoOptions});
      const video: HTMLVideoElement = document.querySelector('.camera');
      const tracks = stream.getVideoTracks();
      video.srcObject = stream;
      /* use the stream */
    } catch (err) {
      alert(err);
      /* handle the error */
    }
  }

  takePhoto() {
    const video: HTMLVideoElement = document.querySelector('.camera');
    const canvas: HTMLCanvasElement = document.querySelector('.photo');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    const result = canvas.toDataURL('image/webp');

    this.challengeService.uploadChallengeResult(this.challenge, result);
  }
}
