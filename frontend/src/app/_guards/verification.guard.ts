import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChallengeService } from '../_services/challenge/challenge.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {

  constructor(private challengeService: ChallengeService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.challengeService.getChallengeToVerify().pipe(map(v => {
      return v !== null ? true : this.router.parseUrl('/challenge');
    }));
  }

}
