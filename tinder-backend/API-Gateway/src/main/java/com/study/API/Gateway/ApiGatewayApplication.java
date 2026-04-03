package com.study.API.Gateway;

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

	@Bean
	public RouteLocator routeConfig(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p -> p
						.path("/auth/**")
						.uri("lb://authService"))
				.route(p -> p
						.path("/profile/**")
						.uri("lb://userService"))
				.route(p -> p
						.path("/match/**")
						.uri("lb://matchService"))
				.route(p -> p
						.path("/api/chat/**")
						.uri("lb://chatService"))
				.build();
	}

}
