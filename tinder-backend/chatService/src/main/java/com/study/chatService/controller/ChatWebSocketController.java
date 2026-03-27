package com.study.chatService.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.chatService.entity.Message;
import com.study.chatService.service.MessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService service;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ChatWebSocketController(SimpMessagingTemplate messagingTemplate, MessageService service) {
        this.messagingTemplate = messagingTemplate;
        this.service = service;
    }

    @MessageMapping("/sendMessage")
    public void send(@Payload byte[] rawPayload) {

        try {
            System.out.println("📨 RAW PAYLOAD: " + rawPayload);

            Message message = objectMapper.readValue(rawPayload, Message.class);

            System.out.println("sender=" + message.getSender());
            System.out.println("receiver=" + message.getReceiver());
            System.out.println("content=" + message.getContent());
            System.out.println("chatId=" + message.getChatId());

            Message saved = service.save(message);

            messagingTemplate.convertAndSendToUser(
                    saved.getReceiver(), "/queue/messages", saved
            );
            messagingTemplate.convertAndSendToUser(
                    saved.getSender(), "/queue/messages", saved
            );

        } catch (Exception e) {
            System.err.println("❌ Failed to parse message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}