package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.automentor.service.ChapterService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chapter")
public class ChapterController {

    private ChapterService chapterService;

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping("/create-chapter")
    public void createChapter(@RequestBody ) {

    }
}
