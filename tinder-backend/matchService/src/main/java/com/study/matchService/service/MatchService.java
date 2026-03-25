package com.study.matchService.service;

import com.study.matchService.entity.Swipes;

public interface MatchService {
    boolean swipe(String user1, String user2, Swipes.SwipeType type);

//    String match(String user1, String user2);
}
