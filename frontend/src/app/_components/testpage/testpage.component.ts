import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../challenge';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import { ScoreService } from 'src/app/_services/account/score.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
/**
 * A simple page to test some stuff, not used in production
 */
export class TestpageComponent implements OnInit {

  constructor(private challengeService: ChallengeService, private scoreService: ScoreService) { }

  public score_score: number;
  public score_rank: number;

  ngOnInit(): void {
  }

  onScoreClicked(): void {
    this.scoreService.getScore().subscribe(r => {
      this.score_score = r.score;
      this.score_rank = r.rank;
    });
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
