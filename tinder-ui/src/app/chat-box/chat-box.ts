import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chat } from '../services/chat/chat';
import { NgZone } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-chat-box',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
})
export class ChatBox implements OnInit {

  @ViewChild('chatBody') chatBody!: ElementRef;

  // messages = [
  //   { text: 'Hey 👋', sender: 'me', time: '10:00' },
  //   { text: 'Hi 😊', sender: 'other', time: '10:01' }
  // ];

  // newMessage = '';
  // currentUser = 'me';
  // matchedProfile = {
  //   name: 'King',
  //   imageUrl: 'http'
  // }

  // sendMessage() {
  //   if (!this.newMessage.trim()) return;

  //   this.messages.push({
  //     text: this.newMessage,
  //     sender: 'me',
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   });

  //   this.newMessage = '';
  // }

  messages: any[] = [];
  newMessage = '';

  currentUser = '';
  matchedProfile: any;
  chatId = '';

  constructor(private chatService: Chat, private zone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('history.state:', history.state);
    this.matchedProfile = history.state.profile || {};
    this.currentUser = this.currentUser = history.state.currentUserEmail;

    console.log('matchedProfile:', this.matchedProfile);
    console.log('currentUser:', this.currentUser);

    this.chatId = this.getChatId(
      this.currentUser,
      this.matchedProfile.email
    );

    // Load old messages
    this.chatService.loadMessages(
      this.matchedProfile.email
    ).subscribe(data => {
      console.log("the messages are ***", data)
      this.messages = data;
      this.cdr.detectChanges();
    });

    // WebSocket
    this.chatService.connect(this.currentUser, (msg: any) => {

      // filter only current chat
      if (msg.chatId === this.chatId) {
        this.messages.push(msg);
        this.cdr.detectChanges();
      }
    });
  }

  

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop =
      this.chatBody.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {

    if (!this.newMessage.trim()) return;

    const msg = {
      sender: this.currentUser,
      receiver: this.matchedProfile.email,
      content: this.newMessage,
      chatId: this.chatId
    };

    this.chatService.sendMessage(msg);

    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);

  }

  getChatId(user1: string, user2: string) {
    return user1 < user2
      ? user1 + '_' + user2
      : user2 + '_' + user1;
  }

}
