import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {ChallengeService} from '../_services/challenge/challenge.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeGuard implements CanActivate {

  constructor(private challengeService: ChallengeService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.challengeService.getChallenge().pipe(map(v => {
      return v !== null ? true : this.router.parseUrl('/challengedone');
    }));
  }

}
