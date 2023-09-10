import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cake from "../assets/Cake.png";
import "../css/BirthdayInput.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { firework } from "../components/firework";

function BirthdayInput(props) {
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  firework();
  const navigate = useNavigate();

  const { userNo } = useParams();
  var [birthday, setbirthday] = useState("");

  const changeBirthday = (date) => {
    const selectedDate = date.$d; // 선택한 날짜 객체 가져오기
    const nextDate = new Date(selectedDate); // 선택한 날짜를 기반으로 새로운 날짜 객체 생성
    nextDate.setDate(selectedDate.getDate() + 1); // 선택한 날짜에 1일 추가
    setbirthday(nextDate.toISOString().split("T")[0]);
  };

  const join = () => {
    axios
      .post(`${SERVER_API_URL}/user/join`, {
        userNo: userNo,
        userBirthday: birthday,
      })
      .then((res) => {
        if (res.data.code === "200") {
          var userNo = res.data.data;
          // 토큰 저장
          localStorage.setItem(
            "access-token",
            res.headers.get("authorization")
          );
          localStorage.setItem(
            "refresh-token",
            res.headers.get("refresh-token")
          );
          navigate(`/user/${userNo}`);
        } else {
          console.log("회원가입에 실패했습니다.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="center">
      <Grid container>
        <Grid item xs={12}>
          <h1 className="loginpage-h1">Partylog</h1>
        </Grid>
        <Grid item xs={12}>
          <h2 style={{ fontFamily: "MaplestoryOTFLight" }}>
            서비스 이용을 위해 생일을 입력해주세요!
          </h2>
        </Grid>
        <Grid item xs={12}>
          <h4>(가입 시 한 번만 입력합니다!)</h4>
        </Grid>
        <Grid item xs={12} margin={"10px"}>
          <img src={Cake} alt="Birthday Cake!!" className="cake-image" />
        </Grid>
        <Grid item xs={12} margin={"10px"}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY / MM / DD"
              value={birthday}
              onChange={(date) => changeBirthday(date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ fontFamily: "MaplestoryOTFBold" }}
            className="submit-button"
            onClick={join}
          >
            제출
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default BirthdayInput;
