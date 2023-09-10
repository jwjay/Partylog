package com.ssafy.partylog.ui.login.stateholder

import android.content.Context
import com.ssafy.partylog.util.Util

class LoginFrameStateHolder(private val viewModel: LoginViewModel) {
    fun onKakaoSelected(context: Context) {
        Util(viewModel).kakaoLogin(context)
    }
}