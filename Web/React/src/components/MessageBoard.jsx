import React, { useState, useEffect, useCallback } from "react";
import MessageOnBoard from "./MessageOnBoard";
import Button from "@mui/material/Button";
import Board from "../assets/Frame_21.png";
import YearChip from "../components/YearChip";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import StickyNoteY from "../components/StickyNote/StickyNoteY";
import StickyNoteG from "../components/StickyNote/StickyNoteG";
import StickyNoteO from "../components/StickyNote/StickyNoteO";
import StickyNotePink from "../components/StickyNote/StickyNotePink";
import StickyNotePurple from "../components/StickyNote/StickyNotePurple";
import birthdayAsset from "../assets/birthday_asset2.png";
import MessageDetail from "./MessageDetail";
import axios from "axios";
import { getAdditionalMessagesList } from "../actions/actions";

// 메시지 상세 확인할 때, 랜덤 포스트잇 출력용

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

function MessageBoard(props) {
  const {
    pageOwner,
    userNo,
    myUserNo,
    myMessage,
    handleModalOpen,
    changeMessageButtonFontSize,
    todayIsBirthday,
  } = props;

  const SERVER_API_URL = `${process.env.REACT_APP_API_SERVER_URL}`;
  const accessToken = localStorage.getItem("access-token");

  const dispatch = useDispatch();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // 메시지보드 캐러셀

  const [carouselPages, setCarouselPages] = useState([]);
  const [carouselPageMessages, setCarouselPageMessages] = useState([]);
  const [messagesOffset, setMessagesOffset] = useState(23);
  const [messageIsAll, setMessageIsAll] = useState(false);
  const [carouselClick, setCarouselClick] = useState(0);

  const messages = useSelector((state) => {
    return state.messagesData.messages;
  });

  const updateCarouselMessages = useCallback(() => {
    const messagesPerPage = isSmallScreen ? 4 : isLargeScreen ? 6 : 8;
    const carouselPage = Math.ceil(messages.length / messagesPerPage);
    const carouselPages =
      carouselPage < 1
        ? [0]
        : Array.from({ length: carouselPage }, (_, i) => i);

    const updatedCarouselPageMessages = carouselPages.map((pageIndex) => {
      const startIndex = pageIndex * messagesPerPage;
      const endIndex = Math.min(startIndex + messagesPerPage, messages.length);
      return messages.slice(startIndex, endIndex);
    });

    setCarouselPages(carouselPages);
    setCarouselPageMessages(updatedCarouselPageMessages);
  }, [isSmallScreen, isLargeScreen, messages]);

  useEffect(() => {
    updateCarouselMessages();
  }, [updateCarouselMessages, myMessage]);

  useEffect(() => {}, [myMessage]);

  // 버튼을 누르면 다음 메시지 목록 불러오기

  const handleClickPageButton = () => {
    setCarouselClick(carouselClick + 1);

    if (carouselClick >= 0) {
      if (!messageIsAll) {
        setMessagesOffset(messagesOffset + 24);

        axios({
          method: "post",
          url: `${SERVER_API_URL}/letter/get/letters`,
          headers: {
            Authorization: `${accessToken}`,
          },
          data: {
            receiverNo: userNo,
            writerNo: myUserNo,
            year: 0,
            limit: 24,
            offset: messagesOffset,
          },
        })
          .then((res) => {
            const additionalMessagesData = res.data.data;
            dispatch(getAdditionalMessagesList(additionalMessagesData));
            if (additionalMessagesData.length < 24) {
              setMessageIsAll(true);
            }
          })
          .catch((err) => console.log(err));
      }
      setCarouselClick(0);
    }
  };

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [randomStickyNote, setRandomStickyNote] = useState(
    getRandomStickyNote()
  );

  // 메시지 선택 시, 해당 모달 창이 열리며 해당 메시지 출력

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [modalDetailOpen, setModalDetailOpen] = useState(false);
  const handleModalDetailOpen = (message) => {
    setSelectedMessage(message);
    setModalDetailOpen(true);
    setRandomStickyNote(getRandomStickyNote());
  };
  const handleModalDetailClose = () => setModalDetailOpen(false);

  return (
    <div>
      <Grid container item xs={12}>
        <div
          className="UserPage-side"
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            height: "47px",
          }}
        >
          <Grid container justifyContent={"flex-start"} alignItems={"center"}>
            <div className="yearchips-div">
              <YearChip />
            </div>
          </Grid>
          <Grid container justifyContent={"flex-end"} alignItems={"center"}>
            <div className="create-message-div">
              {parseInt(myUserNo) !== parseInt(userNo) &&
                // 본인 메시지가 있다면 수정, 없으면 작성 버튼
                (myMessage ? (
                  <Button
                    className={"fix-message-button"}
                    onClick={handleModalOpen}
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      fontSize: changeMessageButtonFontSize,
                      color: "white",
                      borderRadius: "40px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                  >
                    메시지 수정
                  </Button>
                ) : (
                  <Button
                    className={"create-message-button"}
                    onClick={handleModalOpen}
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      fontSize: changeMessageButtonFontSize,
                      color: "white",
                      borderRadius: "40px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                  >
                    메시지 작성
                  </Button>
                ))}
            </div>
          </Grid>
        </div>
      </Grid>

      <div
        style={{
          width: "100%",
          height: "70vh",
          backgroundColor: "#a27e4f",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            width: "94%",
            height: "91%",
            backgroundImage: `url(${Board})`,
            borderRadius: "30px",
            objectFit: "fill",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {todayIsBirthday && (
            <div
              style={{
                position: "absolute",
                width: "65vw",
                height: "65vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <img
                src={birthdayAsset}
                alt="Birthday Asset"
                style={{
                  objectFit: "contain",
                  width: isMediumScreen
                    ? "90vw"
                    : isLargeScreen
                    ? "53vw"
                    : "54vw",

                  height: "500px",
                  opacity: 0.75,
                }}
              />
            </div>
          )}

          <div style={{ width: "95%", height: "95%" }}>
            {messages.length === 0 ? (
              // messages 배열이 비어있을 때, "아직 메시지가 없네요..." 문장 출력
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  fontSize: isSmallScreen ? "25px" : "40px",
                  fontFamily: "MaplestoryOTFBold",
                  color: "white",
                  textShadow: "2px 2px 10px grey",
                }}
              >
                아직 메시지가 없네요...
              </div>
            ) : (
              // 메시지들 캐러셀로 출력
              <Slider {...settings} afterChange={handleClickPageButton}>
                {carouselPages.map((pageIndex) => (
                  <div
                    key={pageIndex}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Grid
                      container
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      spacing={1}
                    >
                      {carouselPageMessages[pageIndex].map((message) => (
                        <Grid
                          item
                          xs={6}
                          sm={4}
                          lg={3}
                          key={`MessageOnBoard-${message.letter_id}`}
                          style={{
                            position: "relative",
                            width: "90%",
                            height: "90%",
                            objectFit: "fill",
                            minHeight: "170px",
                            marginTop: "30px",
                          }}
                        >
                          <MessageOnBoard
                            message={message}
                            pageOwner={pageOwner}
                            myUserNo={myUserNo}
                            // PageOwner면 메시지 클릭해서 상세보기 가능
                            onClick={
                              pageOwner ||
                              parseInt(myUserNo) ===
                                parseInt(message.letter_writer)
                                ? () => handleModalDetailOpen(message)
                                : null
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        <MessageDetail
          modalDetailOpen={modalDetailOpen}
          handleModalOpen={handleModalOpen}
          handleModalDetailClose={handleModalDetailClose}
          randomStickyNote={randomStickyNote}
          selectedMessage={selectedMessage}
          myUserNo={myUserNo}
        />
      </div>
    </div>
  );
}

export default MessageBoard;
