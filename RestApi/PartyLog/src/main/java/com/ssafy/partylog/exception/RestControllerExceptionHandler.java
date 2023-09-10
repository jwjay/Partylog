package com.ssafy.partylog.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@Slf4j
@RestControllerAdvice
public class RestControllerExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<HashMap<String, String>> application(Exception e) {
        HashMap<String, String> resultMap = new HashMap<>();
        log.error("에러 발생: {}", e.toString());
        resultMap.put("code", "400");
        resultMap.put("message", "에러발생");
        return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
    }
}
