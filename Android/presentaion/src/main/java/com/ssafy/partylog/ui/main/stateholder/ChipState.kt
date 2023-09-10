package com.ssafy.partylog.ui.main.stateholder

import androidx.compose.runtime.MutableState

data class ChipState(
    var year: String,
    var isSelected: MutableState<Boolean>
)
