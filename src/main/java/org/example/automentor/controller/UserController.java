package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.user.UserCheckPasswordDto;
import org.example.automentor.dto.user.UserResponseDtoPrivate;
import org.example.automentor.dto.user.UsersUpdateNameDto;
import org.example.automentor.dto.user.UsersUpdatePasswordDto;
import org.example.automentor.service.UsersService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UsersService usersService;

    @GetMapping("/user-info/private")
    @SecurityRequirement(name = "bearerAuth")
    public UserResponseDtoPrivate getUserInfoPrivate() {
        return usersService.getUserInfoPrivate();
    }

    @PatchMapping("/update/full-name")
    @SecurityRequirement(name = "bearerAuth")
    public String updateName(@RequestBody UsersUpdateNameDto updateNameDto) {
        return usersService.updateName(updateNameDto);
    }

    @PatchMapping("/update/password")
    @SecurityRequirement(name = "bearerAuth")
    public String updatePassword(@Valid @RequestBody UsersUpdatePasswordDto updatePassword) {
        return usersService.updatePassword(updatePassword);
    }

    @DeleteMapping("/delete")
    @SecurityRequirement(name = "bearerAuth")
    public String deleteAccount(@RequestBody UserCheckPasswordDto checkPassword) {
        return usersService.deleteAccount(checkPassword);
    }
}
