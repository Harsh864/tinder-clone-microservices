package com.study.chatService.repository;

import com.study.chatService.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChatIdOrderByTimestampAsc(String chatId);
    @Query("SELECT DISTINCT m.chatId FROM Message m WHERE m.sender = :user OR m.receiver = :user")
    List<String> findDistinctChatIds(@Param("user") String user);
    Message findTopByChatIdOrderByTimestampDesc(String chatId);

}