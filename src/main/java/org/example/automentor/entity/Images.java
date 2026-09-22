package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "images")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "chapter_images_url")
    private Chapter chapterImagesUrl;

    @ManyToOne
    @JoinColumn(name = "questions_image_url")
    private Question questionsImageUrl;

    @OneToOne
    @JoinColumn(nullable = false, name = "roadSign_img_url")
    private RoadSign roadSignImgUrl;
}