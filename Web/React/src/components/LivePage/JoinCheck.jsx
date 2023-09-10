import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";

function JoinCheck(props) {
  const { setIsJoinCheck } = props;

  useEffect(() => {
    const bodyToDark = document.querySelector("body");
    bodyToDark.classList.add("live-page");

    return () => {
      bodyToDark.classList.remove("live-page");
    };
  }, []);

  const handleJoinButton = () => {
    setIsJoinCheck(true);
  };

  const handleExitButton = () => {
    window.close();
  };

  return (
    <Grid
      container
      justifyContent={"space-evenly"}
      alignItems={"center"}
      style={{ height: "100vh" }}
    >
      <Grid
        item
        container
        xs={10}
        md={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: "40px",
            color: "white",
            width: "100%",
            height: "150px",
            borderRadius: "40px",
            texShadow: "0.1px 0.1px 4px #e892a4",
          }}
          onClick={handleJoinButton}
        >
          참가
        </Button>
      </Grid>
      <Grid
        item
        container
        xs={10}
        md={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          style={{
            fontFamily: "MaplestoryOTFBold",
            fontSize: "40px",
            color: "white",
            width: "100%",
            height: "150px",
            borderRadius: "40px",
            texShadow: "0.1px 0.1px 4px #e892a4",
          }}
          onClick={handleExitButton}
        >
          나가기
        </Button>
      </Grid>
    </Grid>
  );
}

export default JoinCheck;
