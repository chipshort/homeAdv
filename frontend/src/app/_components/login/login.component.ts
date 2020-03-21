import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../_services/authentification/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
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
        //TODO: show error!
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
