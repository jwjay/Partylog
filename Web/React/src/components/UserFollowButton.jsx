import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Grid } from "@mui/material";

function UserFollowButton(props) {
  const {
    userNo,
    setFollowerCount,
    accessToken,
    SERVER_API_URL,
    changeFollowButtonFontSize,
    changeLiveButtonWidth,
  } = props;

  const [isFollowed, setIsFollowed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getFollowerCount = () => {
    axios({
      method: "get",
      url: `${SERVER_API_URL}/user/getFollowerNumber/${userNo}`,
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => {
        setFollowerCount(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${SERVER_API_URL}/user/checkFollow/${userNo}`,
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => {
        setIsFollowed(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleMouseEnterToCancel = () => {
    setIsHovered(true);
  };
  const handleMouseLeaveToCancel = () => {
    setIsHovered(false);
  };

  const handleUserFollow = () => {
    axios({
      method: "post",
      url: `${SERVER_API_URL}/user/addFollow/${userNo}`,
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => {
        setIsFollowed(true);
        getFollowerCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancelUserFollow = () => {
    axios({
      method: "delete",
      url: `${SERVER_API_URL}/user/removeFollow/${userNo}`,
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((res) => {
        setIsFollowed(false);
        getFollowerCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      {isFollowed ? (
        <Button
          className="following-button"
          onClick={handleCancelUserFollow}
          onMouseEnter={handleMouseEnterToCancel} // 마우스가 위에 올라갈 때
          onMouseLeave={handleMouseLeaveToCancel} // 마우스가 벗어날 때
          variant="contained"
          color={isHovered ? "error" : "primary"}
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: changeFollowButtonFontSize,
            color: isHovered ? "white" : "#535353",
            backgroundColor: isHovered ? "" : "#ffffff",
            width: changeLiveButtonWidth,
            borderRadius: "40px",
            textShadow: isHovered
              ? "0.1px 0.1px 4px #e892a4"
              : "0.1px 0.1px 0.5px #e892a4",
            boxSizing: "border-box",
          }}
        >
          {isHovered ? <span>팔로우 해제</span> : <span>팔로잉</span>}
        </Button>
      ) : (
        <Button
          className="follow-button"
          onClick={handleUserFollow}
          variant="contained"
          // color="primary"
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: changeFollowButtonFontSize,
            width: changeLiveButtonWidth,
            color: "white",
            borderRadius: "40px",
            textShadow: "0.1px 0.1px 4px #e892a4",
            boxSizing: "border-box",
          }}
        >
          팔로우
        </Button>
      )}
    </Grid>
  );
}

export default UserFollowButton;
