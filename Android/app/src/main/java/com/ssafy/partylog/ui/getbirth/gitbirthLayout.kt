package com.ssafy.partylog.ui.getbirth

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.chargemap.compose.numberpicker.NumberPicker
import com.ssafy.partylog.ui.getbirth.state.PickerState
import com.ssafy.partylog.ui.getbirth.stateholder.PickerStateholder

@Composable
fun Getbirth() {
    Column {
        title()
        picker()
        button()
    }
}

@Composable
fun Title() {

}

@Composable
fun Picker() {
    val stateHolder = PickerStateholder()
    Row {
        NumberPicker(value = PickerState().yearVal,
            onValueChange = {PickerState().yearVal = it },
            range = stateHolder.getMinYear()..stateHolder.getMaxYear())
    }
}

@Composable
fun Button() {
}

@Composable
@Preview
fun GetBirthPrev() {
    Getbirth()
}