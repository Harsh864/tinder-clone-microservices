import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileForm, UserProfile } from '../services/profile-form/profile-form';

@Component({
  selector: 'app-floating-header',
  imports: [CommonModule],
  templateUrl: './floating-header.html',
  styleUrl: './floating-header.css',
})
export class FloatingHeader {

  showPanel = false;
  chats: any[] = [];
  currentUserEmail: string = '';  // store the email here

  constructor(
    private router: Router,
    private http: HttpClient,
    private profileForm: ProfileForm,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // Fetch current user from backend
    this.profileForm.getUserProfileUpdated().subscribe({
      next: (user: UserProfile & { email: string, name: string }) => {
        if (user && user.email) {
          this.currentUserEmail = user.email;
          // Now fetch chats
          this.loadChats();
        } else {
          console.warn("No user profile found, redirecting to login...");
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
        this.router.navigate(['/login']);
      }
    });
  }

  loadChats() {
    this.http.get<any[]>(`https://api-gateway-deploy-v1.onrender.com/api/chat/chats/${this.currentUserEmail}`)
      .subscribe(data => {
        console.log("Chats loaded:", data);
        this.chats = data;
      });
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showPanel = false;
    }
  }

  openChat(chat: any) {
    this.router.navigate(['/chat'], {
      state: {
        profile: {
          email: chat.otherUserEmail,
          name: chat.otherUserName,
          imageUrl: chat.otherUserImageUrl
        },
        currentUserEmail: this.currentUserEmail // pass current user email for chat
      }
    });
    this.showPanel = false;
  }

  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem("token");
  }

  get totalUnread(): number {
    return this.chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  }
}
