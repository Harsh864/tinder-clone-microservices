package com.study.chatService.service;

import com.study.chatService.dto.ChatSummary;
import com.study.chatService.entity.Message;

import java.util.List;

public interface MessageService {

    public Message save(Message message);

    public List<Message> getChat(String chatId);

    List<ChatSummary> getChatsForUser(String user);
}
