import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import MusicOffRoundedIcon from "@mui/icons-material/MusicOffRounded";
import ClapEmoji from "./ClapEmoji";
import HappyFace from "./HappyFace";

function ButtonGroups(props) {
  const {
    publisher,
    showFirework,
    handleFirework,
    handleClapEmoji,
    recieveClap,
    handleHappyFaces,
    recieveHappyFace,
    handleBirthdayMusic,
    showBirthdayMusic,
  } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const changeIconSize = isSmallScreen ? "35px" : "45px";
  const changeEmojiSize = isSmallScreen ? "25px" : "35px";

  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);

  const [happyFaces, setHappyFaces] = useState([]);

  useEffect(() => {
    if (happyFaces.length > 30) {
      setHappyFaces([]);
    }
    if (recieveHappyFace) {
      const newHappyFace = {
        id: Date.now(),
        left: Math.random() * 90 + 5,
      };
      setHappyFaces((prevEmojis) => [...prevEmojis, newHappyFace]);
    }
  }, [recieveHappyFace]);

  const [clapEmojis, setClapEmojis] = useState([]);

  useEffect(() => {
    if (clapEmojis.length > 30) {
      setClapEmojis([]);
    }
    if (recieveClap) {
      const newClapEmoji = {
        id: Date.now(),
        left: Math.random() * 90 + 5,
      };
      setClapEmojis((prevEmojis) => [...prevEmojis, newClapEmoji]);
    }
  }, [recieveClap]);

  const handleMicToggle = () => {
    publisher.publishAudio(isMicOn);
    setIsMicOn(!isMicOn);
  };
  const handleCamToggle = () => {
    publisher.publishVideo(isCamOn);
    setIsCamOn(!isCamOn);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFD9DF",
        border: "10px solid #9A4058",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        justifyContent={"space-evenly"}
        alignItems={"center"}
        style={{
          margin: "5px",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <Grid item>
          {isMicOn ? (
            <MicOffRoundedIcon
              sx={{
                fontSize: `${changeIconSize}`,
                cursor: "pointer",
                color: "gray",
              }}
              onClick={handleMicToggle}
            />
          ) : (
            <MicRoundedIcon
              sx={{ fontSize: `${changeIconSize}`, cursor: "pointer" }}
              onClick={handleMicToggle}
            />
          )}
        </Grid>
        <Grid item>
          {isCamOn ? (
            <VideocamOffRoundedIcon
              sx={{
                fontSize: `${changeIconSize}`,
                cursor: "pointer",
                color: "gray",
              }}
              onClick={handleCamToggle}
            />
          ) : (
            <VideocamRoundedIcon
              sx={{
                fontSize: `${changeIconSize}`,
                cursor: "pointer",
              }}
              onClick={handleCamToggle}
            />
          )}
        </Grid>
        <Grid item>
          {showBirthdayMusic ? (
            <MusicOffRoundedIcon
              sx={{
                fontSize: `${changeIconSize}`,
                cursor: "wait",
                color: "gray",
              }}
            />
          ) : (
            <MusicNoteRoundedIcon
              sx={{ fontSize: `${changeIconSize}`, cursor: "pointer" }}
              onClick={handleBirthdayMusic}
            />
          )}
        </Grid>

        <Grid item>
          <CelebrationRoundedIcon
            sx={{
              fontSize: `${changeIconSize}`,
              cursor: showFirework ? "wait" : "pointer",
              color: showFirework ? "gray" : "black",
            }}
            onClick={handleFirework}
          />
        </Grid>
        <Grid item>
          <span
            style={{ fontSize: `${changeEmojiSize}`, cursor: "pointer" }}
            onClick={handleHappyFaces}
          >
            🥰
          </span>
          {happyFaces &&
            happyFaces.map((happyFace) => (
              <HappyFace key={happyFace.id} left={happyFace.left} />
            ))}
        </Grid>
        <Grid item>
          <span
            style={{ fontSize: `${changeEmojiSize}`, cursor: "pointer" }}
            onClick={handleClapEmoji}
          >
            👏
          </span>
          {clapEmojis &&
            clapEmojis.map((clapEmoji) => (
              <ClapEmoji key={clapEmoji.id} left={clapEmoji.left} />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonGroups;
