package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.roadSign.RoadSignCategoryResponseDto;
import org.example.automentor.dto.roadSign.RoadSignResponseDto;
import org.example.automentor.entity.RoadSign;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.exceptions.UnexpectedException;
import org.example.automentor.mapper.RoadSignCategoryMapper;
import org.example.automentor.mapper.RoadSignMapper;
import org.example.automentor.repository.RoadSignCategoryRepository;
import org.example.automentor.repository.RoadSignRepository;
import org.example.automentor.repository.UsersRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoadSignService {

    private final UsersRepository usersRepository;
    private final RoadSignRepository roadSignRepository;
    private final RoadSignMapper roadSignMapper;
    private final RoadSignCategoryRepository roadSignCategoryRepository;
    private final RoadSignCategoryMapper roadSignCategoryMapper;

    public List<RoadSignCategoryResponseDto> getCategories() {
        var categories = roadSignCategoryRepository.findAll();

        if (categories.isEmpty()) {
            throw new NotFoundException("ROAD_SIGN_CATEGORY_NOT_FOUND");
        }

        return roadSignCategoryMapper.toDtoList(categories);
    }

    public Page<RoadSignResponseDto> getRoadSigns(Pageable pageable) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        Page<RoadSign> roadSign = roadSignRepository.findAll(pageable);

        return roadSign.map(roadSignMapper::toDto);
    }
}
