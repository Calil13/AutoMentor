package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.question.QuestionResponseDto;
import org.example.automentor.entity.Images;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.repository.ChapterRepository;
import org.example.automentor.repository.ImageRepository;
import org.example.automentor.repository.QuestionRepository;
import org.example.automentor.repository.UsersRepository;
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

    public List<QuestionResponseDto> getQuestionsForChapter(Long id) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        var questions = questionRepository.findAllByChapter_Id(id);

        if (questions.isEmpty()) {
            throw new NotFoundException("QUESTIONS_NOT_FOUND");
        }

        return questions.stream()
                .map(question -> {

                        var imageUrls = imageRepository
                        .findAllByQuestions_Id(questions.get)
                        .stream()
                        .map(Images::getImageUrl)
                        .toList()
                })
    }
}
