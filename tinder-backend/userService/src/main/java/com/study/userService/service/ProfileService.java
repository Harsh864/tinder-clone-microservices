package com.study.userService.service;

import com.study.userService.dto.ProfileRequest;
import com.study.userService.dto.ProfileResponse;

import java.util.List;

public interface ProfileService {

    ProfileResponse isUserProfileCompleted(String email);

    void updateProfile(ProfileRequest profile);

    List<ProfileResponse> getAllProfile(String email);
}
