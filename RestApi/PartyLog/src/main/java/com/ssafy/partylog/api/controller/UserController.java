package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserJoinRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;
import com.ssafy.partylog.api.response.MyPageResponseBody;
import com.ssafy.partylog.api.response.UserSearchResponseBody;
import com.ssafy.partylog.api.response.CommonResponse;
import com.ssafy.partylog.api.service.FollowService;
import com.ssafy.partylog.api.service.LetterService;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/user")
@Tag(name = "UserController", description = "사용자 관련 API")
public class UserController {

    private UserService userService;

    private LetterService letterService;

    private FollowService followeService;

    public UserController(UserService userService, FollowService followService, LetterService letterService) {
        this.userService = userService;
        this.followeService = followService;
        this.letterService = letterService;
    }

    @GetMapping("/login")
    @Operation(summary = "WEB 로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "code", description = "카카오에서 발급해준 인증코드")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "201", description = "Need Birthday Info"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse<Integer>> login(@RequestParam("code") String authCode, HttpServletResponse response) {
        log.info("카카오 인증 코드: {}", authCode);

        HttpStatus status;
        String accessToken = null;
        String refreshToken = null;
        UserEntity user = null;
        CommonResponse data;

        // 카카오 로그인 과정을 통해 생일을 제외한 유저정보  DB에 저장
        try {
            user = userService.searchKakaoAccessToken(authCode);
            log.info("사용자 정보: {}", user);
            if(user.getUserBirthday() != null) {
                // 토큰 생성
                accessToken = userService.createToken(user.getUserNo(), "access-token");
                refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
                userService.saveRefreshToken(user.getUserNo(), refreshToken);
                log.info("엑세스 토큰: {}", accessToken);
                data = CommonResponse.createResponse("200",user.getUserNo(), "로그인 성공했습니다.");
            } else {
                data = CommonResponse.createResponse("201",user.getUserNo(), "생일 정보를 입력해주세요.");
            }
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            status = HttpStatus.BAD_REQUEST;
            data = CommonResponse.createResponse("400",user.getUserNo(), "로그인 도중 에러가 발생했습니다.");
        }

        // response 값 저장
        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);

        return new ResponseEntity<CommonResponse<Integer>>(data, status);
    }

    @GetMapping("/mobile/login")
    @Operation(summary = "Mobile 로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "token", description = "카카오에서 발급해준 인증토큰")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "201", description = "Need Birthday Info"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse<Integer>> mobileLogin(@RequestParam("token") String accessToken, HttpServletResponse response) {
        HashMap<String,Object> resultMap = new HashMap<>();
        log.info("카카오 인증 토큰: {}", accessToken);

        HttpStatus status;
        String refreshToken = null;
        UserEntity user = null;
        CommonResponse data;

        // 카카오 로그인 과정을 통해 생일을 제외한 유저정보  DB에 저장
       try {
           user = userService.searchKakaoUserInfo(accessToken);
           log.info("사용자 정보: {}", user);

           if(user.getUserBirthday() != null) {
               // 토큰 생성
               accessToken = userService.createToken(user.getUserNo(), "access-token");
               refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
               userService.saveRefreshToken(user.getUserNo(), refreshToken);
               log.info("엑세스 토큰: {}", accessToken);
               data = CommonResponse.createResponse("200",user.getUserNo(), "로그인 성공했습니다.");
           } else {
               data = CommonResponse.createResponse("201",user.getUserNo(), "생일 정보를 입력해주세요.");
           }
           status = HttpStatus.OK;
       } catch(Exception e) {
           e.printStackTrace();
           status = HttpStatus.BAD_REQUEST;
           data = CommonResponse.createResponse("400",user.getUserNo(), "로그인 도중 에러가 발생했습니다.");
       }

        // response 값 저장
        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);

        return new ResponseEntity<CommonResponse<Integer>>(data, status);
    }

    @GetMapping("/mobile/tokenCheck")
    @Operation(summary = "모바일 토큰 확인", description = "유효한 토큰 전송시 아이디 반환")
    public ResponseEntity<CommonResponse> mobileTokenCheck(Authentication authentication){
        int userNo = Integer.parseInt(authentication.getName());

        CommonResponse data;
        HttpStatus status;

        data = CommonResponse.createResponse("200", userNo, "토큰확인완료");
        status = HttpStatus.OK;

        return new ResponseEntity<CommonResponse>(data, status);
    }

    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = HashMap.class))),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse<Integer>> join(@RequestBody UserJoinRequest userJoinRequest, HttpServletResponse response) throws Exception {
        log.info("회원가입 요청값: {}", userJoinRequest);

        HttpStatus status;
        CommonResponse data;
        String accessToken = null;
        String refreshToken = null;

        if(userService.join(userJoinRequest)) {
            // 회원가입 성공 시 토큰 발행
            accessToken = userService.createToken(userJoinRequest.getUserNo(), "access-token");
            refreshToken = userService.createToken(userJoinRequest.getUserNo(), "refresh-token");
            userService.saveRefreshToken(userJoinRequest.getUserNo(), refreshToken);
            UserEntity user = userService.searchUserInfoByUserNo(userJoinRequest.getUserNo());
            data = CommonResponse.createResponse("200", user.getUserNo(), "회원가입에 성공했습니다.");
            status = HttpStatus.OK;
        } else {
            data = CommonResponse.createResponse("400",0, "회원가입에 실패했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);
        return new ResponseEntity<CommonResponse<Integer>>(data, status);
    }

    @GetMapping("/recreateAccessToken")
    @Operation(summary = "엑세스 토큰 재발급", description = "엑세스 토큰 만료 시 재발급을 요청합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse> recreateAccessToken(HttpServletRequest request, HttpServletResponse response) throws Exception {

        CommonResponse data;
        HttpStatus status;
        String refreshToken = request.getHeader("Authorization").split(" ")[1];
        String accessToken = userService.searchRefreshToken(refreshToken);

        if(accessToken == null) { // refreshToken이 DB 값과 다른 경우
            data = CommonResponse.createResponseWithNoContent("400", "유효하지 않은 refreshToken 입니다.");
            status = HttpStatus.UNAUTHORIZED;
        } else {
            data = CommonResponse.createResponseWithNoContent("200", "accessToken 재발급 완료");
            status = HttpStatus.OK;
        }

        response.setHeader("authorization", "Bearer " + accessToken);

        return new ResponseEntity<CommonResponse>(data, status);
    }

    @PostMapping("/board/{userNo}")
    @Operation(summary = "", description = "현재 사용자의 개인정보, 편지목록, 친구목록을 가져옵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse<MyPageResponseBody>> searchUserInfo(@PathVariable int userNo) {

        HttpStatus status;
        CommonResponse data;

        try {
            UserEntity userInfo = userService.searchUserInfoByUserNo(userNo);
            log.info("사용자 정보: {}", userInfo);

            List<LetterResponseBody> letterResponseBody = letterService.searchLetterList(userNo, userNo, 0, 24,0);
            int followerSum = (int) followeService.getFollowerNumber(userNo);
            int followeeSum = (int) followeService.getFolloweeNumber(userNo);

            MyPageResponseBody myPageResponseBody = new MyPageResponseBody(
                    userNo,userInfo.getUserNickname(),userInfo.getUserBirthday(),userInfo.getUserProfile(),
                    letterResponseBody, followerSum, followeeSum
            );

            data = CommonResponse.createResponse("200", myPageResponseBody, "사용자 정보를 가져오는데 성공했습니다.");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null, "사용자 정보를 가져오는 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<MyPageResponseBody>>(data, status);
    }

    @PostMapping("/logout/{userNo}")
    @Operation(summary = "로그아웃", description = "리프레시 토큰을 만료시킵니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse> logout(@PathVariable("userNo") int userNo) throws Exception {
        // DB에 저장된 refreshToken 값 제거
        HttpStatus status;
        CommonResponse data;

        log.info("로그아웃 사용자 번호: {}", userNo);
        if(userService.logout(userNo)) { // 로그아웃 성공
            data = CommonResponse.createResponseWithNoContent("200", "로그아웃 되었습니다.");
            status = HttpStatus.OK;
        } else { // 로그아웃 실패
            data = CommonResponse.createResponseWithNoContent("400", "로그아웃 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<CommonResponse>(data, status);
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchUser/{userNickname}/{limit}/{offset}")
    @Operation(summary = "유저 검색", description = "닉네임으로 유저를 검색합니다.")
    @Parameters(value = {
            @Parameter(name = "userNickname", description = "검색 내용"),
            @Parameter(name = "limit", description = "한번에 가지고 올 사람 수"),
            @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)"),
    })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<CommonResponse<List<UserSearchResponseBody>>> searchUser(@PathVariable String userNickname, @PathVariable int limit, @PathVariable int offset, Authentication authentication) {
        CommonResponse data;
        HttpStatus status;

        int myNo = Integer.parseInt(authentication.getName());
        log.info("친구목록 호출 시 요청 사용자 번호: {}", myNo);

        try {
            List<UserSearchResponseBody> list = userService.searchUser(userNickname, myNo, limit, offset);
            data = CommonResponse.createResponse("200", list,"친구목록을 가져오는데 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null,"친구목록을 가져오는데 성공했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<List<UserSearchResponseBody>>>(data, status);
    }

    //프로필 사진 업로드
    @PostMapping("/upload/profile")
    @Operation(summary = "프로필사진 수정", description = "프로필 사진 수정")
    @Parameter(name = "profileFile", description = "multipart/form-data로 보내야 함, 200MB이내")
    public ResponseEntity<String> uploadUserProfile(@RequestParam MultipartFile profileFile, Authentication authentication) throws Exception {
        int userNo = Integer.parseInt(authentication.getName());
        String url = userService.profileUpload(userNo, profileFile);
        return new ResponseEntity<String>(url, HttpStatus.OK);
    }

}
