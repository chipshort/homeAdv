import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Challenge } from '../../challenge';
import { ChallengeService } from '../../_services/challenge/challenge.service';

@Component({
  selector: 'app-dochallenge',
  templateUrl: './dochallenge.component.html',
  styleUrls: ['./dochallenge.component.css'],
})
export class DochallengeComponent implements OnInit, OnDestroy {
  private challengeServiceSubscription: Subscription;

  public challenge: Challenge;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit() {
    this.challengeServiceSubscription = this.challengeService
      .getChallenge()
      .subscribe((challenge: Challenge) => (this.challenge = challenge));
  }

  ngOnDestroy() {
    // Don't forget to unsubscribe from subscriptions (or use Observable directly and | async Pipe in the template)
    if (this.challengeServiceSubscription) {
      this.challengeServiceSubscription.unsubscribe();
    }
  }
}
