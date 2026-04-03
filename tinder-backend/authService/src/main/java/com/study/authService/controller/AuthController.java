package com.study.authService.controller;

import com.study.authService.dto.LoginRequest;
import com.study.authService.dto.RegisterRequest;
import com.study.authService.dto.UserProfileResponse;
import com.study.authService.entity.Auth;
import com.study.authService.service.AuthService;
import com.study.authService.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
//@CrossOrigin("http://localhost:4200")
public class AuthController {

    private AuthService authService;

    private PasswordEncoder passwordEncoder;

    private JwtUtil jwtUtil;

    public AuthController(AuthService authService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("Email " + request.getEmail() + " and password " + request.getPassword());
        Auth user = authService.login(request);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials entered");
        }

        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String res = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/getUserProfile")
    public UserProfileResponse getUserProfile(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.validateTokenAndGetEmail(token);
        return authService.getUserProfile(email);
    }
}
