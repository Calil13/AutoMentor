package org.example.automentor.mapper;

import org.example.automentor.dto.roadSign.RoadSignResponseDto;
import org.example.automentor.entity.RoadSign;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoadSignMapper {

    RoadSignResponseDto toDto(RoadSign roadSign);
}
