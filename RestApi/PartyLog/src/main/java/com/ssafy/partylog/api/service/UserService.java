package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserJoinRequest;
import com.ssafy.partylog.api.response.UserSearchResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

public interface UserService {

    UserEntity searchKakaoAccessToken(String code) throws Exception;

    UserEntity searchKakaoUserInfo(String kakao_Access_Token) throws Exception;

    String createToken(int userNo, String type) throws Exception;

    boolean join(UserJoinRequest userInfo) throws Exception;

    void saveRefreshToken(int userNo, String refreshToken) throws Exception;

    UserEntity searchUserInfoByUserNo(int userNo) throws Exception;

    String searchRefreshToken(String requestToken) throws Exception;

    boolean logout(int userNo) throws Exception;

    List<UserSearchResponseBody> searchUser(String userNickname, int userNo, int limit, int offset) throws Exception;

    //파일 업로드
    String profileUpload(int userNo, MultipartFile uploadFile) throws Exception;
    void uploadOnS3(String name, File file);
}
