import React, { useState, useEffect } from "react";
import { Chip, Stack, ThemeProvider, createTheme } from "@mui/material";

export default function ClickableChips() {
  const [selected, setSelected] = useState("전체 연도");

  useEffect(() => {
    setSelected("전체 연도");
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#fbb3c2",
      },
    },
  });

  const handleClick = (label) => {
    setSelected(label);
  };

  // 추후에 연도별로 나눠서 데이터를 받을 수 있어야 하므로, 연도에 따른 데이터를 처리할 수 있도록 재사용 가능하게 수정해야합니다.
  // 연도 값을 여기서 설정하면, 그걸 MessageBoard쪽에서 메시지 데이터를 요청해서 redux에 저장된 messages를 바꿔야
  // 아직 미구현

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1}>
        <Chip
          label="전체 연도"
          variant={selected === "전체 연도" ? "filled" : "outlined"}
          color={selected === "전체 연도" ? "secondary" : "default"}
          onClick={() => handleClick("전체 연도")}
          sx={{
            color: selected === "전체 연도" ? "#ffffff" : undefined,
            fontFamily:
              selected === "전체 연도"
                ? "MaplestoryOTFBold"
                : "MaplestoryOTFLight",
            textshadow: "0.1px 0.1px 5px #e892a4;",
          }}
        />
        <Chip
          label="2023"
          variant={selected === "2023" ? "filled" : "outlined"}
          color={selected === "2023" ? "secondary" : "default"}
          onClick={() => handleClick("2023")}
          sx={{
            color: selected === "2023" ? "#ffffff" : undefined,
            fontFamily:
              selected === "2023" ? "MaplestoryOTFBold" : "MaplestoryOTFLight",
            textshadow: "0.1px 0.1px 5px #e892a4;",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
