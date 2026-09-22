package org.example.automentor.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.validation.ValidEmail;
import org.example.automentor.validation.ValidPassword;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersForgetPasswordDto {

    @ValidEmail
    private String email;

    @ValidPassword
    private String newPassword;
    private String confirmNewPassword;
}