package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "road_sign")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadSign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "road_sign_category_id", nullable = false)
    private RoadSignCategory roadSignCategory;
}