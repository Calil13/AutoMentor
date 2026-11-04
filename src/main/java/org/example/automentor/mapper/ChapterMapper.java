package org.example.automentor.mapper;

import org.example.automentor.dto.chapter.ChapterResponseDto;
import org.example.automentor.dto.chapter.ChaptersResponseDto;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.entity.Chapter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChapterMapper {

    Chapter toEntity(CreateChapterDto createChapterDto);

    default ChaptersResponseDto toDto(List<String> titles) {
        return ChaptersResponseDto.builder()
                .chapterTitle(titles)
                .build();
    }

    ChapterResponseDto toDto(Chapter chapter);
}
