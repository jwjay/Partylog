import React from "react";
import StickyNote1 from "../assets/Sticky-Note-01-Yellow.png";
import { Grid } from "@mui/material";
// import { useNavigate } from "react-router";

function MessageOnBoard(props) {
  const { message, onClick, pageOwner, myUserNo } = props;

  const getLength = (messageText, maxLength) => {
    if (messageText.length > maxLength) {
      return messageText.slice(0, maxLength) + "...";
    }
    return messageText;
  };

  // 보드 위의 메시지 닉네임이나 프로필 이미지를 누르면 그 살마 페이지로 이동 가능한 함수
  // 막상 넣어보니까 메시지 열어 보려다가 이동할 것 같아서 주석처리.. 필요하면 다시 풀고 사용

  // const navigate = useNavigate();

  // const handleGoToMessageUser = () => {
  //   if (message.letter_writer) {
  //     navigate(`/user/${message.letter_writer}`);
  //     window.location.reload();
  //   }
  // };

  return (
    <div
      style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "100%",
        height: "100%",
        cursor: `${
          pageOwner || parseInt(myUserNo) === parseInt(message.letter_writer)
            ? "pointer"
            : "default"
        }`,
      }}
      onClick={onClick}
    >
      <img
        src={StickyNote1}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%", // 위에서부터 위치를 조정
          left: "50%", // 왼쪽에서부터 위치를 조정
          transform: "translate(-50%, -50%)",
          textAlign: "start",
          fontSize: "15px",
          fontWeight: "bold",
          color: "black",
          overflow: "hidden",
          width: "80%",
        }}
      >
        <Grid
          container
          justifyContent={"center"}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            item
            container
            xs={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              src={message.user_profile && message.user_profile}
              alt=""
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            />{" "}
          </Grid>
          <Grid
            item
            xs={7}
            lg={9}
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              textAlign: "start",
            }}
          >
            &nbsp;&nbsp;&nbsp;
            {message.user_nickname && getLength(message.user_nickname, 10)}
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%", // 위에서의 위치를 조정
          left: "50%", // 왼쪽에서의 위치를 조정
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "17px",
          fontWeight: "bold",
          color: "black",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "80%",
          marginTop: "15px",
        }}
      >
        {message.letter_title && getLength(message.letter_title, 15)}
      </div>
    </div>
  );
}

export default MessageOnBoard;
