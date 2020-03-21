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

  uploadChallengeResult(uploadedChallenge: Challenge, image: Blob) {
    console.log(uploadedChallenge);
    // TODO: upload image
    const req = new HttpRequest('POST', '/challenge/' + uploadedChallenge.id, image, {
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
