package com.study.userService.entity;

import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    @Column(unique = true)
    private String email;

    private String name;

    private int age;

    private String bio;

    private String interests;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Profile(String email, String name, int age, String bio, String interests, String imageUrl) {
        this.email = email;
        this.name = name;
        this.age = age;
        this.bio = bio;
        this.interests = interests;
        this.imageUrl = imageUrl;
    }

    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public Profile(String email, String bio, String interests) {
        this.email = email;
        this.bio = bio;
        this.interests = interests;
    }

    public Profile() {
    }
}
