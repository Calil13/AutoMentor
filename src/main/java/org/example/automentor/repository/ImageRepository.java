package org.example.automentor.repository;

import org.example.automentor.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Images, Long> {
    List<Images> findByChapterId(Long chapterId);
    List<Images> findByQuestionId(Long questionId);
    List<Images> findByRoadSignId(Long roadSignId);
    List<Images> findByAnswerId(Long answerId);
}