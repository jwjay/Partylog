package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.FollowResponseBody;

import java.util.List;

public interface FollowService {

    int addFollow(int userNo, int followeeId) throws Exception;

    int removeFollow(int userNo, int followeeId) throws Exception;

    long getFolloweeNumber(int userNo) throws Exception;

    long getFollowerNumber(int userNo) throws Exception;

    boolean checkFollowStatus(int userNo, int loginUserNo);

    List<FollowResponseBody> searchFollowerList(int userNo, int limit, int offset) throws Exception;

    List<FollowResponseBody> searchFolloweeList(int userNo, int limit, int offset) throws Exception;

}
