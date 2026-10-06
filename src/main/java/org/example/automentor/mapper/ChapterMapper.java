package org.example.automentor.mapper;

import org.example.automentor.dto.chapter.ChapterResponseDto;
import org.example.automentor.dto.chapter.ChaptersResponseDto;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.entity.Chapter;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChapterMapper {

    Chapter toEntity(CreateChapterDto createChapterDto);
    List<ChaptersResponseDto> toDtoList(List<Chapter> chapters);
    ChapterResponseDto toDto(Chapter chapter);
}
