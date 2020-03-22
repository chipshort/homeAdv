import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
/**
 * Used to the user's score
 */
export class ScoreService {

  constructor(private http: HttpClient) { }

  getScore() {
    const subject: Subject<number> = new Subject();

    this.http.post<number>('/account/score', {}).subscribe(
      score => {
        subject.next(score);
      },
      () => {
        subject.error(0);
      });

    return subject;
  }
}
