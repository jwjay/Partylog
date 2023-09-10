package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LiveEntity;

import java.util.Map;
import java.util.Optional;

public interface LiveService {

    void createLive(Map<String, Object> params) throws Exception;

    void endLiveSession(String liveId) throws Exception;

    LiveEntity checkLiveActive(String liveId) throws Exception;
}
