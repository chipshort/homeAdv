import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Score } from 'src/app/score';

@Injectable({
  providedIn: 'root'
})
/**
 * Used to the user's score
 */
export class ScoreService {

  constructor(private http: HttpClient) { }

  getScore() {
    return this.http.get<Score>('/account/score', {});
  }
}
