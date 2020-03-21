import { Component, OnInit } from '@angular/core';
import {Challenge} from '../../challenge';
import {ChallengeService} from '../../_services/challenge/challenge.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  challenge: Challenge;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit(): void {
    // this.challengeService.getChallangeToVerify().subscribe((challenge: Challenge) => this.challenge = challenge);
    this.challenge = this.challengeService.getChallangeToVerify();
  }

}
