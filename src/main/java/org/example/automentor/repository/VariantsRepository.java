package org.example.automentor.repository;

import org.example.automentor.dto.question.QuestionResponseDto;
import org.example.automentor.entity.Variants;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VariantsRepository extends JpaRepository<Variants, Long> {
}
