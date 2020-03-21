import {Component, Input, OnInit} from '@angular/core';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import {Challenge} from '../../challenge';

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
      // if (err instanceof )
      alert(err);
      /* TODO: handle the error */
    }
  }

  takePhoto() {
    const video: HTMLVideoElement = document.querySelector('.camera');
    const canvas: HTMLCanvasElement = document.querySelector('.photo');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    const result = context.getImageData(0, 0, canvas.width, canvas.height); //canvas.toDataURL('image/png');

    this.challengeService.uploadChallengeResult(this.challenge, result);
  }
}
