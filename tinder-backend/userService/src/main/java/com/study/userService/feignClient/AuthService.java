package com.study.userService.feignClient;


import com.study.userService.config.FeignConfig;
import com.study.userService.dto.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "authService", configuration = FeignConfig.class)
public interface AuthService {

    @GetMapping("/auth/getUserProfile")
    public UserProfileResponse getUserProfile(@RequestHeader("Authorization") String token);

}
