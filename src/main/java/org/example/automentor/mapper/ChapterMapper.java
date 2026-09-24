package org.example.automentor.mapper;

import org.example.automentor.dto.chapter.CreateChapterDto;
import org.example.automentor.entity.Chapter;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChapterMapper {

    Chapter toEntity(CreateChapterDto createChapterDto);
}
