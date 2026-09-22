package org.example.automentor.dto.email;

import lombok.Data;
import org.example.automentor.validation.ValidEmail;

@Data
public class EmailSentOtp {
    @ValidEmail
    private String email;
}