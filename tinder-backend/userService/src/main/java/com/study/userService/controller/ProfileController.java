package com.study.userService.controller;

import com.study.userService.dto.ProfileRequest;
import com.study.userService.dto.ProfileResponse;
import com.study.userService.entity.Profile;
import com.study.userService.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin("http://localhost:4200")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/user/{email}")
    public ProfileResponse getUserProfile(@PathVariable String email) {
        return profileService.isUserProfileCompleted(email);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileRequest request) {

        profileService.updateProfile(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Profile updated successfully");
    }

    @GetMapping("/allProfile/{email}")
    public List<ProfileResponse> getAllProfile(@PathVariable String email) {
        System.out.println("Incoming email: " + email);
        return profileService.getAllProfile(email);
    }

}
