import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";
import { Modal, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import FollowTabs from "../components/FollowTabs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { firework2 } from "../components/firework2";
import "../css/PartyHat.css";
import crown from "../assets/crown.png";

const Box1 = styled(Box)(({ theme }) => ({
  backgroundColor: "#fbb3c2",
  borderRadius: "30px",
  padding: theme.spacing(2),
  height: "500px",
}));

function MyFriend(props) {
  const [todayIsBirthday, setTodayIsBirthday] = useState(false);
  const [userBirthday, setUserBirthday] = useState(null);

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");
  const MyuserNum = useSelector((state) => {
    return state.auth.userData.userNo;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { userNum } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const [userNickname, setUserNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [followings, setFollowings] = useState([]); // 팔로잉 목록을 저장할 상태 추가
  const [modalMessage, setModalMessage] = useState("");
  const [hoveringFollowButton, setHoveringFollowButton] = useState(false); // 팔로우 버튼에 마우스를 올렸는지 여부를 저장할 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${SERVER_API_URL}/user/board/${userNum}`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        if (response.data && response.data.data) {
          setUserNickname(response.data.data.userNickname);
          setProfileImg(response.data.data.userProfile);
          setUserBirthday(response.data.data.userBirthday);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchFollowers();
  }, [userNum]);

  useEffect(() => {
    if (userBirthday) {
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
    }
  }, [userBirthday]);

  const fetchFollowers = () => {
    const followersRequestBody = {
      followerNo: MyuserNum,
      limit: 30,
      offset: 0,
    };
    axios
      .post(`${SERVER_API_URL}/user/searchFolloweeList`, followersRequestBody, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        const isUserFollowed = response.data.data.some(
          (follower) => follower.user_no === userNum
        );
        setIsFollowing(isUserFollowed);
      })
      .catch((error) => {
        console.error("팔로워 목록을 가져오는 중 오류 발생:", error);
      });
  };

  const handleFollow = async () => {
    try {
      await axios.post(
        `${SERVER_API_URL}/user/addFollow/${userNum}`,
        { followeeNo: userNum },
        { headers: { Authorization: `${accessToken}` } }
      );
      setIsFollowing(true);
      setModalMessage("팔로우 감사합니다!");
      setModalOpen(true); // 팔로우 성공 시 모달을 보여줍니다.
      firework2(); //  firework 함수를 호출
      setTimeout(() => {
        setModalOpen(false);
        window.location.reload();
      }, 1500); // 1.5초 후에 모달을 닫고 페이지를 새로고침합니다.
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = (followeeNo) => {
    axios
      .delete(`${SERVER_API_URL}/user/removeFollow/${followeeNo}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      })
      .then(() => {
        setIsFollowing(false);
        setFollowings(
          followings.filter((following) => following.user_no !== followeeNo)
        );
        setModalMessage("슬퍼요, 다음에 다시 만나요!");
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("팔로우 해제 중 오류 발생:", error);
      });
  };

  const navigate = useNavigate();
  const handleClickNickname = () => {
    navigate(`/user/${userNum}`);
  };

  return (
    <div>
      <NavBar />
      <div>
        <Grid container spacing={2} justifyContent={"space-evenly"}>
          <Grid
            container
            item
            xs={12}
            md={3}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ position: "relative" }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {todayIsBirthday && (
                <div className="party-hat">
                  <img
                    src={crown}
                    alt="crown"
                    className="party-hat-icon"
                    style={{
                      position: "absolute",
                      top: "-80px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "180px",
                      zIndex: 1,
                    }}
                  />
                </div>
              )}
              <img
                src={profileImg}
                alt="profileimg"
                className="UserPage-profileimg"
                style={{
                  minWidth: "240px",
                  minHeight: "240px",
                  width: "auto",
                  height: "25vh",
                }}
              />

              <p
                className="UserPage-nickname"
                onClick={handleClickNickname}
                style={{ cursor: "pointer" }}
              >
                <span>{userNickname}</span>{" "}
                <span style={{ fontSize: "20px" }}>#{userNum}</span>
              </p>

              {parseInt(userNum) !== MyuserNum && (
                <Button
                  onMouseEnter={() => setHoveringFollowButton(true)}
                  onMouseLeave={() => setHoveringFollowButton(false)}
                  onClick={() => {
                    if (isFollowing) {
                      handleUnfollow(userNum);
                    } else {
                      handleFollow();
                    }
                  }}
                  className="live-button" // 두 클래스 이름을 추가합니다.
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    fontSize: 20,
                    color: "white",
                    lineHeight: "30px",
                    borderRadius: "40px",
                    texShadow: "0.1px 0.1px 4px #e892a4",
                    marginTop: "10px",
                  }}
                >
                  {isFollowing
                    ? hoveringFollowButton
                      ? "팔로우 해제"
                      : "팔로우됨"
                    : "팔로우"}
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box1>
              <div className="follow-tabs-background">
                <FollowTabs userNum={userNum} MyuserNum={MyuserNum} />
              </div>
            </Box1>
          </Grid>
        </Grid>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" align="center">
              {modalMessage}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MyFriend;
