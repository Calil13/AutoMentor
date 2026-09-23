package org.example.automentor.dto.auth;

import lombok.Data;
import org.example.automentor.validation.ValidEmail;

@Data
public class AdminLoginRequestDto {
    @ValidEmail
    private String email;
    private String password;
}