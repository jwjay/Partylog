package com.ssafy.partylog.ui.getbirth.stateholder

import com.ssafy.partylog.ui.getbirth.state.PickerState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Calendar

class PickerStateholder {
    private val _uiState = MutableStateFlow(PickerState())
    var uiState: StateFlow<PickerState> = _uiState.asStateFlow()

    fun setVal() {
        Calendar.getInstance().get(Calendar.YEAR)
    }

    fun getMaxYear(): Int = Calendar.getInstance().get(Calendar.YEAR)
    fun getMinYear(): Int = Calendar.getInstance().get(Calendar.YEAR) - 150
}