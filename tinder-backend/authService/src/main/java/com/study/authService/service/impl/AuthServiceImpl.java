package com.study.authService.service.impl;

import com.study.authService.dto.LoginRequest;
import com.study.authService.dto.RegisterRequest;
import com.study.authService.dto.UserProfileResponse;
import com.study.authService.entity.Auth;
import com.study.authService.repository.AuthRepository;
import com.study.authService.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;

    public AuthServiceImpl(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @Override
    public String login(LoginRequest request) {
        Auth user = authRepository.findByEmail(request.getEmail());

        if (user != null && user.getPassword().equals(request.getPassword())) {
            return "User successfully logged in...";
        }

        return "User not found or Invalid credentials";
    }

    @Override
    public String register(RegisterRequest request) {
        Auth user = authRepository.findByEmail(request.getEmail());

        if (user != null) {
            return "User already exists with email: " + request.getEmail();
        }

        authRepository.save(new Auth(request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getAge(),
                request.getGender()));
        return "User successfully registered...";
    }

    @Override
    public UserProfileResponse getUserProfile(String email) {
        Auth user = authRepository.findByEmail(email);
        return new UserProfileResponse(user.getName(), user.getAge());
    }
}
