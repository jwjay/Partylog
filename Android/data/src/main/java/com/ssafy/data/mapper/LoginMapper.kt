package com.ssafy.data.mapper

import com.ssafy.data.model.login.resp.CommRespDto
import com.ssafy.domain.model.login.req.JoinWithBirthReq
import com.ssafy.domain.model.login.resp.CheckBirth
import com.ssafy.domain.model.login.resp.JoinWithBirthResp

object LoginMapper {
    fun KakaoCheckRespDtoToCheckBirth(dto: CommRespDto): CheckBirth {
        return CheckBirth(code = Integer.parseInt(dto.code), id = dto.data)
    }

    fun joinWithBirthToJoin(dto: CommRespDto): JoinWithBirthResp {
        return JoinWithBirthResp(code = Integer.parseInt(dto.code), id = dto.data)
    }
}