package org.example.automentor.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.automentor.dto.image.ImageDto;
import org.example.automentor.entity.Images;
import org.example.automentor.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImagesService {

    @Value("${upload.path}")
    private String uploadPath;

    private final ImageRepository imageRepository;

    public List<ImageDto> uploadImage(Long id, List<MultipartFile> files) {

        List<Images> savedImages = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    String filePath = uploadPath + File.separator + fileName;
                    file.transferTo(new File(filePath));

                    Images image = new Images("/uploads/" + fileName);
                    savedImages.add(imageRepository.save(image));
                } catch (IOException e) {
                    System.err.println("Error saving file: " + file.getOriginalFilename());
                    throw new RuntimeException("File upload failed: " + file.getOriginalFilename(), e);
                }
            }
        }

        log.info("Image added with ID: {}", id);
        return savedImages.stream()
                .map(img -> new ImageDto(img.getId(), img.getImageUrl()))
                .collect(Collectors.toList());
    }
}
