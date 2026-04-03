package com.study.chatService.feignClient;

import com.study.chatService.dto.ProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "userService")
public interface UserProfile {

    @GetMapping("profile/user")
    public ProfileResponse getUserProfile(@RequestHeader("X-User-Name") String email);

}
