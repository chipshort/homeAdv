import { Component, OnInit } from '@angular/core';

// import { challenge } from './challenge';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import { Challenge } from '../../challengetype';

@Component({
  selector: 'app-challenge',
  templateUrl: './dochallenge.component.html',
  styleUrls: ['./dochallenge.component.css']
})
export class DochallengeComponent implements OnInit {
  challenge: Challenge;

  constructor(private challengeService: ChallengeService) { }

  getChallenge(): void {
    this.challengeService.getChallenge().subscribe((challenge: Challenge) => this.challenge = challenge);
  }

  ngOnInit(): void {
    this.getChallenge();
  }

}
