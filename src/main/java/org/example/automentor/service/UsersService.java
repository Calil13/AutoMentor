package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.user.UserResponseDtoPrivate;
import org.example.automentor.dto.user.UsersUpdateNameDto;
import org.example.automentor.dto.user.UsersUpdatePasswordDto;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.exceptions.WrongPasswordException;
import org.example.automentor.mapper.UsersMapper;
import org.example.automentor.repository.UsersRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UsersService {

    private UsersRepository usersRepository;
    private UsersMapper usersMapper;
    private PasswordEncoder passwordEncoder;

    public UserResponseDtoPrivate getUserInfoPrivate() {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        var user = usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> {
                    log.error("User not found for email: {}", currentEmail);
                    return new NotFoundException("USER_NOT_FOUND");
                });

        log.info("User info retrieved successfully for email: {}", currentEmail);
        return usersMapper.toDtoPrivate(user);
    }

    public String updateName(UsersUpdateNameDto updateNameDto) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        var user = usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> {
                    log.error("User not found for email: {}", currentEmail);
                    return new NotFoundException("USER_NOT_FOUND");
                });

        user.setFullName(updateNameDto.getFullName());
        usersRepository.save(user);

        log.info("User's name updated successfully. \nUser ID: {}", user.getId());
        return "Name updated successfully.";
    }

    public String updatePassword(UsersUpdatePasswordDto updatePassword) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        var user = usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        if (!passwordEncoder.matches(updatePassword.getCurrentPassword(), user.getPassword())) {
            log.warn("Password update failed: existing password is incorrect. User email: {}", user.getEmail());
            throw new WrongPasswordException("Existing Password is wrong!");
        }

        if (!updatePassword.getNewPassword().equals(updatePassword.getConfirmNewPassword())) {
            log.warn("Password update failed: new password and confirm password do not match. User email: {}", user.getEmail());
            throw new WrongPasswordException("Confirm new password correctly!");
        }

        if (passwordEncoder.matches(updatePassword.getNewPassword(), user.getPassword())) {
            log.warn("Password update failed: new password is the same as the current password. User email: {}", user.getEmail());
            throw new WrongPasswordException("New password cannot be same as the existing password!");
        }

        user.setPassword(passwordEncoder.encode(updatePassword.getNewPassword()));
        usersRepository.save(user);

        log.info("User's password updated successfully. \nUser ID: {}", user.getId());
        return "Password changed successfully.";
    }
}
