import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule],
  templateUrl: './profiles.html',
  styleUrl: './profiles.css',
})
export class Profiles {

  profiles = [
    {
      name: 'Aisha', age: 24,
      bio: 'Travel ✈️ | Coffee ☕ | Fitness 💪',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      name: 'Rahul', age: 27,
      bio: 'Music 🎧 | Gym 💪 | Food 🍔',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    {
      name: 'Shweta', age: 31,
      bio: 'Music 🎧 | Gym 💪 | Food 🍔',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a49e'
    }
  ];

  index = 0;

  swipe(action: string) {
    console.log(action)
    this.index = (this.index + 1) % this.profiles.length;
  }
 
}
