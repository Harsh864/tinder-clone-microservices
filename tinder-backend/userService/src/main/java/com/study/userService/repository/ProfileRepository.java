package com.study.userService.repository;

import com.study.userService.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, String> {

    Profile findByEmail(String email);
}
