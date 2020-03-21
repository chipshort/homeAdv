import { Component, OnInit } from '@angular/core';

// import { challenge } from './challenge';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import { Challenge } from '../../challenge';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dochallenge',
  templateUrl: './dochallenge.component.html',
  styleUrls: ['./dochallenge.component.css']
})
export class DochallengeComponent implements OnInit {
  challenge: Challenge;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getChallenge().subscribe((challenge: Challenge) => this.challenge = challenge);
  }

}
