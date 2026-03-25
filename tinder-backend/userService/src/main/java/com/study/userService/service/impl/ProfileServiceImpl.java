package com.study.userService.service.impl;

import com.study.userService.dto.ProfileRequest;
import com.study.userService.dto.ProfileResponse;
import com.study.userService.dto.UserProfileResponse;
import com.study.userService.entity.Profile;
import com.study.userService.feignClient.AuthService;
import com.study.userService.repository.ProfileRepository;
import com.study.userService.service.ProfileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    private final AuthService authService;

    public ProfileServiceImpl(ProfileRepository profileRepository, AuthService authService) {
        this.profileRepository = profileRepository;
        this.authService = authService;
    }


    @Override
    public ProfileResponse isUserProfileCompleted(String email) {
        Profile userProfile = profileRepository.findByEmail(email);
        return userProfile == null ? null : new ProfileResponse(userProfile.getName(), userProfile.getEmail(), userProfile.getAge(), userProfile.getBio(), userProfile.getImageUrl());
    }

    @Override
    public void updateProfile(ProfileRequest profile) {
        UserProfileResponse userProfile = authService.getUserProfile(profile.getEmail());
        profileRepository.save(new Profile(profile.getEmail(),
                userProfile.getName(),
                userProfile.getAge(),
                profile.getBio(),
                profile.getInterests(),
                profile.getImageUrl()));
    }

    @Override
    public List<ProfileResponse> getAllProfile() {
        List<Profile> profiles = profileRepository.findAll();
        return profiles.stream().map(profile -> new ProfileResponse(profile.getName(), profile.getEmail(), profile.getAge(), profile.getBio(), profile.getImageUrl())).toList();
    }
}
