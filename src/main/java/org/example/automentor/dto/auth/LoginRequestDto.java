package org.example.automentor.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.automentor.validation.ValidEmail;
import org.example.automentor.validation.ValidPassword;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {
    @ValidEmail
    private String email;

    @ValidPassword
    private String password;
}