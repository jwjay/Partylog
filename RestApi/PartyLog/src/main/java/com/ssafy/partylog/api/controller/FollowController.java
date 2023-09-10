package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.request.FollowRequest;
import com.ssafy.partylog.api.response.FollowResponseBody;
import com.ssafy.partylog.api.response.CommonResponse;
import com.ssafy.partylog.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Tag(name = "FollowController", description = "팔로우 관련 API")
public class FollowController {

    private FollowService followService;

    private FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/addFollow/{followeeNo}")
    @Operation(summary = "팔로우하기", description = "팔로우를 합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우할 회원 번호")
    public ResponseEntity<CommonResponse> addFollow(@PathVariable int followeeNo, Authentication authentication) {

        CommonResponse data;
        HttpStatus status;

        // 토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        // 팔로우 등록
        try {
            followService.addFollow(followNo, followeeNo);
            data = CommonResponse.createResponseWithNoContent("200", "팔로우에 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponseWithNoContent("400", "팔로우에 성공했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse>(data, status);
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    @Operation(summary = "팔로우 해제", description = "팔로우를 해제합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우 해제할 회원 번호")
    public ResponseEntity<CommonResponse> removeFollow(@PathVariable int followeeNo, Authentication authentication) {

        CommonResponse data;
        HttpStatus status;

        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        //팔로우 해제
        try {
            followService.removeFollow(followNo, followeeNo);
            data = CommonResponse.createResponseWithNoContent("200", "팔로우 해제 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            data = CommonResponse.createResponseWithNoContent("400", "팔로우 해제 도중 문제가 발생했습니다..");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<CommonResponse>(data, status);
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @PostMapping("/searchFollowerList")
    @Operation(summary = "팔로워리스트", description = "나를 팔로우한 사람 목록(내가 팔로이)")
    public ResponseEntity<CommonResponse<List<FollowResponseBody>>> searchFollowerList(@RequestBody FollowRequest followrequest) {

        CommonResponse data;
        HttpStatus status;

        //토큰 받기
        int followNo = followrequest.getFolloweeNo();

        try {
            List<FollowResponseBody> list = followService.searchFollowerList(followNo, followrequest.getLimit(), followrequest.getOffset());
            data = CommonResponse.createResponse("200", list, "팔로우 목록 호출에 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null, "팔로우 목록 호출 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<List<FollowResponseBody>>>(data, status);
    }

    //내가 팔로우 하는 사람 목록 가져오기
    @PostMapping("/searchFolloweeList")
    @Operation(summary = "팔로이리스트", description = "내가 팔로우한 사람 목록(내가 팔로워)")
    public ResponseEntity<CommonResponse<List<FollowResponseBody>>> searchFolloweeList(@RequestBody FollowRequest followrequest) {

        CommonResponse data;
        HttpStatus status;
        //토큰 받기
        int followNo = followrequest.getFollowerNo();
        try {
            List<FollowResponseBody> list = followService.searchFolloweeList(followNo, followrequest.getLimit(), followrequest.getOffset());
            data = CommonResponse.createResponse("200", list,"팔로이 목록 호출에 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null, "팔로이 목록 호출 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<List<FollowResponseBody>>>(data, status);
    }

    //나를 팔로우하는 사람 수
    @GetMapping("/getFollowerNumber/{userNo}")
    @Operation(summary = "팔로워들", description = "나를 팔로우하는 사람 수")
    public ResponseEntity<CommonResponse<Long>> getFollowerNumber(@PathVariable int userNo) {

        CommonResponse data;
        HttpStatus status;


        try {
            long counted = followService.getFollowerNumber(userNo);
            data = CommonResponse.createResponse("200", counted, "팔로우 목록의 갯수 호출에 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null, "팔로우 목록의 갯수 호출 도중 문제가 발생했습니다.");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<CommonResponse<Long>>(data, status);
    }

    //내가 팔로우하는 사람 수
    @GetMapping("/getFolloweeNumber/{userNo}")
    @Operation(summary = "스타들", description = "내가 팔로우하는 사람 수")
    public ResponseEntity<CommonResponse<Long>> getFolloweeNumber(@PathVariable int userNo) {

        CommonResponse data;
        HttpStatus status;

        try {
            long counted = followService.getFolloweeNumber(userNo);
            data = CommonResponse.createResponse("200", counted, "팔로이 목록 갯수 호출에 성공했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            data = CommonResponse.createResponse("400", null, "팔로이 목록 갯수 호출 도중 실패했습니다.");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<CommonResponse<Long>>(data, status);
    }

    @GetMapping("/checkFollow/{userNo}")
    @Operation(summary = "팔로우 상태 확인", description = "해당 상대를 팔로우 중인지 아닌지 확인" )
    public ResponseEntity<CommonResponse> checkFollowStatus(@PathVariable int userNo, Authentication authentication){
        CommonResponse data;
        HttpStatus status;

        int loginUserNo = Integer.parseInt(authentication.getName());
        try {
            boolean check = followService.checkFollowStatus(userNo, loginUserNo);
            data = CommonResponse.createResponse("200", check, "팔로우 상태 확인 완료했습니다.");
            status = HttpStatus.OK;
        } catch (Exception e) {
            data = CommonResponse.createResponse("400", null, "팔로우 상태 확인 실패했습니다.");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<CommonResponse>(data, status);

    }

}
