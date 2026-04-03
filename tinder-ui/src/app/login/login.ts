import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private loginUser: Auth, private router: Router) {}

  onLogin() {
    this.loginUser.loginUser(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        if (localStorage.getItem('token') != null)
          this.router.navigate(['/profile'])
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
