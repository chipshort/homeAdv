import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DochallengeComponent } from './_components/dochallenge/dochallenge.component';
import { TakephotoComponent } from './_components/takephoto/takephoto.component';
import { TestpageComponent } from './_components/testpage/testpage.component';
import { LoginComponent } from './_components/login/login.component';
import { VerificationComponent } from './_components/verification/verification.component';
import { ThanksComponent } from './_components/thanks/thanks.component';
import { ChallengeService } from './_services/challenge/challenge.service';
import { LeaderboardComponent } from './_components/leaderboard/leaderboard.component';
import { ChallengedoneComponent } from './_components/challengedone/challengedone.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // in production hier DochallengeComponent
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'challenge', component: DochallengeComponent },
  { path: 'challenge/takephoto/:id', component: TakephotoComponent },
  { path: 'testpage', component: TestpageComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'challengedone', component: ChallengedoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
