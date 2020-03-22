import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge } from '../../challenge';
import { MOCK_IMAGE } from './mock.image';
import {map} from 'rxjs/operators';
import {Verification} from '../../verification';
import {HttpEvent, HttpRequest} from '@angular/common/http';

const MOCK_CHALLENGE: Challenge = {
  id: 28,
  title: 'Der Tassenturm',
  topic: 'Stapele 5 Tassen ohne das was kaputt geht.',
  image: MOCK_IMAGE,
  description: 'Stapele 5 Tassen, ohne das was kaputt geht.',
  completed: false,
};

const MOCK_VERIFICATION: Verification = {
  completion_id: 28,
  challenge_title: 'Der Tassenturm',
  challenge_topic: 'Stapele 5 Tassen ohne das was kaputt geht.',
  submission_picture: MOCK_IMAGE,
  challenge_picture: '',
  challenge_description: 'Stapele 5 Tassen, ohne das was kaputt geht.',
};

@Injectable({
  providedIn: 'root',
})
export class ChallengeServiceMock {
  public getChallenge(): Observable<Challenge> {
    return of(MOCK_CHALLENGE);
  }

  public uploadChallengeResult(challengeId: string, image: Blob): Observable<void> {
    return of();
  }

  getChallengeToVerify(): Observable<Verification> {
    return of(MOCK_VERIFICATION);
  }

  verifyChallenge(verification: Verification, correct: boolean): Observable<HttpEvent<any>> {
    return of(null);
  }
}
