package org.example.automentor.dto.chapter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChapterResponseDto {

    private Long id;
    private String chapterTitle;
    private String description;
}
