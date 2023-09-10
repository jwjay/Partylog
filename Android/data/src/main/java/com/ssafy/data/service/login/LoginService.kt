package com.ssafy.data.service.login

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.req.JoinReqDto
import com.ssafy.data.model.login.resp.CommRespDto
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface LoginService {
    @GET("user/mobile/login")
    suspend fun kakaoLogin(
        @Query("token") token: String
    ): ApiResponse<CommRespDto>

    @POST("user/join")
    suspend fun joinWithbirth(
        @Body data: JoinReqDto
    ): ApiResponse<CommRespDto>

    @GET("user/mobile/tokenCheck")
    suspend fun checkAccessToken(): ApiResponse<CommRespDto>

    @POST("user/recreateAccesstoken")
    suspend fun checkRefreshToken(): ApiResponse<CommRespDto>
}