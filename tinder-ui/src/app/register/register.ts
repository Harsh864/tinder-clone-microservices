import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
    age: '',
    gender: ''
  };

  onRegister() {
    console.log('Register Data:', this.registerData);
  }

  get correctPassword(): boolean {
    return this.registerData.password === this.registerData.cpassword;
  }
}
