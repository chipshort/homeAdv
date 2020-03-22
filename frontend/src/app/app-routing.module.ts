import { NgModule } from '@angular/core';
import { DochallengeComponent } from './_components/dochallenge/dochallenge.component';
import { TakephotoComponent } from './_components/takephoto/takephoto.component';
import { TestpageComponent } from './_components/testpage/testpage.component';
import { LoginComponent } from './_components/login/login.component';
import { VerificationComponent } from './_components/verification/verification.component';
import { ThanksComponent } from './_components/thanks/thanks.component';
import { ChallengeService } from './_services/challenge/challenge.service';
import { LeaderboardComponent } from './_components/leaderboard/leaderboard.component';
import { ChallengedoneComponent } from './_components/challengedone/challengedone.component';
import { RouterModule, Routes } from '@angular/router';
import { VerificationGuard } from './_guards/verification.guard';
import { ChallengeGuard } from './_guards/challenge.guard';

const routes: Routes = [
  { path: '', component: LoginComponent }, // in production hier DochallengeComponent
  { path: 'login', component: LoginComponent },
  { path: 'verify', canActivate: [VerificationGuard], component: VerificationComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'challenge', canActivate: [ChallengeGuard], component: DochallengeComponent },
  { path: 'challenge/takephoto/:id', component: TakephotoComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'challengedone', component: ChallengedoneComponent },
  // { path: 'testpage', component: TestpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
