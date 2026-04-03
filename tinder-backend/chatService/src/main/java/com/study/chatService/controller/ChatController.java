package com.study.chatService.controller;

import com.study.chatService.dto.ChatSummary;
import com.study.chatService.entity.Message;
import com.study.chatService.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
//@CrossOrigin("*")
public class ChatController {

    private final MessageService service;

    public ChatController(MessageService service) {
        this.service = service;
    }

    @GetMapping("/{receiver}")
    public List<Message> getMessages(@RequestHeader("X-User-Name") String sender, @PathVariable String receiver) {
        String chatId = sender.compareTo(receiver) < 0 ? sender + "_" + receiver : receiver + "_" + sender;
        return service.getChat(chatId);
    }

    @GetMapping("/chats/{user}")
    public List<ChatSummary> getChats(@PathVariable String user) {
        return service.getChatsForUser(user);
    }

}
