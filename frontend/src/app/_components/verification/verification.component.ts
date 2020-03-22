import { Component, OnInit } from '@angular/core';
import {Challenge} from '../../challenge';
import { ChallengeService } from '../../_services/challenge/challenge.service';
import { Verification } from '../../verification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
/**
 * The page used to verify other users' challenge results
 */
export class VerificationComponent implements OnInit {
  verification: Verification;

  constructor(private router: Router, private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.challengeService.getChallengeToVerify().subscribe((verification) => {
      this.verification = verification;
      if (verification === null) {
        this.router.navigate(['/challenge']);
      }
    });
  }

  onCorrect() {
    this.challengeService.verifyChallenge(this.verification, true).subscribe(r => this.router.navigate(['/thanks']));
  }

  onIncorrect() {
    this.challengeService.verifyChallenge(this.verification, false).subscribe(r => this.router.navigate(['/thanks']));
  }

}
