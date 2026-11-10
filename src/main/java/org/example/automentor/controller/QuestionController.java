package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.question.QuestionResponseDto;
import org.example.automentor.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/chapter/{id}")
    public List<QuestionResponseDto> getQuestionsForChapter(@PathVariable Long id) {

    }
}
