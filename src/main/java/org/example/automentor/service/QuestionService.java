package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.question.QuestionResponseDto;
import org.example.automentor.dto.variants.VariantResponseDto;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.Question;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuestionService {

    private final UsersRepository usersRepository;
    private final QuestionRepository questionRepository;
    private final ImageRepository imageRepository;
    private final VariantsRepository variantsRepository;

    public List<QuestionResponseDto> getQuestionsForChapter() {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

    }
}
