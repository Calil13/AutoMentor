package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.image.ImageDto;
import org.example.automentor.entity.*;
import org.example.automentor.enums.ImageType;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.exceptions.UnexpectedException;
import org.example.automentor.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImagesService {

    @Value("${upload.path}")
    private String uploadPath;

    private final ImageRepository imageRepository;
    private final ChapterRepository chapterRepository;
    private final QuestionRepository questionRepository;
    private final RoadSignRepository roadSignRepository;
    private final VariantsRepository variantsRepository;

    public List<ImageDto> getImages(Long id) {
        List<Images> images = imageRepository.findByRoadSignId(id);

        if (images.isEmpty()) {
            log.warn("Images not found for roadSign with ID {}", id);
        }

        return images.stream()
                .map(img -> new ImageDto(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());
    }

    public List<ImageDto> addImage(Long id, List<MultipartFile> files, ImageType imageType) {

        List<Images> savedImages = new ArrayList<>();

        Chapter chapter = null;
        Question question = null;
        RoadSign roadSign = null;
        Variants variants = null;

        switch (imageType) {
            case CHAPTER -> chapter = chapterRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("CHAPTER_NOT_FOUND"));

            case QUESTION -> question = questionRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("QUESTION_NOT_FOUND"));

            case ROAD_SIGN -> roadSign = roadSignRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("ROAD_SIGN_NOT_FOUND"));

            case VARIANTS -> variants = variantsRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("VARIANT_NOT_FOUND"));
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            try {
                String fileName = UUID.randomUUID() + "_"
                        + Paths.get(Objects.requireNonNull(file.getOriginalFilename()))
                        .getFileName();

                Path filePath = Paths.get(uploadPath, fileName);
                Files.createDirectories(filePath.getParent());

                file.transferTo(filePath);

                Images image = new Images("/uploads/" + fileName);
                image.setImageType(imageType);

                switch (imageType) {
                    case CHAPTER -> image.setChapterId(chapter);
                    case QUESTION -> image.setQuestionsId(question);
                    case ROAD_SIGN -> image.setRoadSignId(roadSign);
                    case VARIANTS -> image.setVariantsId(variants);
                }

                savedImages.add(imageRepository.save(image));

            } catch (IOException e) {
                throw new RuntimeException(
                        "File upload failed: " + file.getOriginalFilename(), e);
            }
        }

        return savedImages.stream()
                .map(img -> new ImageDto(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());
    }

    public String deleteImage(Long id) {
        Images image = imageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("IMAGE_NOT_FOUND"));

        Path fullPath = Paths.get(uploadPath)
                .resolve(image.getImageUrl().replace("/uploads/", ""))
                .normalize();

        try {
            if (Files.exists(fullPath)) {
                Files.delete(fullPath);
            }
        } catch (Exception e) {
            log.error("An error occurred while deleting the file!");
            throw new UnexpectedException("An error occurred while deleting the file: " + fullPath);
        }

        imageRepository.delete(image);

        log.info("Image deleted successfully. \nID: {}", id);
        return "Image deleted successfully.";
    }
}
