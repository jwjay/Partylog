package com.ssafy.partylog.api.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class MyPageResponseBody {
    int userNo;
    String userNickname;
    Date userBirthday;
    String userProfile;
    List<LetterResponseBody> letterResponseBody;
    int followerSum; // 나를 팔로우 하는 사람 수
    int followeeSum; // 내가 팔로우 하는 사람 수

    public MyPageResponseBody(int userNo, String userNickname, Date userBirthday, String userProfile, List<LetterResponseBody> letterResponseBody, int followerSum, int followeeSum) {
        this.userNo = userNo;
        this.userNickname = userNickname;
        this.userBirthday = userBirthday;
        this.userProfile = userProfile;
        this.letterResponseBody = letterResponseBody;
        this.followerSum = followerSum;
        this.followeeSum = followeeSum;
    }
}
