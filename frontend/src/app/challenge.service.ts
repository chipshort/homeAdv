import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Challenge} from './challengetype';
import {challenge} from './challenge/challenge.data';
import {Observable} from 'rxjs';

@Injectable()
export class ChallengeService {

  getChallenge() {
    return this.http.post(
      '/',
      {}
    );
  }

  uploadChallengeResult(uploadedChallenge: Challenge, image: ImageData) {
    //TODO: upload image

    alert(image);
  }

  constructor(private http: HttpClient) { }
}
