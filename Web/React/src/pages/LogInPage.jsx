import React, { useEffect } from "react";
import kakaoButton from "../assets/kakao_login.svg";
import googleplay from "../assets/googleplay.png";
import "../css/LogInPage.css";
import { Grid, Container, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  /* 자동 로그인 추후에 개발 */
  // const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => {
  //   return state.auth.isAuthenticated;
  // });
  // const userNo = useSelector((state) => {
  //   return state.auth.userNo;
  // })

  // useEffect(() => {
  //   console.log("로그인 여부: " + isAuthenticated);
  //   if(isAuthenticated) {
  //     navigate(`/user/${userNo}`);
  //   }
  // })

  const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handlekakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const styles = [
    {
      color: "hsl(50, 75%, 55%)",
      textShadow:
        "1px 1px 2px hsl(50, 75%, 45%), 2px 2px 2px hsl(50, 45%, 45%), 3px 3px 2px hsl(50, 45%, 45%), 4px 4px 2px hsl(50, 75%, 45%)",
    },
    {
      color: "hsl(135, 35%, 55%)",
      textShadow:
        "1px 1px 2px hsl(135, 35%, 45%), 2px 2px 2px hsl(135, 35%, 45%), 3px 3px 2px hsl(135, 35%, 45%), 4px 4px 2px hsl(135, 35%, 45%)",
    },
    {
      color: "hsl(155, 35%, 60%)",
      textShadow:
        "1px 1px 2px hsl(155, 25%, 50%), 2px 2px 2px hsl(155, 25%, 50%), 3px 3px 2px hsl(155, 25%, 50%), 4px 4px 2px hsl(140, 25%, 50%)",
    },
    {
      color: "hsl(30, 65%, 60%)",
      textShadow:
        "1px 1px 2px hsl(30, 45%, 50%), 2px 2px 2px hsl(30, 45%, 50%), 3px 3px 2px hsl(30, 45%, 50%), 4px 4px 2px hsl(30, 45%, 50%)",
    },
  ];

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const loginWindowPadding = isSmallScreen
    ? "5px"
    : isMediumScreen
    ? "10px"
    : isLargeScreen
    ? "15px"
    : "20px";

  const loginButtonMargin = isSmallScreen
    ? "30px"
    : isMediumScreen
    ? "30px"
    : isLargeScreen
    ? "25px"
    : "40px";

  const titlePadding = isSmallScreen
    ? "80px"
    : isMediumScreen
    ? "50px"
    : isLargeScreen
    ? "20px"
    : "0";

  const titleFontSize = isSmallScreen
    ? 'bold 11vw/1.9 "Signika", sans-serif'
    : isMediumScreen
    ? 'bold 9vw/1.7 "Signika", sans-serif'
    : 'bold 7vw/1.5 "Signika", sans-serif';

  const word1 = "PartyLog".split("").map((char, index) => (
    <span key={index} style={styles[index % 4]}>
      {char}
    </span>
  ));
  const word2 = "HAPPY BIRTHDAY!".split("").map((char, index) => (
    <span key={index} style={styles[index % 4]}>
      {char}
    </span>
  ));
  return (
    <Container maxWidth={false}>
      <div className="loginpage-container">
        <div className="loginpage-content" id="content">
          <div
            className="loginpage-title"
            style={{ padding: `${titlePadding} 0` }}
          >
            <Grid container justifyContent={"center"}>
              <Grid item>
                <div className="logo">
                  <h1
                    id="PartyLog"
                    className="loginpage-h1"
                    style={{ font: titleFontSize }}
                  >
                    {word1}
                  </h1>
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <div className="animated-happybirthday">
                  <h1 className="loginpage-h1" style={{ font: titleFontSize }}>
                    {word2}
                  </h1>
                </div>
              </Grid>
            </Grid>
          </div>
          <Grid container justifyContent={"center"}>
            <Grid item xs={6} sm={5} md={4} lg={3}>
              <div
                className="login-window"
                style={{
                  border: "1px solid #fbb3c2",
                  borderRadius: "30px",
                  backgroundColor: "#f5e7e9",
                  boxShadow: "1px 1px 20px #d38494",
                  padding: loginWindowPadding,
                  marginTop: "30px",
                }}
              >
                <div
                  style={{
                    marginBottom: loginButtonMargin,
                    marginTop: loginButtonMargin,
                  }}
                >
                  <Grid container justifyContent={"center"}>
                    <Grid item container xs={10} justifyContent={"center"}>
                      <div className="kakao-button">
                        <img
                          src={kakaoButton}
                          onClick={handlekakaoLogin}
                          alt="Kakao Login"
                          style={{
                            boxShadow: "1px 1px 30px #fbb3c2",
                            borderRadius: "20px",
                          }}
                          className="loginpage-img"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <hr
                  style={{
                    border: "1px solid #fbb3c2",
                    margin: "10px 0",
                  }}
                />
                <div
                  className="loginpage-app-download"
                  style={{ padding: "10px 0 0 0" }}
                >
                  <Grid container justifyContent={"center"}>
                    <Grid
                      item
                      container
                      xs={8}
                      sm={10}
                      justifyContent={"center"}
                    >
                      <div className="loginpage-download-container">
                        <img
                          src={googleplay}
                          alt="Download on Google Play"
                          className="loginpage-img"
                          style={{
                            maxWidth: "200px",
                            boxShadow: "1px 1px 30px #fbb3c2",
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};
export default LogInPage;
