package com.ssafy.partylog.api.request;

import com.ssafy.partylog.api.response.LetterResponseBody;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LetterGetRequest {
    @Schema(description = "받는 사람", nullable = true, example = "1006")
    private int receiverNo;
    @Schema(description = "보는 사람 (이 사람 메시지가 가장 앞에 나옴)", nullable = true, example = "1004")
    private int writerNo;
    @Schema(description = "연도, 0으로 작성시 전체글 불러옴", nullable = true, example = "2023")
    private int year;
    @Schema(description = "한 장당 불러올 메시지 수", nullable = true, example = "10")
    private int limit;
    @Schema(description = "offset", nullable = true, example = "0")
    private int offset;
}
