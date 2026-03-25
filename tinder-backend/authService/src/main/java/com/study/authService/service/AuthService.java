package com.study.authService.service;

import com.study.authService.dto.LoginRequest;
import com.study.authService.dto.RegisterRequest;
import com.study.authService.dto.UserProfileResponse;

public interface AuthService {

    String login(LoginRequest request);

    String register(RegisterRequest request);

    UserProfileResponse getUserProfile(String email);
}
