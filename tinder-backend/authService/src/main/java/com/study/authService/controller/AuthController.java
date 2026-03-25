package com.study.authService.controller;

import com.study.authService.dto.LoginRequest;
import com.study.authService.dto.RegisterRequest;
import com.study.authService.dto.UserProfileResponse;
import com.study.authService.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:4200")
public class AuthController {

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String res = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String res = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/getUserProfile/{email}")
    public UserProfileResponse getUserProfile(@PathVariable String email) {
        UserProfileResponse res = authService.getUserProfile(email);
        return res;
    }
}
