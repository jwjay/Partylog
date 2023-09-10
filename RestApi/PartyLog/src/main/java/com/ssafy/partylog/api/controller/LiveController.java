package com.ssafy.partylog.api.controller;

import java.util.Map;

import javax.annotation.PostConstruct;

import com.ssafy.partylog.api.Entity.LiveEntity;
import com.ssafy.partylog.api.response.CommonResponse;
import com.ssafy.partylog.api.service.LiveService;
import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController()
public class LiveController {
    
    LiveService liveService;

    public LiveController(LiveService liveService) {
        this.liveService = liveService;
    }

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
//        RecordingProperties recordingProperties = new RecordingProperties.Builder()
//                .outputMode(Recording.OutputMode.INDIVIDUAL)
//                .recordingLayout(RecordingLayout.BEST_FIT)
//                .resolution("640x480")
//                .frameRate(24)
//                .build();
        SessionProperties sessionProperties = new SessionProperties.Builder()
//                .recordingMode(RecordingMode.MANUAL) // RecordingMode.ALWAYS for automatic recording
//                .defaultRecordingProperties(recordingProperties)
                .customSessionId(params.get("customSessionId").toString())
                .forcedVideoCodec(VideoCodec.VP8)
                .build();
        Session session = openvidu.createSession(sessionProperties);
//        SessionProperties properties = SessionProperties.fromJson(params).build();
//        Session session = openvidu.createSession(properties);
        System.out.println(params.get("customSessionId")); //customSessionId
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }


//    @PostMapping("/api/record/start/{sessionId}")
//    public ResponseEntity<String> startRecording(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
//        RecordingProperties properties = new RecordingProperties.Builder()
//                .name("MY_RECORDING_NAME")
//                .build();
//        System.out.println("녹화빌드" + sessionId);
//        Recording recording = openvidu.startRecording("Session" + sessionId, properties); // Starts recording
//        System.out.println("녹화빌드완");
//        return new ResponseEntity<String>("녹화 시작", HttpStatus.OK);
//    }
//
//    @PostMapping("/api/record/stop/{sessionId}")
//    public ResponseEntity<String> stopRecording(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
//        System.out.println("녹화중단" + sessionId);
//        openvidu.stopRecording("Session" +sessionId); // Stops recording
//        System.out.println("녹화중단완");
//        return new ResponseEntity<String>("녹화 중단", HttpStatus.OK);
//    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<CommonResponse> createConnection(@PathVariable("sessionId") String sessionId, @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("라이브 세션 실행: {}", sessionId);
        log.info("요청값: {}", params);

        CommonResponse data;
        HttpStatus status;

        Boolean isHost = (Boolean) params.get("isHost");
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        if(isHost) { // host일 때만 DB에 라이브 정보 저장
            try {
                liveService.createLive(params);
                data = CommonResponse.createResponse("200", connection.getToken(), "방송이 생성되었습니다.");
                status = HttpStatus.OK;
            } catch(Exception e) {
                e.printStackTrace();
                data = CommonResponse.createResponseWithNoContent("400",  "방송 생성 중 문제가 발생했습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
        } else { // host가 아닐 경우 현재 방송 여부 체크
            try {
                LiveEntity live = liveService.checkLiveActive(sessionId);
                if(live.isLiveActive()) {
                    data = CommonResponse.createResponse("200", connection.getToken(), "현재 진행중인 방송입니다.");
                } else {
                    data = CommonResponse.createResponseWithNoContent("404",  "현재 방송이 종료되었습니다.");
                }
                status = HttpStatus.OK;
            } catch(Exception e) {
                e.printStackTrace();
                data = CommonResponse.createResponseWithNoContent("400", "방송 활성화 여부 확인 중 문제가 발생했습니다.");
                status = HttpStatus.BAD_REQUEST;
            }
        }

        return new ResponseEntity<>(data, status);
    }

    @PutMapping("/api/end/{liveId}")
    public ResponseEntity<CommonResponse> endLiveSession(@PathVariable("liveId") String liveId) {
        log.info("라이브 세션 종료: {}", liveId);

        CommonResponse data;
        HttpStatus status;

        try {
            liveService.endLiveSession(liveId);
            data = CommonResponse.createResponseWithNoContent("200", "라이브 세션 종료했습니다.");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponseWithNoContent("400", "라이브 세션 종료 중 문제가 발생했습니다.");
            status = HttpStatus.OK;
        }
        return new ResponseEntity<CommonResponse>(data, status);
    }

}
