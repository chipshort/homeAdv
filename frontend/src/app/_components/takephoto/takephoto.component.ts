import {Component, Input, OnInit} from '@angular/core';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import {Challenge} from '../../challenge';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ErrormessageComponent} from '../errormessage/errormessage.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  challengeId: string;

  constructor(private snackBar: MatSnackBar, private activatedRoute: ActivatedRoute,
              private router: Router, private challengeService: ChallengeService) { }

  public ngOnInit(): void {
    // this component gets the challenge as a parameter from the previous component
    this.activatedRoute.params.subscribe(params => {
      this.challengeId = params.id;
      console.log(this.challengeId);
    });

    navigator.mediaDevices.enumerateDevices()
      .then(md => {
        this.initVideo();
      });
  }

  async initVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: this.videoOptions});
      const video: HTMLVideoElement = document.querySelector('.camera');
      const canvas: HTMLCanvasElement = document.querySelector('.photo');
      video.srcObject = stream;
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    } catch (err) {
      // Fehlermeldung
      this.snackBar.openFromComponent(ErrormessageComponent, {
        duration: 2000,
        data: 'Fehler beim initialisieren der Kamera: ' + err,
      });
    }
  }

  takePhoto() {
    const video: HTMLVideoElement = document.querySelector('.camera');
    const canvas: HTMLCanvasElement = document.querySelector('.photo');
    const context = canvas.getContext('2d');
    video.pause();
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(base64data);
      };
      reader.readAsDataURL(blob);
      this.challengeService.uploadChallengeResult(this.challengeId, blob).subscribe(event => {
        this.router.navigate(['/verify']).then(v => location.reload()); // need to reload because of some weird display bug
      });
    }, 'image/png');
  }
}
