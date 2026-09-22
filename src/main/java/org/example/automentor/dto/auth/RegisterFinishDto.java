package org.example.automentor.dto.auth;


import lombok.Data;
import org.example.automentor.validation.ValidEmail;
import org.example.automentor.validation.ValidPassword;
import org.example.automentor.validation.ValidPhone;

@Data
public class RegisterFinishDto {
    @ValidEmail
    private String email;

    private String name;

    @ValidPhone
    private String phone;

    @ValidPassword
    private String password;
}