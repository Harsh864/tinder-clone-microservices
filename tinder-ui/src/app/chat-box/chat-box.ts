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


    // ==================================================
    // LOAD OLD MESSAGES
    // ==================================================

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


    // ==================================================
    // WEBSOCKET
    // ==================================================

    this.chatService.connect(
      this.currentUser,

      (msg: any) => {

        console.log('WebSocket message received:', msg);

        console.log('Received chatId:', msg.chatId);
        console.log('Current chatId:', this.chatId);


        // Ignore messages from another conversation
        if (msg.chatId !== this.chatId) {

          console.log('Ignoring message from another chat');

          return;
        }


        this.zone.run(() => {

          // ------------------------------------------
          // CHECK DUPLICATE
          // ------------------------------------------

          const duplicate = this.messages.some(existing => {

            // If both have database ID
            if (
              msg.id != null &&
              existing.id != null
            ) {
              return existing.id === msg.id;
            }

            // Fallback duplicate check
            return (
              existing.sender === msg.sender &&
              existing.receiver === msg.receiver &&
              existing.content === msg.content &&
              existing.timestamp === msg.timestamp
            );

          });


          // ------------------------------------------
          // ADD MESSAGE ONLY ONCE
          // ------------------------------------------

          if (!duplicate) {

            console.log('Adding WebSocket message to UI');

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


  // ==================================================
  // SEND MESSAGE
  // ==================================================

  sendMessage(): void {

    const message = this.newMessage.trim();

    if (!message) {
      return;
    }

    if (!this.currentUser || !this.matchedProfile.email) {

      console.error(
        'Cannot send message: user/profile missing'
      );

      return;
    }


    // ------------------------------------------
    // CREATE MESSAGE
    // ------------------------------------------

    const msg = {

      sender: this.currentUser,

      receiver: this.matchedProfile.email,

      content: message,

      chatId: this.chatId,

      timestamp: new Date().toISOString()

    };


    console.log('Sending message:', msg);


    // ------------------------------------------
    // DO NOT ADD MESSAGE HERE
    // ------------------------------------------
    //
    // IMPORTANT:
    // We previously had:
    //
    // this.messages = [...this.messages, msg];
    //
    // That caused the message to appear immediately.
    //
    // Then WebSocket sent the same message back,
    // causing it to appear a second time.
    //
    // Now we let WebSocket add it ONCE after
    // the backend receives/saves it.
    // ------------------------------------------


    try {

      this.chatService.sendMessage(msg);

      console.log('Message sent to WebSocket');

    } catch (error) {

      console.error(
        'Error sending message:',
        error
      );

    }


    // Clear input
    this.newMessage = '';

  }


  // ==================================================
  // CHAT ID
  // ==================================================

  getChatId(
    user1: string,
    user2: string
  ): string {

    return user1 < user2
      ? user1 + '_' + user2
      : user2 + '_' + user1;

  }


  // ==================================================
  // SCROLL
  // ==================================================

  scrollToBottom(): void {

    if (!this.chatBody) {
      return;
    }

    const element =
      this.chatBody.nativeElement;

    element.scrollTo({

      top: element.scrollHeight,

      behavior: 'smooth'

    });

  }

}