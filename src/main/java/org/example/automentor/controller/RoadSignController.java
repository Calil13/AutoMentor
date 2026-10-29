package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.roadSign.RoadSignCategoryResponseDto;
import org.example.automentor.dto.roadSign.RoadSignResponseDto;
import org.example.automentor.service.RoadSignService;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/road-sign")
public class RoadSignController {

    private final RoadSignService roadSignService;

    @GetMapping("/categories")
    public List<RoadSignCategoryResponseDto> getCategories() {
        return roadSignService.getCategories();
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/category/{categoryId}")
    public Page<RoadSignResponseDto> getRoadSigns(@PathVariable Long categoryId, @ParameterObject Pageable pageable) {
        return roadSignService.getRoadSigns(categoryId, pageable);
    }
}
