import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChallengeComponent } from './challenge/challenge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DemoMaterialModule} from '../material-module';
import { TakephotoComponent } from './takephoto/takephoto.component';
import { TestpageComponent } from './testpage/testpage.component';
import {HttpRequestInterceptor} from './httpRequestInterceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeComponent,
    TakephotoComponent,
    TestpageComponent,
    LoginComponent
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
