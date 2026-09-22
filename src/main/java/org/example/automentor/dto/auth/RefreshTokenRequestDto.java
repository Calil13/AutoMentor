package org.example.automentor.dto.auth;

import lombok.Data;

@Data
public class RefreshTokenRequestDto {
    private String refreshToken;
}