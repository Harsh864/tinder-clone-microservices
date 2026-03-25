import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProfileForm } from '../services/profile-form/profile-form';
import { Router } from '@angular/router';
import { AllProfiles, Profile } from '../services/profile/profile';
import { Matches } from '../services/matches/matches';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css',
})
export class Profiles implements OnInit {

  constructor(private profileForm: ProfileForm, private router: Router, private profileService: Profile, private cdr: ChangeDetectorRef, private matches: Matches) { }

  currentUser = {
    name: "",
    age: 0,
    bio: "",
    imageUrl: "",
    email: ""
  }
  
  profiles: AllProfiles[] = [
    // {
    //   id: 1,
    //   name: 'Aisha', age: 24,
    //   bio: 'Travel ✈️ | Coffee ☕ | Fitness 💪',
    //   image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    // },
    // {
    //   id: 21,
    //   name: 'Rahul', age: 27,
    //   bio: 'Music 🎧 | Gym 💪 | Food 🍔',
    //   image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    // },
    // {
    //   id: 3,
    //   name: 'Shweta', age: 31,
    //   bio: 'Music 🎧 | Gym 💪 | Food 🍔',
    //   image: 'https://images.unsplash.com/photo-1603023435989-832d6652e246?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // }
  ];

  index = 0;
  isMatch = false;
  matchedProfile: any;
  // currentUserImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

  ngOnInit(): void {
    this.loadAllProfile();
    this.getUserProfileUpdate();
  }

  swipe(action: string, id: string, image: string, name: string) {

    const email: string = localStorage.getItem('user') ?? '';
    console.log(action)
    const currentProfile = this.profiles[this.index];

    this.matches.swipeUser(email, id, action).subscribe({
      next: (data) => {

        if (data === true) {
          this.isMatch = true;
          this.matchedProfile = {name: name, imageUrl: image};
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
    const email: string = localStorage.getItem('user') ?? '';
    this.profileForm.getUserProfileUpdated(email).subscribe({
      next: (data) => {
        console.log(data)
        if (data === null || data === 'null')
          this.router.navigate(["/update"]);
        this.currentUser = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  loadAllProfile() {
    this.profileService.getAllProfile().subscribe({
      next: (data: AllProfiles[]) => {
        this.profiles = [...data];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  closeMatch() {
    this.isMatch = false;
    this.nextProfile();
  }

  nextProfile() {
    this.index = (this.index + 1) % this.profiles.length;
    this.cdr.detectChanges();
  }

}
