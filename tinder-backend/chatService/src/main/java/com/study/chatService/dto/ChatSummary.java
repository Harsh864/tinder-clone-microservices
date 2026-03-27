package com.study.chatService.dto;

import java.time.LocalDateTime;

public class ChatSummary {

    private String chatId;
    private String otherUserEmail;
    private String lastMessage;
    private LocalDateTime lastTimestamp;
    private String otherUserName;
    private String otherUserImageUrl;
    private String sender;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public ChatSummary(String chatId, String otherUserEmail, String lastMessage, LocalDateTime lastTimestamp, String otherUserName, String otherUserImageUrl, String sender) {
        this.chatId = chatId;
        this.otherUserEmail = otherUserEmail;
        this.lastMessage = lastMessage;
        this.lastTimestamp = lastTimestamp;
        this.otherUserName = otherUserName;
        this.otherUserImageUrl = otherUserImageUrl;
        this.sender = sender;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public String getOtherUserEmail() {
        return otherUserEmail;
    }

    public void setOtherUserEmail(String otherUserEmail) {
        this.otherUserEmail = otherUserEmail;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public LocalDateTime getLastTimestamp() {
        return lastTimestamp;
    }

    public void setLastTimestamp(LocalDateTime lastTimestamp) {
        this.lastTimestamp = lastTimestamp;
    }

    public String getOtherUserName() {
        return otherUserName;
    }

    public void setOtherUserName(String otherUserName) {
        this.otherUserName = otherUserName;
    }

    public String getOtherUserImageUrl() {
        return otherUserImageUrl;
    }

    public void setOtherUserImageUrl(String otherUserImageUrl) {
        this.otherUserImageUrl = otherUserImageUrl;
    }

    public ChatSummary(String chatId, String otherUserEmail, String lastMessage, LocalDateTime lastTimestamp) {
        this.chatId = chatId;
        this.otherUserEmail = otherUserEmail;
        this.lastMessage = lastMessage;
        this.lastTimestamp = lastTimestamp;
    }

    public ChatSummary() {
    }
}