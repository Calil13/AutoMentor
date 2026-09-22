package org.example.automentor.repository;

import org.example.automentor.entity.RefreshToken;
import org.example.automentor.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    void deleteByUser(Users user);

    void deleteByToken(String token);

    Optional<RefreshToken> findByUser(Users user);
}