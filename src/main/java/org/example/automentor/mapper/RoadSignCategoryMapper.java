package org.example.automentor.mapper;

import org.example.automentor.dto.roadSign.RoadSignCategoryResponseDto;
import org.example.automentor.entity.RoadSignCategory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoadSignCategoryMapper {

    RoadSignCategoryResponseDto toDto(RoadSignCategory roadSignCategory);

    List<RoadSignCategoryResponseDto> toDtoList(List<RoadSignCategory> categories);
}
