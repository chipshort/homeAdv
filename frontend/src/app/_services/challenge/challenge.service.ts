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

  uploadChallengeResult(uploadedChallenge: Challenge, image: Blob) {
    console.log(uploadedChallenge);
    // TODO: finish image upload
    const req = new HttpRequest('POST', '/challenges/' + uploadedChallenge.id, image, {
      reportProgress: true
    });
    this.http.request(req).subscribe(event => {
      console.log(event);
    });

    // const formData = new FormData();
    // formData.append(‘file’, image.data, this.fileToUpload.name);
    // this.http.post(“Your end-point URL”, formData).subscribe((val) => {
    //
    //   console.log(val);
    // });

    // this.http.post('/challenge/' + uploadedChallenge.id, {})
  }

  constructor(private http: HttpClient) { }
}
