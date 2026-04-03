package com.study.authService.utils;

import com.study.authService.dto.LoginRequest;
import com.study.authService.entity.Auth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET;

    private Key getKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(Auth user) {

        return Jwts.builder()
                .setSubject(user.getEmail())
//                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 60 * 60 * 1000)
                ) // valid for 1 hour
                .signWith(getKey())
                .compact();
    }

    public String validateTokenAndGetEmail(String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expired");
        } catch (SignatureException e) {
            throw new RuntimeException("Invalid token signature");
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }
}
