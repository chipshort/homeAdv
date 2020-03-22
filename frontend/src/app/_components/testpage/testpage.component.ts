import { Component, OnInit } from '@angular/core';
import {Challenge} from '../../challenge';
import {ChallengeService} from '../../_services/challenge/challenge.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
/**
 * A simple page to test some stuff, not used in production
 */
export class TestpageComponent implements OnInit {

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
  }

  onTestClicked() {
    // @ts-ignore
    const canvas: HTMLCanvasElement = document.getElementById('testcanvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'green';
    ctx.fillRect(10, 10, 10, 10);

    canvas.toBlob(blob => {
      this.challengeService.getChallenge().subscribe(challenge => {
        this.challengeService.uploadChallengeResult(challenge.id + '', blob);
      });
    });
  }

}
