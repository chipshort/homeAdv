import { Injectable } from '@angular/core';
import {Challenge} from './challengetype';
import {challenge} from './challenge/challenge.data';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  getChallenge(): Challenge {
    return challenge; //TODO: change this to use web request
    //TODO: in an ideal world this would be Observable and updated automatically once the next challenge comes out
  }

  constructor() { }
}
