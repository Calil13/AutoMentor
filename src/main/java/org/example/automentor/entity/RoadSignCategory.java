package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "roadSignCategory", fetch = FetchType.LAZY)
    private List<RoadSign> roadSigns;
}