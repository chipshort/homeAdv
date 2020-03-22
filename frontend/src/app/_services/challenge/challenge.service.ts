import {HttpClient, HttpRequest} from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Challenge} from '../../challenge';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/internal/Subject';
import {Verification} from '../../verification';

@Injectable({
  providedIn: 'root',
})
/**
 * Used to get a new challenge for the user,
 * get a challenge to verify and upload the result of a challenge
 */
export class ChallengeService {

  getChallenge() {
    return this.http.get<Challenge>('/challenges');
  }

  getChallengeToVerify() {
    return this.http.get<Verification>('/verification');
  }

  uploadChallengeResult(challengeId: string, image: Blob) {
    // console.log('Uploading ' + challengeId);
    const req = new HttpRequest('POST', '/challenges/' + challengeId, image, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  constructor(private http: HttpClient) { }
}
