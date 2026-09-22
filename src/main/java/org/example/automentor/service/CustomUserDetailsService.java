package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.entity.Users;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.repository.UsersRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws NotFoundException {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("User not found!");
                    return new NotFoundException("ERROR");
                });

        return User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getUsersRole().name())
                .build();
    }
}