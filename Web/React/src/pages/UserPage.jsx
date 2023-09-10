import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import "../css/UserPage.css";
import CountdownTimer from "../components/Timmer";
import MessageModal from "../components/MessageModal";
import NavBar from "../components/NavBar";
import UserFollowButton from "../components/UserFollowButton";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import { firework4 } from "../components/firework4";
import partyhat from "../assets/partyhat.png";
import MessageBoard from "../components/MessageBoard";
import axios from "axios";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  setModalData,
  addMyMessageData,
  getInitailMessagesList,
  saveUserData,
} from "../actions/actions";
import { logoutUser } from "../actions/actions";

const stickyNotes = [
  StickyNoteY,
  StickyNoteG,
  StickyNoteO,
  StickyNotePink,
  StickyNotePurple,
];

const getRandomStickyNote = () => {
  const randomIndex = Math.floor(Math.random() * stickyNotes.length);
  return stickyNotes[randomIndex];
};

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageOwner, setPageOwner] = useState(false);
  const [loading, setloading] = useState(true);
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const [userData, setUserData] = useState({});
  const myMessage = useSelector((state) => {
    return state.messagesData.myMessage;
  });
  const [followerCount, setFollowerCount] = useState("");
  const [followeeCount, setFolloweeCount] = useState("");
  const [todayIsBirthday, setTodayIsBirthday] = useState(false);

  const { userNo } = useParams();
  const myUserNo = useSelector((state) => {
    return state.auth.userNo;
  });

  //  추후 로컬스토리지에서 쿠키로 변경 예정
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");

  useEffect(
    () => {
      axios({
        method: "post",
        url: `${SERVER_API_URL}/user/board/${userNo}`,
        headers: {
          Authorization: `${accessToken}`,
        },
      })
        .then((res) => {
          const data = res.data.data;
          setUserData({
            userNo: data.userNo,
            userNickname: data.userNickname,
            userBirthday: data.userBirthday,
            userProfile: data.userProfile,
          });
          setFolloweeCount(data.followeeSum);
          setFollowerCount(data.followerSum);

          const lettersData = data.letterResponseBody;

          const addedMyMessage = lettersData.filter(
            (message) => parseInt(message.letter_writer) === parseInt(myUserNo)
          );
          if (addedMyMessage) {
            dispatch(addMyMessageData(addedMyMessage[0]));
          }

          const notMyMessages = lettersData.filter(
            (message) => message.letter_writer !== myUserNo
          );
          const newMessagesData = [...addedMyMessage, ...notMyMessages];
          dispatch(getInitailMessagesList(newMessagesData));

          // 본인 페이지면 받아온 데이터 저장
          if (parseInt(myUserNo) === parseInt(userNo)) {
            setPageOwner(true);
            dispatch(
              saveUserData(
                data.userNo,
                data.userNickname,
                data.userBirthday,
                data.userProfile
              )
            );
          } else {
            setPageOwner(false);
          }
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          dispatch(logoutUser());
          navigate("/");
          /* 추후 수정 예정 */
          // var response = err.response.data;
          // if(response.code === "J001") {
          //   console.log("액세스 토큰 재발급 필요");
          //   axios.get(`${SERVER_API_URL}/user/recreateAccessToken`,
          //   {
          //     headers: {
          //       'Authorization': refreshToken,
          //      }
          //   })
          //   .then(res => {
          //     console.log("액세스 토큰 재발급 성공");
          //     localStorage.setItem("access-token", res.headers.get("authorization"));
          //     setloading(false);
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //     var response = err.response.data;
          //     if(response.code === "J001") {
          //       console.log("리프레시 토큰 만료");
          //       dispatch(logoutUser());
          //       localStorage.clear();
          //       alert("다시 로그인 해주세요");
          //       navigate("/");
          //     } else {
          //       alert(response.message);
          //       dispatch(logoutUser());
          //       localStorage.clear();
          //       navigate("/");
          //     }
          //   })
          // } else {
          //   alert("문제가 발생했습니다.");
          //   localStorage.clear();
          //   navigate("/");
          // }
        });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 생일이면 폭죽 효과

  useEffect(() => {
    let interval;

    if (todayIsBirthday) {
      interval = setInterval(() => {
        firework4();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [todayIsBirthday]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //
  // props로 위의 화면 크기에 대한 값을 하위 컴포넌트에 전달해서 크기 바뀌게 하기 가능
  // 해당 크기를 경곗값으로 하여 삼항연산으로 작성하면 breaking point 기준으로 바뀌게 할 수 있음

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    if (myMessage) {
      dispatch(setModalData(myMessage.letter_title, myMessage.letter_content));
    }
    setModalOpen(true);
    setRandomStickyNote(getRandomStickyNote());
  };
  const handleModalClose = () => setModalOpen(false);

  // 생일자 라이브 스타트
  const handleLiveStartButton = (event) => {
    window.open(`/live/${userNo}`, "_blank");
  };

  // 참가자 라이브 참가
  const handleLiveAttendButton = (event) => {
    window.open(`/live/${userNo}`, "_blank");
  };

  const handleToProfileSetting = (event) => {
    if (pageOwner) {
      navigate("/profile-setting");
    }
  };

  const changeProfileImgSize = isSmallScreen ? "200px" : "250px";
  const changeLiveButtonFontSize = isSmallScreen ? "18px" : "25px";
  const changeLiveButtonHeight = isSmallScreen ? "50px" : "70px";
  const changeLiveButtonLineHeight = isSmallScreen ? "23px" : "30px";
  const changeLiveButtonWidth = isSmallScreen ? "150px" : "180px";
  const changeMessageButtonFontSize = isSmallScreen ? "15px" : "20px";
  const changeFollowButtonFontSize = isSmallScreen ? "15px" : "18px";
  const addMarginAboveBoard = isMediumScreen ? "20px" : "";

  // 노트북으로만 개발하느라 몰랐는데, height값을 지정해서 작성하니 모니터가 커지니까 아랫 공간이 남게 됨.
  // height 값을 직접 설정하기보다 vh, vw로 설정해서 반응형으로 설정하던가, 아예 반응형이 아니게 작성하던가 해야할 듯.

  // 로딩 중일 시 띄우는 컴포넌트
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="UserPageBody">
        <NavBar />
        <Grid container spacing={1} className="UserPage">
          <Grid
            container
            item
            xs={12}
            md={4}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ height: "80vh" }}
          >
            <div>
              <Grid
                container
                direction="column"
                className="UserPage-profile"
                alignItems={"center"}
                justifyContent={"space-evenly"}
              >
                <Grid item container justifyContent={"center"}>
                  <Grid
                    container
                    item
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={"column"}
                    sm={11}
                  >
                    {todayIsBirthday && (
                      <div className="party-hat">
                        <img
                          src={partyhat}
                          alt="partyhat"
                          className="party-hat-icon"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform:
                              "translateX(-15%) translateY(-55%) rotate(12deg)",
                            width: "100px",
                            zIndex: 1,
                          }}
                        />
                      </div>
                    )}

                    <img
                      src={userData.userProfile}
                      alt="profileimg"
                      className="UserPage-profileimg"
                      style={{
                        width: changeProfileImgSize,
                        maxWidth: "250px",
                        height: changeProfileImgSize,
                        maxHeight: "250px",
                        objectFit: "fill",
                        cursor: pageOwner ? "pointer" : "default",
                      }}
                      onClick={handleToProfileSetting}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <p
                    className="UserPage-nickname"
                    style={{ textAlign: "center" }}
                  >
                    <span
                      style={{
                        fontSize:
                          userData.userNickname.length > 10
                            ? userData.userNickname.length > 15
                              ? "20px"
                              : "25px"
                            : "none",
                      }}
                    >
                      {userData.userNickname}
                    </span>{" "}
                    <span style={{ fontSize: "20px" }}>#{userData.userNo}</span>
                  </p>
                  {!pageOwner && (
                    <UserFollowButton
                      setFollowerCount={setFollowerCount}
                      pageOwner={pageOwner}
                      myUserNo={myUserNo}
                      userNo={userNo}
                      accessToken={accessToken}
                      SERVER_API_URL={SERVER_API_URL}
                      changeFollowButtonFontSize={changeFollowButtonFontSize}
                      changeLiveButtonWidth={changeLiveButtonWidth}
                    />
                  )}
                </Grid>
                <Grid item>
                  <Link to={`/myfriend/${userNo}`} className="myLink">
                    <p className="UserPage-follow" style={{ fontSize: "15px" }}>
                      팔로잉&nbsp;
                      {followeeCount}
                      &nbsp;|&nbsp; 팔로워&nbsp;
                      {followerCount}
                    </p>
                  </Link>
                </Grid>
                <Grid item>
                  <CountdownTimer
                    userBirthday={userData.userBirthday}
                    todayIsBirthday={todayIsBirthday}
                    setTodayIsBirthday={setTodayIsBirthday}
                    pageOwner={pageOwner}
                  />
                </Grid>
                <Grid item>
                  {pageOwner ? (
                    <Button
                      className="live-button"
                      onClick={handleLiveStartButton}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeLiveButtonFontSize,
                        color: "white",
                        width: changeLiveButtonWidth,
                        height: changeLiveButtonHeight,
                        lineHeight: changeLiveButtonLineHeight,
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        marginTop: "20px",
                      }}
                      disabled={!todayIsBirthday}
                    >
                      {!todayIsBirthday ? (
                        <>
                          아직 생일이
                          <br />
                          아니예요!
                        </>
                      ) : (
                        <>
                          라이브
                          <br />
                          시작
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="live-button"
                      onClick={handleLiveAttendButton}
                      variant="contained"
                      style={{
                        fontFamily: "MaplestoryOTFBold",
                        fontSize: changeLiveButtonFontSize,
                        color: "white",
                        width: changeLiveButtonWidth,
                        height: changeLiveButtonHeight,
                        lineHeight: changeLiveButtonLineHeight,
                        borderRadius: "40px",
                        texShadow: "0.1px 0.1px 4px #e892a4",
                        marginTop: "20px",
                      }}
                      disabled={!todayIsBirthday}
                    >
                      {!todayIsBirthday ? (
                        <>
                          아직 생일이
                          <br />
                          아니예요!
                        </>
                      ) : (
                        <>
                          라이브
                          <br />
                          참가
                        </>
                      )}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={7}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ marginTop: addMarginAboveBoard, height: "80vh" }}
          >
            <Grid item xs={12}>
              <MessageBoard
                pageOwner={pageOwner}
                userNo={userNo}
                myUserNo={myUserNo}
                myMessage={myMessage}
                handleModalOpen={handleModalOpen}
                changeMessageButtonFontSize={changeMessageButtonFontSize}
                todayIsBirthday={todayIsBirthday}
              />
            </Grid>
          </Grid>
          <Grid item lg={1}>
            <div></div>
          </Grid>
        </Grid>
        <MessageModal
          myMessage={myMessage ? myMessage : null}
          userNo={userNo}
          pageOwner={pageOwner}
          myUserNo={myUserNo}
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          randomStickyNote={randomStickyNote}
          isMediumScreen={isMediumScreen}
          isLargeScreen={isLargeScreen}
        />
      </div>
    );
  }
}

export default UserPage;
