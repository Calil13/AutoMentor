package org.example.automentor.dto.roadSign;

import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadSignResponseDto {

    private Long id;
    private String name;
    private String imageUrl;
    private String description;
}
