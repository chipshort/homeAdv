import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/_services/account/score.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scorebar',
  templateUrl: './scorebar.component.html',
  styleUrls: ['./scorebar.component.css']
})
export class ScorebarComponent implements OnInit {
  private scoreSubscription: Subscription;

  public dps = 0;
  public ranking = 51;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.scoreService.getScore().subscribe(s => {
      this.dps = s.score;
      this.ranking = s.rank;
    });
  }

  ngOnDestroy(): void {
    if (this.scoreSubscription)
      this.scoreSubscription.unsubscribe();
  }

}
