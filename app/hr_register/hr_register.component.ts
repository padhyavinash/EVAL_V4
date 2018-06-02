import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './hr_register.component.html'
})
export class Hr_RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    type: 'Candidate',
    tech:''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    console.log('Inside REG 1');
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
      console.log('Inside REG 1 subscrive');
    }, (err) => {
      console.error(err);
    });
  }
}
