package com.study.chatService.service.impl;

import com.study.chatService.dto.ChatSummary;
import com.study.chatService.dto.ProfileResponse;
import com.study.chatService.entity.Message;
import com.study.chatService.feignClient.UserProfile;
import com.study.chatService.repository.MessageRepository;
import com.study.chatService.service.MessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    private final UserProfile userProfile;

    public MessageServiceImpl(MessageRepository messageRepository, UserProfile userProfile) {
        this.messageRepository = messageRepository;
        this.userProfile = userProfile;
    }

    @Override
    public Message save(Message message) {

        if (message.getChatId() == null || message.getChatId().isEmpty()) {
            message.setChatId(
                    Message.generateChatId(message.getSender(), message.getReceiver())
            );
        }

        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getChat(String chatId) {
        return messageRepository.findByChatIdOrderByTimestampAsc(chatId);
    }

    public List<ChatSummary> getChatsForUser(String user) {

        List<String> chatIds = messageRepository.findDistinctChatIds(user);

        List<ChatSummary> list = new ArrayList<>();
        for (String chatId : chatIds) {
            Message lastMsg = messageRepository.findTopByChatIdOrderByTimestampDesc(chatId);
            String otherUserEmail = lastMsg.getSender().equals(user) ? lastMsg.getReceiver() : lastMsg.getSender();

            ProfileResponse otherUserProfile = userProfile.getUserProfile(otherUserEmail);

            ChatSummary summary = new ChatSummary();
            summary.setChatId(chatId);
            summary.setOtherUserEmail(otherUserEmail);
            summary.setSender(lastMsg.getSender());
            summary.setLastMessage(lastMsg.getContent());
            summary.setLastTimestamp(lastMsg.getTimestamp());
            summary.setOtherUserName(otherUserProfile.getName());
            summary.setOtherUserImageUrl(otherUserProfile.getImageUrl());
            list.add(summary);
        }
        return list.stream().sorted((o1, o2) -> o2.getLastTimestamp().compareTo(o1.getLastTimestamp())).toList();
    }
}