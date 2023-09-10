import { CircularProgress } from "@mui/material";
import React from "react";
import icon6 from "../assets/icon6.png";
import { Grid } from "@mui/material";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Grid
          container
          item
          xs={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img src={icon6} alt="" style={{ maxWidth: "80%", height: "auto" }} />
        </Grid>
        <Grid>
          <CircularProgress color="primary" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Loading;
