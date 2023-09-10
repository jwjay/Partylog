import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Grid, createTheme, useMediaQuery } from "@mui/material";
import MessageDetailText from "./MessageDetailText";

// MessageModal 컴포넌트와 비슷한 구조

function MessageDetail(props) {
  const {
    modalDetailOpen,
    handleModalOpen,
    handleModalDetailClose,
    randomStickyNote,
    selectedMessage,
    myUserNo,
  } = props;

  const isMessageOwner =
    selectedMessage && myUserNo === selectedMessage.letter_writer
      ? true
      : false;

  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const modalHeight = isSmallScreen
    ? "70%"
    : isMediumScreen
    ? "60%"
    : isLargeScreen
    ? "50%"
    : "40%";

  const changeModalDetailVerticalPosition = isMediumScreen
    ? "40%"
    : isLargeScreen
    ? "30%"
    : "27%";

  const changeButtonFontSize = isMediumScreen
    ? "13px"
    : isLargeScreen
    ? "18px"
    : "23px";
  const changeButtonSize = isMediumScreen
    ? "80px"
    : isLargeScreen
    ? "100px"
    : "120px";

  const style = {
    position: "fixed",
    top: "27%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: modalHeight,
    height: "30%",
    minWidth: "300px",
    minHeight: "300px",
  };

  const handleFixModalText = () => {
    handleModalOpen();
    handleModalDetailClose();
  };

  return (
    <Modal
      open={modalDetailOpen}
      onClose={handleModalDetailClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, top: changeModalDetailVerticalPosition }}>
        <CloseRoundedIcon
          onClick={handleModalDetailClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "35px",
          }}
        />
        {modalDetailOpen && <Grid container>{randomStickyNote}</Grid>}
        <MessageDetailText
          detailMessage={selectedMessage}
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
          isSmallScreen={isSmallScreen}
        />

        {selectedMessage && isMessageOwner && (
          <Grid container justifyContent={"center"}>
            <Button
              className="message-close-button"
              type="submit"
              onClick={handleFixModalText}
              variant="contained"
              style={{
                position: "absolute",
                cursor: "pointer",
                color: "white",
                fontFamily: "MaplestoryOTFBold",
                width: changeButtonSize,
                fontSize: changeButtonFontSize,
                borderRadius: "50px",
                padding: "10px",
                transform: "translateY(-130%)",
              }}
            >
              수정
            </Button>
          </Grid>
        )}
      </Box>
    </Modal>
  );
}

export default MessageDetail;
