import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerData = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    age: 0,
    gender: ''
  };

  constructor(private registerUser: Auth, private route: Router) {}

  onRegister() {
    this.registerUser.registerUser({name: this.registerData.name, email: this.registerData.email, age: this.registerData.age, gender: this.registerData.gender, password: this.registerData.password}).subscribe({
      next: (data) => {
        console.log(data);
        this.route.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      }
    });
    console.log('Register Data:', this.registerData);
  }

  get correctPassword(): boolean {
    return this.registerData.password === this.registerData.cpassword;
  }
}
