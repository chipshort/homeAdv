import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {TakephotoComponent} from './takephoto/takephoto.component';


const routes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'challenge', component: ChallengeComponent},
  {path: 'challenge/takephoto', component: TakephotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
