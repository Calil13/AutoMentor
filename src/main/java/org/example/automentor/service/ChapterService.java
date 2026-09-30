package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.chapter.ChapterResponseDto;
import org.example.automentor.dto.chapter.ChaptersResponseDto;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.entity.Chapter;
import org.example.automentor.enums.UsersRole;
import org.example.automentor.exceptions.AccessDeniedException;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.mapper.ChapterMapper;
import org.example.automentor.repository.ChapterRepository;
import org.example.automentor.repository.UsersRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChapterService {

    private UsersRepository usersRepository;
    private ChapterMapper chapterMapper;
    private ChapterRepository chapterRepository;

    public ChaptersResponseDto getChapters() {
        log.info("Chapters returned");
        return chapterMapper.toDtoList(chapterRepository.findAll());
    }

    public ChapterResponseDto getChapter(Long id) {
        log.info("Chapter returned.");
        return chapterMapper.toDto(chapterRepository.getReferenceById(id));
    }

    public void createChapter(CreateChapterDto createChapterDto) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        var user = usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        if (!user.getUsersRole().equals(UsersRole.ADMIN)){
            throw new AccessDeniedException("You are not admin.");
        }

        log.info("New chapter created.");
        chapterRepository.save(chapterMapper.toEntity(createChapterDto));
    }
}
