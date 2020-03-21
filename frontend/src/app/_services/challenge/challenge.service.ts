import {HttpClient, HttpRequest} from '@angular/common/http';

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
    return { //TODO: replace with actual call
        id: 0,
        title: 'Test',
        topic: 'test',
        image: '',
        description: 'Beschreibung'
      };
  }

  uploadChallengeResult(uploadedChallenge: Challenge, image: ImageData) {
    // TODO: upload image
    const req = new HttpRequest('POST', '/challenge/' + uploadedChallenge.id, image, {
      reportProgress: true
    });

    this.http.request(req);

    // this.http.post('/challenge/' + uploadedChallenge.id, {})

    alert(image);

  }

  constructor(private http: HttpClient) { }
}
