package com.ssafy.domain.usecase.login

import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class GetidUsecase @Inject constructor(private val loginRepository: LoginRepository) {
    operator fun invoke(): Int {
        return loginRepository.getId()
    }
}