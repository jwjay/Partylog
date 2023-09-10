package com.ssafy.partylog.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
@Builder
public class FollowRequest {
    @Schema(description = "팔로우하는 사람 번호", nullable = true, example = "1002")
    private int followerNo;
    @Schema(description = "팔로우당하는 사람 번호", nullable = true, example = "1004")
    private int followeeNo;
    @Schema(description = "한번에 가지고 올 사람 수", nullable = false, example = "5")
    private int limit;
    @Schema(description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)", nullable = false, example = "0")
    private int offset;
}
