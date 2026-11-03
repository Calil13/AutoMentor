package org.example.automentor.dto.roadSign;

import jakarta.persistence.Column;
import lombok.*;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.RoadSign;
import org.example.automentor.entity.RoadSignCategory;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadSignResponseDto {

    private Long id;
    private String name;
    private String description;
    private String imageUrl;
}
