package org.example.automentor.dto.roadSign;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.enums.RoadSignCategoryEnum;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoadSignCategoryResponseDto {

    private Long id;
    private RoadSignCategoryEnum roadSignCategory;
}
