import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileForm } from '../services/profile-form/profile-form';
import { Router } from '@angular/router';
import { AllProfiles, Profile } from '../services/profile/profile';
import { Matches } from '../services/matches/matches';
import { FloatingHeader } from '../floating-header/floating-header';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, FloatingHeader],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css',
})
export class Profiles implements OnInit {

  constructor(
    private profileForm: ProfileForm,
    private router: Router,
    private profileService: Profile,
    private cdr: ChangeDetectorRef,
    private matches: Matches
  ) { }

  currentUser = {
    name: '',
    age: 0,
    bio: '',
    imageUrl: '',
    email: ''
  };

  profiles: AllProfiles[] = [];
  index = 0;
  isMatch = false;
  matchedProfile: any;
  email: string = '';  

  ngOnInit(): void {
    this.email = localStorage.getItem('user') ?? ''; 
    this.getUserProfileUpdate();  
  }

  swipe(action: string, id: string, image: string, name: string) {
    console.log(action);
    const currentProfile = this.profiles[this.index];

    this.matches.swipeUser(this.email, id, action).subscribe({  
      next: (data) => {
        if (data === true) {
          this.isMatch = true;
          this.matchedProfile = currentProfile;
          this.cdr.detectChanges();
        } else {
          this.nextProfile();
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getUserProfileUpdate(): void {
    console.log('1. fetching user profile for:', this.email);
    this.profileForm.getUserProfileUpdated(this.email).subscribe({
      next: (data) => {
        console.log('2. user profile received:', data);
        if (data === null || data === 'null') {
          this.router.navigate(['/update']);
          return;
        }
        this.currentUser = data;
        console.log('3. currentUser.email is:', this.currentUser.email);
        this.loadAllProfile();
      },
      error: (error) => {
        console.log('getUserProfileUpdate ERROR:', error);
      }
    });
  }

  loadAllProfile() {
    console.log('4. loading profiles for email:', this.currentUser.email);
    this.profileService.getAllProfile(this.currentUser.email).subscribe({
      next: (data: AllProfiles[]) => {
        console.log('5. profiles received:', data);
        this.profiles = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('loadAllProfile ERROR:', error);
      }
    });
  }

  closeMatch() {
    this.isMatch = false;
    this.nextProfile();
  }

  nextProfile() {
    if (this.profiles.length === 0) return;
    this.index = (this.index + 1) % this.profiles.length;
    this.cdr.detectChanges();
  }

  openChat() {
    localStorage.setItem('matchedProfile', JSON.stringify(this.matchedProfile));
    this.router.navigate(['/chat'], {
      state: { profile: this.matchedProfile }
    });
  }
}