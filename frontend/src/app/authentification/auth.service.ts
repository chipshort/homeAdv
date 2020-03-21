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
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.logginStatus = new Observable<boolean>((observer) => {
      if (this.loggedIn != null) {
        // LoggedIn is already checked, return value.
        // If user might be timed out, it is handled by the
        // HTTP RequestInterceptor and not here
        observer.next(this.loggedIn);
      } else {
        //
      }
    });
  }

  login(username: string, password: string) {
    const subject: Subject<boolean> = new Subject();

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
        subject.error(false);
      }
    );

    return subject;
  }

  clearUserData() {
    this.loggedIn = false;
    // this.appSettingsService.user = null;
    document.cookie = '';
  }

  clearAndNavigateToLogin() {
    this.router.navigate(['/login']);
    this.clearUserData();
  }

  private setAppSettingsData(data: {user, visibleboards, company, version, adminMenuEntries}) {
    // this.appSettingsService.user = data.user;
    // this.appSettingsService.visibleBoards = data.visibleboards;
    // this.appSettingsService.company = data.company;
    // this.appSettingsService.version = data.version;
    // this.appSettingsService.adminMenuEntries = data.adminMenuEntries;
  }
}
