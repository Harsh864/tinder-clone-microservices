package com.study.authService.repository;

import com.study.authService.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, Long> {

    Auth findByEmail(String email);

}
