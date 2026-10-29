package org.example.automentor.dto.roadSign;

import lombok.*;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.RoadSign;
import org.example.automentor.entity.RoadSignCategory;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadSignResponseDto {

    private Long id;
    private RoadSign roadSign;
    private String imageUrl;
}
