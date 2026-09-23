package org.example.automentor.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.validation.ValidPassword;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersUpdatePasswordDto {
    private String currentPassword;

    @ValidPassword
    private String newPassword;
    private String confirmNewPassword;
}