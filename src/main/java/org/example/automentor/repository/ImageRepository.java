package org.example.automentor.repository;

import org.example.automentor.entity.Images;
import org.example.automentor.entity.RoadSign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Images, Long> {
    List<Images> findByChapterId(Long chapterId);
    List<Images> findByRoadSignId(Long roadSignId);
    List<Images> findByVariantsId(Long answerId);

    List<Images> findByRoadSign_IdIn(List<Long> roadSignId);
}