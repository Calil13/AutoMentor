package org.example.automentor.controller;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.roadSign.RoadSignCategoryResponseDto;
import org.example.automentor.service.RoadSignService;
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

    @GetMapping("/get-road-sign-category")
    public List<RoadSignCategoryResponseDto> getCategories() {
        return roadSignService.getCategories();
    }
}
