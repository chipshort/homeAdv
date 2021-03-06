import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DemoMaterialModule } from '../material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './httpRequestInterceptor';
import { DochallengeComponent } from './_components/dochallenge/dochallenge.component';
import { ErrormessageComponent } from './_components/errormessage/errormessage.component';
import { LoginComponent } from './_components/login/login.component';
import { TakephotoComponent } from './_components/takephoto/takephoto.component';
import { TestpageComponent } from './_components/testpage/testpage.component';
import { ThanksComponent } from './_components/thanks/thanks.component';
import { VerificationComponent } from './_components/verification/verification.component';
import { AuthService } from './_services/authentification/auth.service';
import { ChallengeService } from './_services/challenge/challenge.service';
import { ChallengeServiceMock } from './_services/challenge/challenge.service.mock';
import { LeaderboardComponent } from './_components/leaderboard/leaderboard.component';
import { ChallengedoneComponent } from './_components/challengedone/challengedone.component';
import { ScorebarComponent } from './_components/scorebar/scorebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DochallengeComponent,
    TakephotoComponent,
    TestpageComponent,
    LoginComponent,
    VerificationComponent,
    ThanksComponent,
    ErrormessageComponent,
    LeaderboardComponent,
    ChallengedoneComponent,
    ScorebarComponent,
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: ChallengeService, useClass: ChallengeServiceMock },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
