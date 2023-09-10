package com.ssafy.domain.usecase.login

import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class StoreIdUsecase @Inject constructor(private val loginRepository: LoginRepository) {
    operator fun invoke(id: Int) {
        loginRepository.storeId(id)
    }
}