package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.roadSign.RoadSignCategoryResponseDto;
import org.example.automentor.dto.roadSign.RoadSignResponseDto;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.RoadSign;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.exceptions.UnexpectedException;
import org.example.automentor.mapper.RoadSignCategoryMapper;
import org.example.automentor.mapper.RoadSignMapper;
import org.example.automentor.repository.ImageRepository;
import org.example.automentor.repository.RoadSignCategoryRepository;
import org.example.automentor.repository.RoadSignRepository;
import org.example.automentor.repository.UsersRepository;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoadSignService {

    private final UsersRepository usersRepository;
    private final RoadSignRepository roadSignRepository;
    private final RoadSignMapper roadSignMapper;
    private final RoadSignCategoryRepository roadSignCategoryRepository;
    private final RoadSignCategoryMapper roadSignCategoryMapper;
    private final ImageRepository imageRepository;

    public List<RoadSignCategoryResponseDto> getCategories() {
        var categories = roadSignCategoryRepository.findAll();

        if (categories.isEmpty()) {
            throw new NotFoundException("ROAD_SIGN_CATEGORY_NOT_FOUND");
        }

        return roadSignCategoryMapper.toDtoList(categories);
    }

    public Page<RoadSignResponseDto> getRoadSigns(Long categoryId, Pageable pageable) {
        String currentEmail = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        usersRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND"));

        roadSignCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException("CATEGORY_NOT_FOUND"));

        var roadSigns = roadSignRepository.findByRoadSignCategory_Id(categoryId, pageable);

        List<Long> roadSignId = roadSigns.getContent()
                .stream()
                .map(RoadSign::getId)
                .toList();

        var images = imageRepository.findByRoadSign_IdIn(roadSignId);

        Map<Long, String> imageUrlMap = images.stream()
                .collect(Collectors.toMap(
                        image -> image.getRoadSign().getId(),
                        Images::getImageUrl
                ));

        return roadSigns.map(roadSign -> {
            RoadSignResponseDto dto = roadSignMapper.toDto(roadSign);

            dto.setImageUrl(imageUrlMap.get(roadSign.getId()));

            return dto;
        });
    }
}
