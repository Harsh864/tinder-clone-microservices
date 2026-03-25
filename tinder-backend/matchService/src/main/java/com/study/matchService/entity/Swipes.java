package com.study.matchService.entity;

import jakarta.persistence.*;


@Entity
public class Swipes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String swiperId;
    private String swipedId;

    public SwipeType getType() {
        return type;
    }

    public void setType(SwipeType type) {
        this.type = type;
    }

    public Swipes(String swiperId, String swipedId, SwipeType type) {
        this.swiperId = swiperId;
        this.swipedId = swipedId;
        this.type = type;
    }

    @Enumerated(EnumType.STRING)
    private SwipeType type;

    public enum SwipeType {
        LIKE,
        DISLIKE
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Swipes() {
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


}
