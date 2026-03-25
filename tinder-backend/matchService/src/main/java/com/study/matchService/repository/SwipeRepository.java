package com.study.matchService.repository;

import com.study.matchService.entity.Swipes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SwipeRepository extends JpaRepository<Swipes, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO swipes (swiped_id, swiper_id, type) VALUES (:user1, :user2, :type)", nativeQuery = true)
    void swipe(@Param("user1") String user1, @Param("user2") String user2, @Param("type") Swipes.SwipeType type);

    boolean existsBySwiperIdAndSwipedIdAndType(String swiperId, String swipedId, Swipes.SwipeType type);
}
