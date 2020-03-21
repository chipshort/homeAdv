import {Component, Input, OnInit} from '@angular/core';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import {Challenge} from '../../challenge';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

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

  challenge: Challenge;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private challengeService: ChallengeService) { }

  public ngOnInit(): void {
    this.challenge = window.history.state;

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

    // const result = context.getImageData(0, 0, canvas.width, canvas.height); // canvas.toDataURL('image/png');
    canvas.toBlob(blob => {
      this.challengeService.uploadChallengeResult(this.challenge, blob);
      this.router.navigate(['/verify']);
    }, 'image/png');
  }
}
