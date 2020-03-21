import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ChallengeComponent} from './challenge/challenge.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'challenge', component: ChallengeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
