package org.example.automentor.dto.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.enums.ImageType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponseDto {
    private Long id;
    private String imageUrl;
    private ImageType type;
    private Long ownerId;
}