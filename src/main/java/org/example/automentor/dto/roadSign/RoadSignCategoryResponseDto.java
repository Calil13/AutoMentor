package org.example.automentor.dto.roadSign;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoadSignCategoryResponseDto {

    private Long id;
    private String categoryName;
}
