package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.image.ImageDto;
import org.example.automentor.entity.Chapter;
import org.example.automentor.entity.Images;
import org.example.automentor.entity.Question;
import org.example.automentor.entity.RoadSign;
import org.example.automentor.enums.ImageType;
import org.example.automentor.exceptions.NotFoundException;
import org.example.automentor.repository.ChapterRepository;
import org.example.automentor.repository.ImageRepository;
import org.example.automentor.repository.QuestionRepository;
import org.example.automentor.repository.RoadSignRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
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

    public List<ImageDto> addImage(Long id, List<MultipartFile> files, ImageType imageType) {

        List<Images> savedImages = new ArrayList<>();

        Chapter chapter = null;
        Question question = null;
        RoadSign roadSign = null;

        switch (imageType) {
            case CHAPTER -> chapter = chapterRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("Chapter not found"));

            case QUESTION -> question = questionRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("Question not found"));

            case ROAD_SIGN -> roadSign = roadSignRepository.findById(id)
                    .orElseThrow(() ->
                            new NotFoundException("Road sign not found"));

            case ANSWER -> throw new UnsupportedOperationException(
                    "Answer image relation needs to be defined"
            );
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
                    case ANSWER -> throw new IllegalStateException();
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
}
