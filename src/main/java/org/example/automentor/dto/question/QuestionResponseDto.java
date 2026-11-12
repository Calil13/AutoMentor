package org.example.automentor.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.dto.variants.VariantResponseDto;
import org.example.automentor.entity.Variants;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class QuestionResponseDto {

    private String txt;
    private List<String> imgUrl;
    private List<VariantResponseDto> variants;
}
