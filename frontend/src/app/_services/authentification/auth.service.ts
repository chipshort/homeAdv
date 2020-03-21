import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';
import {ActivatedRoute, Router} from '@angular/router';
// import {AppSettingsService} from '../appSettings.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  private loggedIn = null;

  public logginStatus: Observable<boolean>;

  constructor(private http: HttpClient,
              private router: Router) {

    this.logginStatus = new Observable<boolean>((observer) => {
      if (this.loggedIn != null) {
        // LoggedIn is already checked, return value.
        // If user might be timed out, it is handled by the
        // HTTP RequestInterceptor and not here
        observer.next(this.loggedIn);
      } else {
        observer.next(false);
      }
    });
  }

  login(username: string, password: string) {
    const subject: Subject<boolean> = new Subject();
    this.clearUserData();

    this.http.post(
      '/account/login',
      {
        username,
        password
      }
    ).subscribe(
      () => {
          this.loggedIn = true;
          subject.next(true);
      },
      () => {
        subject.next(false);
      });

    return subject;
  }

  logout() {
    this.clearUserData();
    const subject: Subject<boolean> = new Subject();

    this.http.post('/account/logout', {}).subscribe(
      () => {
        this.loggedIn = false;
        subject.next(true);
      },
      () => {
        subject.next(false);
      });

    return subject;
  }

  signup(username: string, password: string, age: number) {
    const subject: Subject<boolean> = new Subject();
    this.clearUserData();

    this.http.post(
      '/account/create',
      {
        username,
        password,
        age
      }
    ).subscribe(
      () => {
        this.loggedIn = true;
        subject.next(true);
      },
      () => {
        subject.next(false);
      });

    return subject;
  }

  clearUserData() {
    this.loggedIn = false;
    document.cookie = '';
  }

  clearAndNavigateToLogin() {
    this.router.navigate(['/login']);
    this.clearUserData();
  }
}
