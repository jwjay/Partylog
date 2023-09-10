package com.ssafy.domain.usecase.login

import com.ssafy.domain.model.login.req.JoinWithBirthReq
import com.ssafy.domain.model.login.resp.JoinWithBirthResp
import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class JoinWithBirthUsecase @Inject constructor(private val repository: LoginRepository) {
    suspend operator fun invoke(dto: JoinWithBirthReq): JoinWithBirthResp {
        return repository.joinWithBirth(dto)
    }
}