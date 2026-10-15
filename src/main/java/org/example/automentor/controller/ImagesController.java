package org.example.automentor.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.example.automentor.dto.image.ImageDto;
import org.example.automentor.enums.ImageType;
import org.example.automentor.service.ImagesService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class ImagesController {

    private final ImagesService imagesService;

    @GetMapping("/get-image/{id}")
    public List<ImageDto> getImages(@PathVariable Long id) {
        return imagesService.getImages(id);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(value = "/add-image/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<ImageDto> addImage(@PathVariable Long id, @RequestPart("files") List<MultipartFile> files, ImageType imageType) {
        return imagesService.addImage(id, files, imageType);
    }

    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/delete-img/{id}")
    public String deleteImage(@PathVariable Long id) {
        return imagesService.deleteImage(id);
    }
}
