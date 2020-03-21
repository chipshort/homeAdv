import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge } from '../../challenge';
import { MOCK_IMAGE } from './mock.image';

const MOCK_CHALLENGE: Challenge = {
  id: 28,
  title: 'Der Tassenturm',
  topic: '?',
  image: MOCK_IMAGE,
  description: 'Stapele 5 Tassen ohne, dass etwas kaputt geht',
};

@Injectable({
  providedIn: 'root',
})
export class ChallengeServiceMock {
  public getChallenge(): Observable<Challenge> {
    return of(MOCK_CHALLENGE);
  }

  public uploadChallengeResult(uploadedChallenge: Challenge, image: Blob): Observable<void> {
    return of();
  }
}
