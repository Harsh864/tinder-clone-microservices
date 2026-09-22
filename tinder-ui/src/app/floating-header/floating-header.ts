import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-header',
  imports: [CommonModule],
  templateUrl: './floating-header.html',
  styleUrl: './floating-header.css',
})
export class FloatingHeader {

  showPanel = false;
  chats: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      this.http
        .get<any[]>(`http://localhost:8085/api/chat/chats/${currentUser}`)
        .subscribe(data => {
          console.log('the messages are ', data);
          this.chats = data;
        });
    }
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
  }

  // Detect clicks anywhere on the page
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as HTMLElement;

    // If click is inside the floating chat box or FAB,
    // don't close the panel
    if (target.closest('.floating-container')) {
      return;
    }

    // Clicked somewhere outside
    this.showPanel = false;
  }

  openChat(chat: any) {

    this.router.navigate(['/chat'], {
      state: {
        profile: {
          email: chat.otherUserEmail,
          name: chat.otherUserName,
          imageUrl: chat.otherUserImageUrl
        }
      }
    });

    this.showPanel = false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get totalUnread(): number {
    return this.chats.reduce(
      (sum, c) => sum + (c.unreadCount || 0),
      0
    );
  }
}