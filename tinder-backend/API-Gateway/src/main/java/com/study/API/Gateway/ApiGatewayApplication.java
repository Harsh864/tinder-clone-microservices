package com.study.API.Gateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}

	@Value("${services.auth-service.url}")
	private String authServiceUrl;

	@Value("${services.user-service.url}")
	private String userServiceUrl;

	@Value("${services.match-service.url}")
	private String matchServiceUrl;

	@Value("${services.chat-service.url}")
	private String chatServiceUrl;

	@Value("${services.chat-service.websocket-url}")
	private String chatWebSocketUrl;

	@Bean
	public RouteLocator routeConfig(RouteLocatorBuilder builder) {

		return builder.routes()

				.route("auth-service", p -> p
						.path("/auth/**")
						.uri(authServiceUrl))

				.route("user-service", p -> p
						.path("/profile/**")
						.uri(userServiceUrl))

				.route("match-service", p -> p
						.path("/match/**")
						.uri(matchServiceUrl))

				.route("chat-http-service", p -> p
						.path("/api/chat/**")
						.uri(chatServiceUrl))

				.route("chat-websocket-service", p -> p
						.path("/chat", "/chat/**")
						.uri(chatWebSocketUrl))

				.build();
	}
}
