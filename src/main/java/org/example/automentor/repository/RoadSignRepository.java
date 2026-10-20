package org.example.automentor.repository;

import org.example.automentor.entity.RoadSign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoadSignRepository extends JpaRepository<RoadSign, Long> {

}
