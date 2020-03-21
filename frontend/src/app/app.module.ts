import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChallengeComponent } from './_components/challenge/challenge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DemoMaterialModule} from '../material-module';
import { TakephotoComponent } from './_components/takephoto/takephoto.component';
import { TestpageComponent } from './_components/testpage/testpage.component';
import {HttpRequestInterceptor} from './httpRequestInterceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './_components/login/login.component';
import {AuthService} from './_services/authentification/auth.service';
import { SignupComponent } from './_components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeComponent,
    TakephotoComponent,
    TestpageComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
