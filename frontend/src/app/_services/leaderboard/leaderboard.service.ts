import { HttpClient, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { LeaderboardEntry } from 'src/app/leaderboardEntry';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {


  getLeaderboard() {
    return this.http.get<LeaderboardEntry[]>('/leaderboard');
  }


  constructor(private http: HttpClient) { }
}
