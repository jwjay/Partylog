package com.ssafy.data.datasource.remote

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.req.JoinReqDto
import com.ssafy.data.model.login.resp.CommRespDto
import com.ssafy.data.service.login.LoginService
import javax.inject.Inject

class LoginDatasource @Inject constructor(private val service: LoginService) {
    suspend fun checkKakaoToken(token: String): ApiResponse<CommRespDto> = service.kakaoLogin(token)
    suspend fun getJoin(data: JoinReqDto): ApiResponse<CommRespDto> = service.joinWithbirth(data)
    suspend fun checkAccessToken(): ApiResponse<CommRespDto> = service.checkAccessToken()
    suspend fun checkRefreshToken(): ApiResponse<CommRespDto> = service.checkRefreshToken()
}