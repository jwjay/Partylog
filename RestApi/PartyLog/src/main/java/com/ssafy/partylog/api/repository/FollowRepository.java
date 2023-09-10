package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.FollowEntity;
import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.response.FollowResponseBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    List<FollowEntity> deleteFollowByFollowerNoAndFolloweeNo(int followerNo, int followeeNo);

    // 팔로우 중인지 확인
    boolean existsByFollowerNoAndAndFolloweeNo(int followerNo, int followeeNo);

    //내가 팔로우 하는 사람들 수
    long countByFollowerNo(int followerNo);

    //나를 팔로우 하는 사람들 수
    long countByFolloweeNo(int followeeNo);

    // 내가 팔로우한 사람 목록
    @Query(value = "SELECT u.user_no, u.user_nickname, u.user_birthday, u.user_profile  FROM USER u WHERE user_no IN (SELECT followee_no FROM FOLLOW WHERE follower_no = ?1) ORDER BY user_nickname ASC LIMIT ?2 OFFSET ?3", nativeQuery = true)
    List<FollowResponseBody> getFolloweeList(int followerNo, int limit, int offset);

    // 나를 팔로우한 사람 목록
    @Query(value = "SELECT u.user_no, u.user_nickname, u.user_birthday, u.user_profile  FROM USER u WHERE user_no IN (SELECT follower_no FROM FOLLOW WHERE followee_no = ?1) ORDER BY user_nickname ASC LIMIT ?2 OFFSET ?3", nativeQuery = true)
    List<FollowResponseBody> getFollowerList(int followeeNo, int limit, int offset);
        
}
