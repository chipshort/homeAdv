import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DochallengeComponent} from './_components/dochallenge/dochallenge.component';
import {TakephotoComponent} from './_components/takephoto/takephoto.component';
import {TestpageComponent} from './_components/testpage/testpage.component';
import {LoginComponent} from './_components/login/login.component';
import {VerificationComponent} from './_components/verification/verification.component';

const routes: Routes = [
  {path: '', component: TestpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerificationComponent},
  {path: 'challenge', component: DochallengeComponent},
  {path: 'challenge/takephoto', component: TakephotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
