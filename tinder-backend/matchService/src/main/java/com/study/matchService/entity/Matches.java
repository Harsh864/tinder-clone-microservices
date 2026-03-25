package com.study.matchService.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Matches {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private String swiperId;
    private String swipedId;
    private LocalDateTime matchedAt;

    public Matches() {
    }

    @PrePersist
    public void prePersist() {
        this.matchedAt = LocalDateTime.now();
    }

    public Matches(String swiperId, String swipedId, LocalDateTime matchedAt) {
        this.swiperId = swiperId;
        this.swipedId = swipedId;
        this.matchedAt = matchedAt;
    }

    public String getSwiperId() {
        return swiperId;
    }

    public void setSwiperId(String swiperId) {
        this.swiperId = swiperId;
    }

    public String getSwipedId() {
        return swipedId;
    }

    public void setSwipedId(String swipedId) {
        this.swipedId = swipedId;
    }

    public LocalDateTime getMatchedAt() {
        return matchedAt;
    }

    public void setMatchedAt(LocalDateTime matchedAt) {
        this.matchedAt = matchedAt;
    }
}
