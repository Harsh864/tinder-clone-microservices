package com.study.matchService.controller;

import com.study.matchService.entity.Swipes;
import com.study.matchService.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/match")
@CrossOrigin("http://localhost:4200")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping("/swipe/{user1}/{user2}/{type}")
    public boolean swipe(@PathVariable String user1, @PathVariable String user2, @PathVariable Swipes.SwipeType type) {

        return matchService.swipe(user1, user2, type);
    }

//    @PostMapping("/match/{user1}/{user2}")
//    public ResponseEntity<?> match(@PathVariable String user1, @PathVariable String user2) {
//        String name = matchService.match(user1, user2);
//        if (name != null) {
//            return ResponseEntity.ok(name);
//        } else {
//            return ResponseEntity.noContent().build();
//        }
//    }



}
