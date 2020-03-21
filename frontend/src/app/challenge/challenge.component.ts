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
    this.challengeService.getChallenge().subscribe((challenge: Challenge) => this.challenge = challenge);
  }

  ngOnInit(): void {
    this.getChallenge();
  }

}
