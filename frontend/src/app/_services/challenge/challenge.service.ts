import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Challenge} from '../../challengetype';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {

  getChallenge() {
    return this.http.get('/challenges');
  }

  uploadChallengeResult(uploadedChallenge: Challenge, image: ImageData) {
    //TODO: upload image

    alert(image);

  }

  constructor(private http: HttpClient) { }
}
