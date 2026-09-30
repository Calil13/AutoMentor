package org.example.automentor.repository;

import org.example.automentor.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    @Query("SELECT c.chapterTitle FROM Chapter c")
    List<String> findAllTitles();
}
