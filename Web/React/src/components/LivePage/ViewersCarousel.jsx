import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ViewersCarousel(props) {
  // 방송 참가자들 캐러셀로 표시

  const { viewers, UserVideoComponent, handleMainVideoStream, userNo } = props;

  const theme = useTheme();

  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [carouselPages, setCarouselPages] = useState([]);
  const [carouselPageViewers, setCarouselPageViewers] = useState([]);

  const updateCarouselViewers = useCallback(() => {
    const viewersPerPage = isSmallScreen ? 2 : isLargeScreen ? 3 : 4;
    const carouselPage = Math.ceil(viewers.length / viewersPerPage);
    const carouselPages =
      carouselPage < 1
        ? [0]
        : Array.from({ length: carouselPage }, (_, i) => i);

    const updatedCarouselPageViewers = carouselPages.map((pageIndex) => {
      const startIndex = pageIndex * viewersPerPage;
      const endIndex = Math.min(startIndex + viewersPerPage, viewers.length);
      return viewers.slice(startIndex, endIndex);
    });

    setCarouselPages(carouselPages);
    setCarouselPageViewers(updatedCarouselPageViewers);
  }, [isSmallScreen, isLargeScreen, viewers]);

  useEffect(() => {
    updateCarouselViewers();
  }, [updateCarouselViewers]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // 닉네임 너무 길면 자르기 기능. null값 nickname이 가끔 있어서 일시 중지

  // const getLength = (nickname, maxLength) => {
  //   if (nickname.length > maxLength) {
  //     return nickname.slice(0, maxLength) + "...";
  //   }
  //   return nickname;
  // };

  return (
    <Grid
      container
      style={{ width: "100%", height: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* 세로 중앙 정렬 하려면 아래 div */}
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Slider {...settings}>
          {carouselPages.map((pageIndex) => (
            <div
              key={`viewersCarousel-${pageIndex}`}
              style={{ width: "100%", height: "100%" }}
            >
              <Grid
                container
                justifyContent={"space-evenly"}
                alignItems={"center"}
                spacing={1}
              >
                {carouselPageViewers[pageIndex].map(
                  (viewer, idx) => (
                    // 추후에 생일자만 큰 화면에, 참가자는 아래 캐러셀로 표현하고, 화면 전환 막는 식으로 간다면 아래 주석 풀기
                    // parseInt(
                    //   JSON.parse(viewer.stream.connection.data).clientNo
                    // ) !== parseInt(userNo) && (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      lg={3}
                      key={`viewer-${idx}`}
                      style={{
                        position: "relative",
                        width: "90%",
                        height: "90%",
                        objectFit: "fill",
                      }}
                    >
                      <div
                        style={{
                          width: "90%",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "15px",
                          flexWrap: "nowrap",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxHeight: "200px",
                        }}
                        className="viewer-display"
                        onClick={() => handleMainVideoStream(viewer)}
                      >
                        <span>{viewer.id}</span>
                        <UserVideoComponent streamManager={viewer} />
                      </div>
                    </Grid>
                  )
                  // )
                )}
              </Grid>
            </div>
          ))}
        </Slider>
      </div>
    </Grid>
  );
}

export default ViewersCarousel;
