package com.ssafy.partylog.api.response;

// query native로 설정한 값을 받기 위해서 만든 인터페이스
public interface UserSearchResponseBody {
    int getUser_no();
    String getUser_nickname();
}
