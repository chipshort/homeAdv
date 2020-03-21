import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ChallengeComponent} from './_components/challenge/challenge.component';
import {TakephotoComponent} from './_components/takephoto/takephoto.component';
import {TestpageComponent} from './_components/testpage/testpage.component';
import {LoginComponent} from './_components/login/login.component';


const routes: Routes = [
  {path: '', component: TestpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'challenge', component: ChallengeComponent},
  {path: 'challenge/takephoto', component: TakephotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
