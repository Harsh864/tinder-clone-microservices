package com.study.authService.service;

import com.study.authService.dto.LoginRequest;
import com.study.authService.dto.RegisterRequest;
import com.study.authService.dto.UserProfileResponse;
import com.study.authService.entity.Auth;

public interface AuthService {

    Auth login(LoginRequest request);

    String register(RegisterRequest request);

    UserProfileResponse getUserProfile(String email);
}
