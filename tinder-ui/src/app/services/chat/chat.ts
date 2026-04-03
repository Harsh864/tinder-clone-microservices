import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({ providedIn: 'root' })
export class Chat {

  constructor(private http: HttpClient) { }

  stompClient!: Client;

  connect(userId: string, onMessage: any) {

    this.stompClient = new Client({
      brokerURL: 'ws://localhost:9000/chat',

      connectHeaders: {
        user: userId
      },

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('STOMP connected as', userId);
        this.stompClient.subscribe(
          '/user/queue/messages',
          (msg: any) => {
            console.log('📩 received:', msg.body);
            onMessage(JSON.parse(msg.body)); // sending the message received from queue to the chatbox component
          }
        );
      },
    });

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    console.log('📤 sending:', message);
    console.log('connected?', this.stompClient?.connected);

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(message),
        headers: { 'content-type': 'application/json' }
      });
    }
  }

  loadMessages(receiver: string) {
    return this.http.get<any[]>(
      `http://localhost:9000/api/chat/${receiver}`
    );
  }
}
