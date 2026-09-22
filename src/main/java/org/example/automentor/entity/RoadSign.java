package org.example.automentor.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.automentor.enums.RoadSignCategory;

@Entity
@Table(name = "road_signs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadSign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "category")
    private RoadSignCategory category;

    @Column(columnDefinition = "TEXT", name = "description")
    private String description;
}