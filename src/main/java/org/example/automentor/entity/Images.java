package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.automentor.enums.ImageType;

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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "image_type")
    private ImageType imageType;

    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    @ManyToOne
    @JoinColumn(name = "questions_id")
    private Question questions;

    @OneToOne
    @JoinColumn(name = "road_sign_id")
    private RoadSign roadSign;

    @ManyToOne
    @JoinColumn(name = "variants_id")
    private Variants variants;

    public Images(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}