import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/app/_services/leaderboard/leaderboard.service';
import { Subscription } from 'rxjs';
import { LeaderboardEntry } from 'src/app/leaderboardEntry';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  private serviceSubscription: Subscription;

  public leaderboard: LeaderboardEntry[];


  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.serviceSubscription = this.leaderboardService
      .getLeaderboard()
      .subscribe(entries => this.leaderboard = entries);
  }

  ngOnDestroy() {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

}
