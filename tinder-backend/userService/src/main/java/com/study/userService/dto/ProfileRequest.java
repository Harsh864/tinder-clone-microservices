package com.study.userService.dto;

public class ProfileRequest {

    public ProfileRequest(String imageUrl, String interests, String bio) {
        this.imageUrl = imageUrl;
        this.interests = interests;
        this.bio = bio;
    }

    private String bio;

    private String interests;

    private String imageUrl;

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ProfileRequest() {
    }
}
