package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.chapter.ChapterResponseDto;
import org.example.automentor.dto.chapter.ChaptersResponseDto;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.service.ChapterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chapter")
public class ChapterController {

    private final ChapterService chapterService;

    @GetMapping("/chapters-category")
    public List<ChaptersResponseDto> getChapters() {
        return chapterService.getChapters();
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/chapter-category/{id}")
    public ChapterResponseDto getChapter(@PathVariable Long id) {
        return chapterService.getChapter(id);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/create-chapter")
    public void createChapter(@RequestBody CreateChapterDto createChapterDto) {
        chapterService.createChapter(createChapterDto);
    }
}
