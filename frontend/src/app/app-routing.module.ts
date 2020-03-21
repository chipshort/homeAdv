import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ChallengeComponent} from './challenge/challenge.component';
import {TakephotoComponent} from './takephoto/takephoto.component';
import {TestpageComponent} from './testpage/testpage.component';


const routes: Routes = [
  {path: '', component: TestpageComponent},
  {path: 'challenge', component: ChallengeComponent},
  {path: 'challenge/takephoto', component: TakephotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
