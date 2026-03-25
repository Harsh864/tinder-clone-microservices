package com.study.matchService.repository;

import com.study.matchService.entity.Matches;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Matches, Long> {
}
