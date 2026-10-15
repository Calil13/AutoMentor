package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.automentor.enums.RoadSignCategoryEnum;

@Entity
@Table(name = "road_signs_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadSignCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoadSignCategoryEnum roadSignCategory;
}