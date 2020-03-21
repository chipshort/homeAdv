import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Challenge} from '../../challenge';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {

  getChallenge() {
    return this.http.get<Challenge>('/challenges');
  }

  getChallangeToVerify(): Challenge {
    // const subject: Subject<Challenge> = new Subject();
    //
    // subject.next({
    //   title: 'Test',
    //   categories: ['test'],
    //   image: '',
    //   description: 'Beschreibung'
    // });
    //
    // return subject;
    return {
        title: 'Test',
        categories: ['test'],
        image: '',
        description: 'Beschreibung'
      };
  }

  uploadChallengeResult(uploadedChallenge: Challenge, image: ImageData) {
    // TODO: upload image

    alert(image);

  }

  constructor(private http: HttpClient) { }
}
