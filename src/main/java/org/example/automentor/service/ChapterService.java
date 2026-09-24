package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.enums.UsersRole;
import org.example.automentor.exceptions.AccessDeniedException;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.mapper.ChapterMapper;
import org.example.automentor.repository.ChapterRepository;
import org.example.automentor.repository.UsersRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChapterService {

    private UsersRepository usersRepository;
    private ChapterMapper chapterMapper;
    private ChapterRepository chapterRepository;

    public void createChapter(CreateChapterDto createChapterDto) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        var user = usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        if (!user.getUsersRole().equals(UsersRole.ADMIN)){
            throw new AccessDeniedException("You are not admin.");
        }

        chapterRepository.save(chapterMapper.toEntity(createChapterDto));
    }
}
