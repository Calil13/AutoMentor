package org.example.automentor.service;

import org.example.automentor.dto.chapter.ChapterResponseDto;
import org.example.automentor.entity.Chapter;
import org.example.automentor.entity.Users;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.mapper.ChapterMapper;
import org.example.automentor.repository.ChapterRepository;
import org.example.automentor.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChapterServiceTest {

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private ChapterRepository chapterRepository;

    @Mock
    private ChapterMapper chapterMapper;

    @InjectMocks
    private ChapterService chapterService;

    @BeforeEach
    void setUp() {
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        lenient().when(securityContext.getAuthentication()).thenReturn(authentication);
        lenient().when(authentication.getName()).thenReturn("test123@gmail.com");
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void getChapter_whenUserNotFound_shouldThrowNotFoundException() {

        when(usersRepository.findByEmail("test123@gmail.com"))
                .thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> chapterService.getChapter(1L)
        );

        assertEquals("USER_NOT_FOUND", exception.getMessage());

        verify(chapterRepository, never()).getReferenceById(any());
        verifyNoInteractions(chapterMapper);
    }

    @Test
    void getChapter_whenUserFound_returnChapter() {
        Long chapterId = 1L;
        Users user = new Users();
        Chapter chapter = new Chapter(chapterId, "Test Chapter Title", "Test Chapter Description");
        ChapterResponseDto expectedResponse = ChapterResponseDto.builder()
                .id(chapterId)
                .chapterTitle("Test Chapter Title")
                .description("Test Chapter Description")
                .build();

        when(usersRepository.findByEmail("test123@gmail.com"))
                .thenReturn(Optional.of(user));
        when(chapterRepository.getReferenceById(chapterId))
                .thenReturn(chapter);
        when(chapterMapper.toDto(chapter))
                .thenReturn(expectedResponse);

        ChapterResponseDto actualResponse = chapterService.getChapter(chapterId);

        assertNotNull(actualResponse);
        assertEquals(expectedResponse, actualResponse);
        assertEquals(expectedResponse.getId(), actualResponse.getId());
        assertEquals(expectedResponse.getChapterTitle(), actualResponse.getChapterTitle());
        assertEquals(expectedResponse.getDescription(), actualResponse.getDescription());

        verify(usersRepository).findByEmail("test123@gmail.com");
        verify(chapterRepository).getReferenceById(chapterId);
        verify(chapterMapper).toDto(chapter);
    }
}
