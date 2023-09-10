import React, { useEffect } from "react";
import { Grid } from "@mui/material";

// 시간이 되면 열리는걸 TimePicker를 이용해서 하려다 임시 중지

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const CountdownTimer = (props) => {
  const { userBirthday, todayIsBirthday, setTodayIsBirthday, pageOwner } =
    props;

  // 시간이 되면 열리는걸 TimePicker를 이용해서 하려다 임시 중지

  // const [targetTime, setTargetTime] = useState("00:00");
  // const [leftBirthdayTime, setLeftBirthdayTime] = useState(
  //   new Date(userBirthday)
  // );

  // const handleTimeChange = (event) => {
  //   const selectedTime = event.$d;
  //   console.log(selectedTime);
  //   console.log(event);
  //   const hours = selectedTime.getHours();
  //   const minutes = selectedTime.getMinutes();

  //   const newLeftBirthdayTime = new Date(leftBirthdayTime);
  //   newLeftBirthdayTime.setHours(hours);
  //   newLeftBirthdayTime.setMinutes(minutes);

  //   setTargetTime(
  //     `${hours.toString().padStart(2, "0")}:${minutes
  //       .toString()
  //       .padStart(2, "0")}`
  //   );
  //   setLeftBirthdayTime(newLeftBirthdayTime);
  // };

  const calculateTimeLeft = (targetDate) => {
    const currentDate = new Date();

    // 현재 연도로 사용자의 생일 설정
    targetDate.setFullYear(currentDate.getFullYear());

    let diff = +targetDate - +currentDate;
    let timeLeft = {};

    if (diff <= 0) {
      // 이미 올해의 생일이 지났다면, 다음 해의 생일로 설정
      targetDate.setFullYear(currentDate.getFullYear() + 1);
      diff = +targetDate - +currentDate;
    }

    timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    return timeLeft;
  };

  // 시간이 되면 열리는걸 TimePicker를 이용해서 하려다 임시 중지

  // const [timeLeft, setTimeLeft] = useState(
  //   calculateTimeLeft(new Date(userBirthday))
  // );

  const timeLeftBirthday = calculateTimeLeft(new Date(userBirthday));

  // 시간이 되면 열리는걸 TimePicker를 이용해서 하려다 임시 중지

  // useEffect(() => {
  //   const [hours, minutes] = targetTime.split(":");
  //   const newDate = new Date(userBirthday);
  //   newDate.setHours(parseInt(hours, 10));
  //   newDate.setMinutes(parseInt(minutes, 10));
  //   setTimeLeft(calculateTimeLeft(newDate));
  // }, [targetTime, userBirthday]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(calculateTimeLeft(new Date(leftBirthdayTime)));
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [
  //   timeLeft,
  //   //  targetTime,
  //   leftBirthdayTime,
  // ]);

  useEffect(() => {
    const todayDate = new Date();
    const birthdayDate = new Date(userBirthday);

    if (
      todayDate.getMonth() === birthdayDate.getMonth() &&
      todayDate.getDate() === birthdayDate.getDate()
    ) {
      setTodayIsBirthday(true);
    } else {
      setTodayIsBirthday(false);
    }
  }, [userBirthday, setTodayIsBirthday]);

  // 시간을 고르고, 그 시간까지의 카운트다운, 그 시간에 방송할거라는 알림 이라는 기능이 추후에 만들어야하는 것.

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      {/* 시간 골라서 파티 열리는 알림은 일단 나중에 확장으로 */}
      {/* {pageOwner && (
        <Grid item style={{ marginBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="파티 시간을 골라주세요!"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                format="A hh:mm"
                onChange={handleTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      )} */}

      <Grid item>
        {todayIsBirthday ? (
          <div style={{ textAlign: "center", fontSize: pageOwner && "30px" }}>
            오늘이 생일!!
          </div>
        ) : (
          <div style={{ textAlign: "center", fontSize: pageOwner && "30px" }}>
            생일까지
            <br />
            {timeLeftBirthday.days !== 0 && `${timeLeftBirthday.days}일`}
            {timeLeftBirthday.days < 1 && (
              <span>
                {timeLeftBirthday.hours !== 0 &&
                  `${timeLeftBirthday.hours}시간`}{" "}
                {timeLeftBirthday.minutes !== 0 &&
                  `${timeLeftBirthday.minutes}분`}{" "}
              </span>
            )}
            <br />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default CountdownTimer;
