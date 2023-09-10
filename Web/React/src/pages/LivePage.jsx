import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroups from "../components/LivePage/ButtonGroups";
import Button from "@mui/material/Button";
import ChatBox from "../components/LivePage/ChatBox";
import JoinCheck from "../components/LivePage/JoinCheck";
import ViewersCarousel from "../components/LivePage/ViewersCarousel";
import { firework3 } from "../components/firework3";
import BirthdayMusic from "../components/LivePage/BrithdayMusic";

/* Openvidu 관련 컴포넌트 */
import "../css/Openvidu.css";
import UserVideoComponent from "../components/openvidu/UserVideoComponent";
import { useSelector } from "react-redux";
import { OpenVidu } from "openvidu-browser";
import { useParams } from "react-router-dom";

// 나중에 CSS로 화면 + 버튼그룹 / 채팅창 + 나가기 버튼으로 세로열 맞추기

const APPLICATION_SERVER_URL = `${process.env.REACT_APP_API_SERVER_URL}/`;

function LivePage() {
  var userInfo = useSelector((state) => state.auth.userData);
  const { userNo } = useParams();
  var OV = new OpenVidu();
  var [mySessionId, setMysessionId] = useState(`Session${userNo}`);
  var [myUserName, setMyUserName] = useState(userInfo.userNickname);
  var [session, setSession] = useState(OV.initSession());

  // MainStreamManager는 본인 userNo가 url에 있는 번호와 같은 사람으로
  var [mainStreamManager, setMainStreamManager] = useState(undefined);
  var [publisher, setPublisher] = useState(undefined);
  const [roomHostUserInfo, setRoomHostUserInfo] = useState(null);
  const [roomUsersInfo, setRoomUsersInfo] = useState([]);
  var [subscribers, setSubscribers] = useState([]);
  var [currentVideoDevice, setCurrentVideoDevice] = useState({}); // eslint-disable-line no-unused-vars

  const [isJoinCheck, setIsJoinCheck] = useState(false);

  const [showFirework, setShowFirework] = useState(false);

  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const changeHeightSize = isMediumScreen ? "" : "75vh";
  const changeChatBoxSize = isMediumScreen ? "95%" : "90%";
  const changeChatBoxMarginTop = isMediumScreen ? "10px" : "0";

  useEffect(() => {
    if (isJoinCheck) {
      joinSession();
    }
  }, [isJoinCheck]);

  // 언마운트 시에 leaveSession 추가..

  useEffect(() => {
    return () => {
      if (session) {
        leaveSession();
      }
    };
  }, []);

  // 유저 추가될 때, host를 특정 못 했다면 찾기

  useEffect(() => {
    if (roomUsersInfo && !roomHostUserInfo) {
      const hostUser = roomUsersInfo.filter((roomUserInfo) => {
        return (
          parseInt(JSON.parse(roomUserInfo.stream.connection.data).clientNo) ===
          parseInt(JSON.parse(userNo))
        );
      });
      setRoomHostUserInfo(hostUser[0]);
    }
  }, [roomUsersInfo]);

  // 호스트를 찾았다면 MainStreamManager로 설정

  useEffect(() => {
    if (roomHostUserInfo) {
      initialMainVideoStreamer();
    }
  }, [roomHostUserInfo]);

  // 클릭하면 그 사람을 큰 화면으로 바꾸는 함수

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  // 폭죽 이펙트

  useEffect(() => {
    if (showFirework) {
      firework3();
    }
  }, [showFirework]);

  // 본인이 방 주인이 아니라면 방 주인을 MainStreamer로 지정
  const initialMainVideoStreamer = () => {
    if (parseInt(userInfo.userNo) !== parseInt(userNo)) {
      const mainStreamer = subscribers.filter((subscriber) => {
        return (
          parseInt(JSON.parse(subscriber.stream.connection.data).clientNo) ===
          parseInt(JSON.parse(roomHostUserInfo.stream.connection.data).clientNo)
        );
      });
      setMainStreamManager(mainStreamer[0]);
    }
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((prevSubscribers) => {
      return prevSubscribers.filter((sub) => sub !== streamManager);
    });
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---

    // OV = new OpenVidu();

    // --- 2) Init a session ---
    // setSession(OV.initSession())

    var mySession = session;
    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on("streamCreated", (event) => {
      console.log("새로운 스트림 생성");
      setRoomUsersInfo((prev) => [...prev, event]);
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var subscriber = mySession.subscribe(event.stream, undefined);
      // Update the state with the new subscribers
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      console.log("스트림 삭제");
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName, clientNo: userInfo.userNo })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(currentVideoDevice);
          if (parseInt(userNo) === parseInt(userInfo.userNo)) {
            setMainStreamManager(publisher);
          }
          setPublisher(publisher);
          setSubscribers((prev) => [...prev, publisher]);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    console.log("세션 종료");
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    setMysessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);

    // 종료 API 호출
    axios
      .put(
        `${APPLICATION_SERVER_URL}api/end/${mySessionId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("access-token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        window.close();
      });
  };

  // 화면 공유를 통한 화면 전체 녹화 코드

  const startRecording = async () => {
    setIsRecording(true);

    const displayStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    // 오픈비두의 mainStreamManager에서 얻은 오디오 스트림을 가져옵니다
    const openViduAudioStream =
      mainStreamManager && mainStreamManager.stream
        ? mainStreamManager.stream.getMediaStream().getAudioTracks()[0]
        : null;

    const mixedStream = new MediaStream();
    displayStream
      .getVideoTracks()
      .forEach((track) => mixedStream.addTrack(track));
    audioStream
      .getAudioTracks()
      .forEach((track) => mixedStream.addTrack(track));

    // 다른 참여자의 음성 스트림을 녹음 스트림에 추가
    subscribers.forEach((sub) => {
      const audioTrack = sub.stream.getMediaStream().getAudioTracks()[0];
      if (audioTrack) {
        mixedStream.addTrack(audioTrack);
      }
    });

    const mediaRecorder = new MediaRecorder(mixedStream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
        setRecordedChunks(chunks); // Reset recordedChunks when starting a new recording
      }
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (recorder) {
      recorder.stop();
      recorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) {
      console.log("No recorded data to download.");
      return;
    }

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "recorded-video.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [sendFirework, setSendFirework] = useState(false);

  const handleFirework = () => {
    setSendFirework(true);
    setTimeout(() => {
      setSendFirework(false);
    }, 3000);
  };

  const [sendBirthdayMusic, setSendBirthdayMusic] = useState(false);
  const [showBirthdayMusic, setShowBirthdayMusic] = useState(false);

  const recieveBirthdayMusic = () => {
    setShowBirthdayMusic(true);
    setTimeout(() => {
      setShowBirthdayMusic(false);
    }, 15000);
  };

  const handleBirthdayMusic = () => {
    if (showBirthdayMusic) {
      setShowBirthdayMusic(false);
    } else {
      setSendBirthdayMusic(true);
      setTimeout(() => {
        setSendBirthdayMusic(false);
      }, 15000);
    }
  };

  const [sendHappyFace, setSendHappyFace] = useState(false);
  const [recieveHappyFace, setRecieveHappyFace] = useState(false);

  const recieveHappyFaces = () => {
    setRecieveHappyFace(true);
    setTimeout(() => {
      setRecieveHappyFace(false);
    }, 50);
  };

  const handleHappyFaces = () => {
    setSendHappyFace(true);
    setTimeout(() => {
      setSendHappyFace(false);
    }, 50);
  };

  const [sendClapEmoji, setSendClapEmoji] = useState(false);
  const [recieveClap, setRecieveClap] = useState(false);

  const recieveClapEmoji = () => {
    setRecieveClap(true);
    setTimeout(() => {
      setRecieveClap(false);
    }, 50);
  };

  const handleClapEmoji = () => {
    setSendClapEmoji(true);
    setTimeout(() => {
      setSendClapEmoji(false);
    }, 50);
  };

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  const getToken = async () => {
    const sessionId = await createSession(mySessionId);
    return await createToken(sessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    var liveInfo = {
      live_id: sessionId,
      live_title: null,
      live_desc: userInfo.userNickname + " 님의 생일 축하방입니다.",
      live_host: userInfo.userNo,
      isHost: userNo === userInfo.userNo + "" ? true : false,
    };
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      liveInfo,
      {
        headers: {
          Authorization: localStorage.getItem("access-token"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // The token
  };

  if (!isJoinCheck) {
    return <JoinCheck setIsJoinCheck={setIsJoinCheck} />;
  } else {
    return (
      <div>
        <BirthdayMusic
          showBirthdayMusic={showBirthdayMusic}
          setShowBirthdayMusic={setShowBirthdayMusic}
        />
        <Grid
          container
          justifyContent={"space-evenly"}
          alignItems={"center"}
          style={{ height: `${changeHeightSize}` }}
        >
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
            md={8}
            style={{ height: "100%" }}
            className="broadcast-grid"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFD9DF",
                border: "20px solid #9A4058",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                style={{
                  width: "95%",
                  height: "95%",
                }}
              >
                <Grid
                  item
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ height: "70%" }}
                >
                  <Grid
                    item
                    xs={7}
                    style={{
                      height: "100%",
                      minHeight: "200px",
                      minWidth: "200px",
                      backgroundColor: "black",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                    }}
                    className="live-display"
                  >
                    <div
                      className="container"
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {session === undefined ? (
                        <p style={{ fontSize: "20px" }}>
                          종료된 라이브 입니다.
                        </p>
                      ) : (
                        <div className="container" style={{ height: "100%" }}>
                          <div id="session" style={{ height: "100%" }}>
                            <div
                              id="main-video"
                              className="col-md-6"
                              style={{ height: "100%" }}
                            >
                              <UserVideoComponent
                                streamManager={mainStreamManager}
                                style={{ height: "100%" }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                  style={{ height: "30%" }}
                >
                  <ViewersCarousel
                    viewers={subscribers}
                    UserVideoComponent={UserVideoComponent}
                    handleMainVideoStream={handleMainVideoStream}
                    userNo={userNo}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          {isMediumScreen && (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              style={{ marginTop: "10px", height: "" }}
              className="button-grid"
            >
              <Grid
                item
                md={5}
                xs={10}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ButtonGroups
                  publisher={publisher}
                  showFirework={showFirework}
                  handleFirework={handleFirework}
                  handleClapEmoji={handleClapEmoji}
                  recieveClap={recieveClap}
                  handleBirthdayMusic={handleBirthdayMusic}
                  showBirthdayMusic={showBirthdayMusic}
                  handleHappyFaces={handleHappyFaces}
                  recieveHappyFace={recieveHappyFace}
                />
              </Grid>
            </Grid>
          )}
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
            md={3}
            style={{ height: "100%" }}
            className="chat-grid"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#FFD9DF",
                border: "20px solid #9A4058",
                borderRadius: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: `${changeChatBoxMarginTop}`,
              }}
            >
              <div
                style={{
                  width: `${changeChatBoxSize}`,
                  height: "95%",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ChatBox
                  session={session}
                  showFirework={showFirework}
                  setShowFirework={setShowFirework}
                  sendFirework={sendFirework}
                  sendClapEmoji={sendClapEmoji}
                  recieveClapEmoji={recieveClapEmoji}
                  sendHappyFace={sendHappyFace}
                  recieveHappyFaces={recieveHappyFaces}
                  sendBirthdayMusic={sendBirthdayMusic}
                  recieveBirthdayMusic={recieveBirthdayMusic}
                  userInfo={userInfo}
                  userNo={userNo}
                />
              </div>
            </div>
          </Grid>
          {isMediumScreen && (
            <Grid item xs={12}>
              <Button
                className="exit-live-button"
                variant="contained"
                style={{
                  fontFamily: "MaplestoryOTFBold",
                  width: "100%",
                  height: "100%",
                  fontSize: "25px",
                  color: "white",
                  borderRadius: "20px",
                  textShadow: "0.1px 0.1px 4px #e892a4",
                  boxSizing: "border-box",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                onClick={leaveSession}
              >
                나가기
              </Button>
              {isRecording ? (
                <Button
                  className="exit-live-button"
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    width: "50%",
                    height: "100%",
                    fontSize: "20px",
                    color: "white",
                    borderRadius: "20px",
                    textShadow: "0.1px 0.1px 4px #e892a4",
                    boxSizing: "border-box",
                  }}
                  onClick={stopRecording}
                >
                  녹화중단
                </Button>
              ) : (
                <Button
                  className="exit-live-button"
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    width: "50%",
                    height: "100%",
                    fontSize: "20px",
                    color: "white",
                    borderRadius: "15px",
                    textShadow: "0.1px 0.1px 4px #e892a4",
                    boxSizing: "border-box",
                  }}
                  onClick={startRecording}
                >
                  녹화시작
                </Button>
              )}
              {recordedChunks.length > 0 ? (
                <Button
                  className="exit-live-button"
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    width: "50%",
                    height: "100%",
                    fontSize: "20px",
                    color: "white",
                    borderRadius: "15px",
                    textShadow: "0.1px 0.1px 4px #e892a4",
                    boxSizing: "border-box",
                  }}
                  onClick={downloadRecording}
                >
                  다운로드
                </Button>
              ) : (
                <Button
                  className="exit-live-button"
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    width: "50%",
                    height: "100%",
                    fontSize: "20px",
                    color: "white",
                    borderRadius: "15px",
                    textShadow: "0.1px 0.1px 4px #e892a4",
                    boxSizing: "border-box",
                  }}
                  onClick={downloadRecording}
                  disabled={true}
                >
                  다운로드
                </Button>
              )}
            </Grid>
          )}
        </Grid>

        {!isMediumScreen && (
          <Grid
            container
            justifyContent={"space-evenly"}
            alignItems={"center"}
            style={{ marginTop: "60px", height: "10vh" }}
            className="button-grid"
          >
            <Grid
              container
              item
              md={8}
              xs={10}
              justifyContent={"center"}
              alignItems={"center"}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid
                container
                item
                xs={8}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ButtonGroups
                  publisher={publisher}
                  showFirework={showFirework}
                  handleFirework={handleFirework}
                  handleClapEmoji={handleClapEmoji}
                  recieveClap={recieveClap}
                  handleBirthdayMusic={handleBirthdayMusic}
                  showBirthdayMusic={showBirthdayMusic}
                  handleHappyFaces={handleHappyFaces}
                  recieveHappyFace={recieveHappyFace}
                />
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={3}
              xs={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid
                container
                item
                md={10}
                xs={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  className="exit-live-button"
                  variant="contained"
                  style={{
                    fontFamily: "MaplestoryOTFBold",
                    width: "100%",
                    height: "100%",
                    fontSize: "20px",
                    color: "white",
                    borderRadius: "20px",
                    textShadow: "0.1px 0.1px 4px #e892a4",
                    boxSizing: "border-box",
                  }}
                  onClick={leaveSession}
                >
                  나가기
                </Button>
                {isRecording ? (
                  <Button
                    className="exit-live-button"
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      width: "50%",
                      height: "100%",
                      fontSize: "20px",
                      color: "white",
                      borderRadius: "20px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                    onClick={stopRecording}
                  >
                    녹화중단
                  </Button>
                ) : (
                  <Button
                    className="exit-live-button"
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      width: "50%",
                      height: "100%",
                      fontSize: "20px",
                      color: "white",
                      borderRadius: "15px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                    onClick={startRecording}
                  >
                    녹화시작
                  </Button>
                )}
                {recordedChunks.length > 0 ? (
                  <Button
                    className="exit-live-button"
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      width: "50%",
                      height: "100%",
                      fontSize: "20px",
                      color: "white",
                      borderRadius: "15px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                    onClick={downloadRecording}
                  >
                    다운로드
                  </Button>
                ) : (
                  <Button
                    className="exit-live-button"
                    variant="contained"
                    style={{
                      fontFamily: "MaplestoryOTFBold",
                      width: "50%",
                      height: "100%",
                      fontSize: "20px",
                      color: "white",
                      borderRadius: "15px",
                      textShadow: "0.1px 0.1px 4px #e892a4",
                      boxSizing: "border-box",
                    }}
                    onClick={downloadRecording}
                    disabled={true}
                  >
                    다운로드
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default LivePage;
