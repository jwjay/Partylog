import {
  TextField,
  //  styled
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Send from "@mui/icons-material/Send";

function ChatBox(props) {
  const {
    session,
    setShowFirework,
    sendFirework,
    sendClapEmoji,
    recieveClapEmoji,
    sendBirthdayMusic,
    recieveBirthdayMusic,
    sendHappyFace,
    recieveHappyFaces,
    userInfo,
    userNo,
  } = props;
  const [chatContent, setChatContent] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatDisplayRef = useRef(null);

  const handleInputChat = (event) => {
    const { value } = event.target;
    const truncatedValue = value.slice(0, 50);
    setChatContent(truncatedValue);
  };
  const handleSendMessages = () => {
    // Sender of the message (after 'session.connect')
    session
      .signal({
        data: chatContent, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "my-chat", // The type of message (optional)
      })
      .then(() => {
        setChatContent("");
        console.log("Message successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePressEnter = (event) => {
    if (chatContent.trim() && event.key === "Enter") {
      handleSendMessages();
    }
  };

  useEffect(() => {
    if (sendFirework) {
      session
        .signal({
          data: "(Firework_Firework)", // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "my-chat", // The type of message (optional)
        })
        .then(() => {
          console.log("Firework successfully sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sendFirework, session]);

  useEffect(() => {
    if (sendHappyFace) {
      session
        .signal({
          data: "(Happy_Happy)", // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "my-chat", // The type of message (optional)
        })
        .then(() => {
          console.log("Happy successfully sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sendHappyFace, session]);

  useEffect(() => {
    if (sendClapEmoji) {
      session
        .signal({
          data: "(Clap_Clap)", // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "my-chat", // The type of message (optional)
        })
        .then(() => {
          console.log("Clap successfully sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sendClapEmoji, session]);

  useEffect(() => {
    if (sendBirthdayMusic) {
      session
        .signal({
          data: "(Birthday_Birthday)", // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "my-chat", // The type of message (optional)
        })
        .then(() => {
          console.log("Birthday successfully sent");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sendBirthdayMusic, session]);

  // 새 메시지가 도착할 때마다 채팅 메시지 목록을 업데이트
  useEffect(() => {
    const handleReceivedMessage = (event) => {
      let writerName = ""; // 기본값 설정

      try {
        const eventData = JSON.parse(event.from.data); // JSON 문자열을 객체로 변환
        if (eventData.clientData) {
          writerName = eventData.clientData; // "이름"을 추출
        }
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
      const chatMsg = {
        writer: writerName,
        content: event.data,
      };
      // 해당 채팅을 받으면 firework 실행
      if (chatMsg.content.trim() === "(Firework_Firework)") {
        setShowFirework(true);
        setTimeout(() => {
          setShowFirework(false);
        }, 4000);
        // 해당 채팅을 받으면 박수 이모지
      } else if (chatMsg.content.trim() === "(Clap_Clap)") {
        recieveClapEmoji();
        // 해당 채팅을 받으면 생일 폭죽
      } else if (chatMsg.content.trim() === "(Birthday_Birthday)") {
        recieveBirthdayMusic();
        // 해당 채팅을 받으면 웃는 얼굴 이모지
      } else if (chatMsg.content.trim() === "(Happy_Happy)") {
        recieveHappyFaces();
      } else {
        setChatMessages((prevMessages) => [...prevMessages, chatMsg]); // 새 메시지를 배열에 추가
      }
    };
    if (session) {
      session.on("signal", handleReceivedMessage);
    }

    return () => {
      session.off("signal", handleReceivedMessage); // 컴포넌트 언마운트 시 정리
    };
  }, [session]);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "75%",
          minHeight: "10vh",
          maxHeight: "60vh",
          overflowY: "scroll",
        }}
        ref={chatDisplayRef}
        className="chat-display"
      >
        {/* 채팅 메시지 렌더링 */}
        {chatMessages.map((message, index) => (
          <p key={index} style={{ marginLeft: "5px" }}>
            {/* 생일자만 채팅에서 구분하는 것 넣어봤으나, 이모지가 작아서 구분이 잘 안 돼서 임시 중지 */}
            {/* {parseInt(userNo) === parseInt(userInfo.userNo)
              ? `🎉${message.writer}🎉 : ${message.content}`
              : `${message.writer} : ${message.content}`} */}
            {`${message.writer} : ${message.content}`}
          </p>
        ))}
      </div>

      <div
        style={{
          width: "95%",
          height: "20%",
          marginTop: "10px",
          display: "flex", // Added this to enable flex layout
          flexDirection: "column", // Change this to "column"
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative" }}>
          <TextField
            id="outlined-multiline-static"
            label="채팅 입력"
            multiline
            minRows={3}
            maxRows={3}
            placeholder="채팅란"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "15px",
              fontSize: "small",
            }}
            value={chatContent}
            onChange={handleInputChat}
            onKeyUp={handlePressEnter}
          />
          <div
            style={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
          >
            <Send onClick={handleSendMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
