package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.LiveEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LiveRepository extends JpaRepository<LiveEntity, Long> {

    Optional<LiveEntity> findByLiveId(String liveId);
}
