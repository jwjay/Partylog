package com.ssafy.partylog.api.response;

// query native로 설정한 값을 받기 위해서 만든 인터페이스
public interface FollowResponseBody {
    String getUser_no();
    String getUser_nickname();
    String getUser_birthday();
    String getUser_profile();
}
