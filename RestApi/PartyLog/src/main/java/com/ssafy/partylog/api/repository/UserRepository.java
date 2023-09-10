package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.UserSearchResponseBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUserId(String userId);

    Optional<UserEntity> findByUserNo(int userNo);

    @Query(value = "SELECT user_no, user_nickname  FROM USER WHERE user_nickname LIKE %?1% ORDER BY (CASE WHEN (user_no IN (SELECT followee_no FROM `FOLLOW` WHERE follower_no =?2) OR user_no IN (SELECT follower_no FROM `FOLLOW` WHERE followee_no=?2)) THEN 1 ELSE 2 END), user_nickname DESC LIMIT ?3 OFFSET ?4", nativeQuery = true)
    List<UserSearchResponseBody> findUser(String userNickname, int userNo, int limit, int offset);

    @Query(value = "UPDATE user SET user_profile = ?2 WHERE user_no = ?1 ;", nativeQuery = true)
    void setUploadProfile(int userNo, String url);
}
