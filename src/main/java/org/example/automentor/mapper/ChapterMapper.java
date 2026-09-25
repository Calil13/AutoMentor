package org.example.automentor.mapper;

import org.example.automentor.dto.chapter.ChaptersResponseDto;
import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.entity.Chapter;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChapterMapper {

    Chapter toEntity(CreateChapterDto createChapterDto);
    ChaptersResponseDto toDtoList(Chapter chapters);
}
