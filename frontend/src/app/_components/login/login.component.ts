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
    this.authService.login(loginData.username, loginData.password).subscribe(success => {
      if (success) {
        this.loginForm.reset();
        this.router.navigate(['/challenge']); // weiter zu challenge
      } else {
        // Fehlermeldung
        this.snackBar.openFromComponent(ErrormessageComponent, {
          duration: 2000,
          data: 'Fehler beim Einloggen'
        });
      }
    });
  }

  onSignup() {
    // Registrieren
    this.authService.signup(this.loginForm.get('username').value, this.loginForm.get('password').value, 0).subscribe(success => {
      if (success) {
        this.loginForm.reset();
        this.router.navigate(['/challenge']); // weiter zu challenge
      } else {
        // Fehlermeldung
        this.snackBar.openFromComponent(ErrormessageComponent, {
          duration: 2000,
          data: 'Fehler beim Registrieren'
        });
      }
    });
    this.loginForm.reset();
  }

}


