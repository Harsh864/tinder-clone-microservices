import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileForm as ProfileFormService } from '../services/profile-form/profile-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {

  constructor(private profileForm: ProfileFormService, private router: Router) {}

  profile = {
    bio: '',
    interests: '',
    imageUrl: ''
  }

  saveProfile() {
    console.log(this.profile)
    // const email: string = localStorage.getItem('user') ?? '';
    this.profileForm.updateUserProfile({bio: this.profile.bio, interests: this.profile.interests, imageUrl: this.profile.imageUrl}).subscribe({
      next: (data) => {
        this.router.navigate(["/profile"]);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
