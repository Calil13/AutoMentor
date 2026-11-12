package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.question.QuestionResponseDto;
import org.example.automentor.dto.variants.VariantResponseDto;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.Question;
import org.example.automentor.entity.Variants;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuestionService {

    private final UsersRepository usersRepository;
    private final QuestionRepository questionRepository;
    private final ImageRepository imageRepository;
    private final VariantsRepository variantsRepository;

    @Transactional(readOnly = true)
    public List<QuestionResponseDto> getRandomQuestions() {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        // 1. Random 10 sual (bir dəfə)
        List<Question> questions = questionRepository.findRandomQuestion();
        if (questions.isEmpty()) {
            throw new NotFoundException("QUESTIONS_NOT_FOUND");
        }
        List<Long> questionIds = questions.stream().map(Question::getId).toList();

        // 2. Sualların şəkilləri: questionId -> [url, url...]
        Map<Long, List<String>> imagesByQuestion = imageRepository.findByQuestionIdIn(questionIds).stream()
                .collect(Collectors.groupingBy(
                        img -> img.getQuestion().getId(),
                        Collectors.mapping(Images::getImageUrl, Collectors.toList())));

        // 3. Variantlar: questionId -> [variant, variant...]
        List<Variants> variants = variantsRepository.findByQuestionIdIn(questionIds);
        Map<Long, List<Variants>> variantsByQuestion = variants.stream()
                .collect(Collectors.groupingBy(v -> v.getQuestion().getId()));

        // 4. Variantların şəkilləri: variantId -> [url, url...]
        List<Long> variantIds = variants.stream().map(Variants::getId).toList();
        Map<Long, List<String>> imagesByVariant = variantIds.isEmpty()
                ? Map.of()
                : imageRepository.findByVariantsIdIn(variantIds).stream()
                .collect(Collectors.groupingBy(
                        img -> img.getVariants().getId(),
                        Collectors.mapping(Images::getImageUrl, Collectors.toList())));

        // 5. Hamısını DTO-ya yığırıq
        return questions.stream()
                .map(q -> QuestionResponseDto.builder()
                        .txt(q.getText())
                        .imgUrl(imagesByQuestion.getOrDefault(q.getId(), List.of()))
                        .variants(variantsByQuestion.getOrDefault(q.getId(), List.of()).stream()
                                .map(v -> VariantResponseDto.builder()
                                        .id(v.getId())
                                        .text(v.getTxt())
                                        .imageUrls(imagesByVariant.getOrDefault(v.getId(), List.of()))
                                        .build())
                                .toList())
                        .build())
                .toList();
    }
}
