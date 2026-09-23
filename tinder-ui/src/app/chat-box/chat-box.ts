import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chat } from '../services/chat/chat';

@Component({
  selector: 'app-chat-box',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
})
export class ChatBox implements OnInit {

  @ViewChild('chatBody') chatBody!: ElementRef;

  messages: any[] = [];
  newMessage = '';

  currentUser = '';
  matchedProfile: any = {};
  chatId = '';

  constructor(
    private chatService: Chat,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('history.state:', history.state);

    this.matchedProfile = history.state.profile || {};
    this.currentUser = history.state.currentUserEmail || '';

    console.log('matchedProfile:', this.matchedProfile);
    console.log('currentUser:', this.currentUser);

    if (!this.currentUser || !this.matchedProfile.email) {
      console.error('User or matched profile is missing');
      return;
    }

    // Create deterministic chat ID
    this.chatId = this.getChatId(
      this.currentUser,
      this.matchedProfile.email
    );

    console.log('Current chatId:', this.chatId);

    // --------------------------------------------------
    // LOAD OLD MESSAGES
    // --------------------------------------------------

    this.chatService
      .loadMessages(this.matchedProfile.email)
      .subscribe({
        next: (data: any[]) => {

          console.log('Old messages:', data);

          this.zone.run(() => {

            this.messages = data || [];

            this.cdr.detectChanges();

            setTimeout(() => {
              this.scrollToBottom();
            }, 100);
          });
        },

        error: (error) => {
          console.error('Error loading messages:', error);
        }
      });


    // --------------------------------------------------
    // WEBSOCKET
    // --------------------------------------------------

    this.chatService.connect(
      this.currentUser,
      (msg: any) => {

        console.log('WebSocket message received:', msg);
        console.log('Received chatId:', msg.chatId);
        console.log('Current chatId:', this.chatId);

        // Ignore messages belonging to another conversation
        if (msg.chatId !== this.chatId) {
          console.log('Ignoring message from another chat');
          return;
        }

        this.zone.run(() => {

          /*
           * Avoid duplicate messages.
           *
           * If the backend echoes the message back to the
           * sender, we don't want to add it twice because
           * sendMessage() already adds it locally.
           */
          const duplicate = this.messages.some(existing => {

            if (
              msg.id != null &&
              existing.id != null
            ) {
              return existing.id === msg.id;
            }

            return (
              existing.sender === msg.sender &&
              existing.receiver === msg.receiver &&
              existing.content === msg.content &&
              existing.timestamp === msg.timestamp
            );
          });

          if (!duplicate) {

            console.log('Adding WebSocket message to UI');

            /*
             * Immutable update instead of push().
             * This makes Angular change detection more reliable.
             */
            this.messages = [
              ...this.messages,
              msg
            ];

            this.cdr.detectChanges();

            setTimeout(() => {
              this.scrollToBottom();
            }, 50);

          } else {

            console.log('Duplicate message ignored');

          }

        });

      }
    );
  }


  // --------------------------------------------------
  // SEND MESSAGE
  // --------------------------------------------------

  sendMessage(): void {

    const message = this.newMessage.trim();

    if (!message) {
      return;
    }

    if (!this.currentUser || !this.matchedProfile.email) {
      console.error('Cannot send message: user/profile missing');
      return;
    }

    const msg = {
      sender: this.currentUser,
      receiver: this.matchedProfile.email,
      content: message,
      chatId: this.chatId,

      /*
       * This is only for local UI purposes.
       * Your backend can replace this with its own timestamp.
       */
      timestamp: new Date().toISOString()
    };

    console.log('Sending message:', msg);

    // --------------------------------------------------
    // IMMEDIATELY SHOW MESSAGE IN UI
    // --------------------------------------------------

    this.messages = [
      ...this.messages,
      msg
    ];

    this.cdr.detectChanges();

    setTimeout(() => {
      this.scrollToBottom();
    }, 50);

    // --------------------------------------------------
    // SEND TO BACKEND
    // --------------------------------------------------

    try {

      this.chatService.sendMessage(msg);

      console.log('Message sent to WebSocket');

    } catch (error) {

      console.error('Error sending message:', error);

      /*
       * If sending fails, remove the locally added message.
       */
      this.messages = this.messages.filter(
        m => m !== msg
      );

      this.cdr.detectChanges();

    }

    // Clear input
    this.newMessage = '';
  }


  // --------------------------------------------------
  // CHAT ID
  // --------------------------------------------------

  getChatId(user1: string, user2: string): string {

    return user1 < user2
      ? user1 + '_' + user2
      : user2 + '_' + user1;
  }


  // --------------------------------------------------
  // SCROLL
  // --------------------------------------------------

  scrollToBottom(): void {

    if (!this.chatBody) {
      return;
    }

    const element = this.chatBody.nativeElement;

    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
  }
}
