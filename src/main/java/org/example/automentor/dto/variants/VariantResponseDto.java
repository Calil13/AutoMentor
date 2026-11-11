package org.example.automentor.dto.variants;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class VariantResponseDto {
    private Long id;
    private String text;
    private List<String> imageUrls;
}