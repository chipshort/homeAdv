import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChallengeComponent } from './challenge/challenge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';

import {DemoMaterialModule} from '../material-module';
import { TakephotoComponent } from './takephoto/takephoto.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeComponent,
    TakephotoComponent
  ],
  imports: [
    DemoMaterialModule,
    FormsModule,
    BrowserModule,
    WebcamModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
