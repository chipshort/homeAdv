import { TestBed } from '@angular/core/testing';

import { ChallengeGuard } from './challenge.guard';

describe('ChallengeGuard', () => {
  let guard: ChallengeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChallengeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
