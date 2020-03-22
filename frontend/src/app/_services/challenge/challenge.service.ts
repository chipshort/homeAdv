import {HttpClient, HttpRequest} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Challenge } from '../../challenge';
import { Verification } from '../../verification';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
/**
 * Used to get a new challenge for the user,
 * get a challenge to verify and upload the result of a challenge
 */
export class ChallengeService {

  getChallenge() {
    return this.http.get<Challenge>('/challenges').pipe(map(c => c.completed ? null : c));
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
