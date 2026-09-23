package com.study.chatService.feignClient;

import com.study.chatService.dto.ProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(
        name = "userService",
        url = "${services.user-service.url}"
)
public interface UserProfile {

    @GetMapping("/profile/user")
    ProfileResponse getUserProfile(
            @RequestHeader("X-User-Name") String email
    );
}
