import React from "react";
import SearchFriend from "../components/SearchFriend";
import logo from "../assets/LOGO3.png";
import icon6 from "../assets/icon6.png";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/actions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;

  const profileImg = useSelector((state) => {
    return state.auth.userData.userProfile;
  });

  const userNo = useSelector((state) => {
    return state.auth.userData.userNo;
  });

  const logout = () => {
    // 카카오 로그아웃 요청
    axios
      .post(`${SERVER_API_URL}/user/logout/${userNo}`)
      .then(() => {
        // 로컬 토큰 제거
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");

        // authReducer를 통한 유저정보 삭제
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.error("로그아웃 실패: ", error);
      });
  };

  const handleClickLogo = () => {
    if (userNo) {
      navigate(`/user/${userNo}`);
      window.location.reload();
    }
  };
  const handleGoToSetting = () => {
    if (userNo) {
      navigate(`/profile-setting`);
      window.location.reload();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeLogoSize = isMediumScreen ? "200px" : "300px";
  const changeNavbarPosition = isMediumScreen ? "static" : "sticky";
  const changeNavbarBgColor = isMediumScreen ? "" : "white";
  const changeIconSize = isSmallScreen ? "60px" : "70px";

  return (
    <div
      className="nav-bar"
      style={{
        position: changeNavbarPosition,
        backgroundColor: changeNavbarBgColor,
        top: 0,
        zIndex: 999,
        paddingBottom: "10px",
        marginBottom: "25px",
      }}
    >
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid
          item
          container
          xs={3}
          justifyContent={"end"}
          className="logo-and-icon"
        >
          <Grid item container justifyContent={"center"} alignItems={"center"}>
            {isSmallScreen && (
              <img
                src={icon6}
                alt=""
                style={{
                  maxWidth: changeIconSize,
                  maxHeight: changeIconSize,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              />
            )}
            {!isSmallScreen && (
              <img
                src={logo}
                alt=""
                style={{
                  width: `${changeLogoSize}`,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={handleClickLogo}
              />
            )}
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={6}
          justifyContent={"flex-end"}
          className="search-friend-bar"
        >
          <Grid item xs={12} sm={10} md={7}>
            <SearchFriend />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={3}
          sm={2}
          lg={1}
          justifyContent={"flex-end"}
          className="nav-bar-profile"
        >
          <Grid
            container
            item
            xs={8}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Grid
              item
              container
              xs={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <img
                src={profileImg}
                alt="settingimg"
                className="nav-bar-settingimg"
                style={{
                  borderRadius: "35%",
                  maxWidth: changeIconSize,
                  maxHeight: changeIconSize,
                  cursor: "pointer",
                }}
                onClick={handleProfileMenuClick}
              />
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <MenuItem
                  onClick={handleClickLogo}
                  sx={{ fontSize: "20px", justifyContent: "center" }}
                >
                  마이 페이지
                </MenuItem>
                <MenuItem
                  onClick={handleGoToSetting}
                  sx={{ fontSize: "20px", justifyContent: "center" }}
                >
                  설정
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  sx={{ fontSize: "20px", justifyContent: "center" }}
                >
                  로그아웃
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default NavBar;
