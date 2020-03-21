import { Component, OnInit } from '@angular/core';

// import { challenge } from './challenge';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challengetype';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  challenge: Challenge;
  constructor(private challengeService: ChallengeService) { }

  getChallenge(): void {
    this.challenge = this.challengeService.getChallenge();
  }

  ngOnInit(): void {
    this.getChallenge();
  }

}
