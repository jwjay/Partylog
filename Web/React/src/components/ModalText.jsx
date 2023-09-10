import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { Grid, TextField, createTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material";

const StyledTextarea = styled(TextField)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    width: 100%;
    background: transparent;
    };

    & .MuiInputBase-input:focus {
      outline: none; /* 입력 요소가 포커스를 받을 때 포커스 테두리를 제거합니다. */
  `
);

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  marginTop: "20px",
};

function ModalText(props) {
  const theme = createTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const textMaxRow = isMediumScreen ? "2" : isLargeScreen ? "3" : "7";

  const titleMargin = isSmallScreen
    ? "10px"
    : isMediumScreen
    ? "20px"
    : isLargeScreen
    ? "30px"
    : "40px";

  const { modalTitle, modalDescription, onChangeModalText } = props;

  const handleChangeTitle = (event) => {
    const { value } = event.target;
    if (value.length > 10) {
      alert("제목은 10자까지 입력 가능합니다.");
    }
    const truncatedValue = value.slice(0, 10);
    onChangeModalText(truncatedValue, modalDescription);
  };

  const handleChangeDescription = (event) => {
    const { value } = event.target;
    if (value.length > 200) {
      alert("내용은 200자까지 입력 가능합니다.");
    }
    const truncatedValue = value.slice(0, 200);
    onChangeModalText(modalTitle, truncatedValue);
  };

  return (
    <div style={style}>
      <Grid container>
        <Grid item xs={12}>
          <Typography id="modal-modal-title" variant="p">
            제목 (최대 10자)
          </Typography>
        </Grid>
        <Grid container item xs={12} marginBottom={titleMargin}>
          <StyledTextarea
            maxRows={1}
            multiline
            variant="standard"
            id="modal-modal-title"
            aria-label="modal-modal-title"
            placeholder="제목을 입력해주세요."
            value={modalTitle}
            onChange={handleChangeTitle}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="p">
            내용 (최대 200자)
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <StyledTextarea
            multiline
            id="modal-modal-description"
            aria-label="modal-modal-description"
            minRows={textMaxRow}
            maxRows={textMaxRow}
            placeholder="메시지를 입력해주세요."
            variant="standard"
            value={modalDescription}
            onChange={handleChangeDescription}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ModalText);
