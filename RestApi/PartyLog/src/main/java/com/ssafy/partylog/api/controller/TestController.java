package com.ssafy.partylog.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/test")
@Tag(name = "test", description = "Swagger 테스트용 API - test")
public class TestController {

    @Value("${PROFILE_TYPE}")
    String profileType;

    @GetMapping("/hello")
    @Operation(summary = "summary표기", description = "description표기")
    public String hello(){
        return "hello";
    }

    @GetMapping("/profile")
    public String getProfile() {
        return profileType;
    }
}
