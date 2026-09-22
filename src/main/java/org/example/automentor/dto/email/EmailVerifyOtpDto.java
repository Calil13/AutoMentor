package org.example.automentor.dto.email;

import lombok.Data;
import org.example.automentor.validation.ValidEmail;

@Data
public class EmailVerifyOtpDto {
    @ValidEmail
    private String email;

    private String otp;
}