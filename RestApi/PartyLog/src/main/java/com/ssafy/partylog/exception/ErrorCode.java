package com.ssafy.partylog.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // JWT
    EXPIRED_ACESS_TOKEN(HttpStatus.BAD_REQUEST, "J001", "토큰 기한이 만료되었습니다."), // 토큰 기한 만료
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "J002", "유효하지 않은 토큰입니다."), // 유효하지 않은 토큰
    NO_TOKEN(HttpStatus.BAD_REQUEST, "J003", "전달받은 토큰이 null 입니다."); // 토큰이 null

    private HttpStatus httpStatus;
    private String code;
    private String message;
}
