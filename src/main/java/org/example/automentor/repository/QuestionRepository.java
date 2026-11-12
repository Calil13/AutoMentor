package org.example.automentor.repository;

import org.example.automentor.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT * FROM questions ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Question> findRandomQuestion();
}
