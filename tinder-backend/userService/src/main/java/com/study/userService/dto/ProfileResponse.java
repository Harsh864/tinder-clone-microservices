package com.study.userService.dto;

public class ProfileResponse {

    private String name;

    private String email;

    private int age;

    private String bio;

    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ProfileResponse(String name, String email, int age, String bio, String imageUrl) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.bio = bio;
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public ProfileResponse() {
    }
}
