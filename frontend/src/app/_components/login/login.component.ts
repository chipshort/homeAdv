import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../_services/authentification/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrormessageComponent} from '../errormessage/errormessage.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }


  ngOnInit(): void {
  }

  onSubmit(loginData) {
    // Process checkout data here
    this.loginForm.reset();
    this.authService.login(loginData.username, loginData.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/challenge']);
      } else {
        this.snackBar.openFromComponent(ErrormessageComponent);
      }
    });
  }

  onSignup() {
    // Process checkout data here
    this.authService.signup(this.loginForm.get('username').value, this.loginForm.get('password').value, 0).subscribe(success => {
      if (success) {
        this.router.navigate(['/challenge']);
      } else {
        //TODO: show error
      }
    });
    this.loginForm.reset();
  }

}


