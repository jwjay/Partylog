package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LiveEntity;
import com.ssafy.partylog.api.repository.LiveRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class LiveServiceImpl implements LiveService{

    private LiveRepository liveRepository;

    public LiveServiceImpl(LiveRepository liveRepository) {
        this.liveRepository = liveRepository;
    }

    @Override
    public void createLive(Map<String, Object> params) throws Exception {
        LiveEntity live = new LiveEntity().builder()
                .liveId((String) params.get("live_id"))
                .liveTitle((String) params.get("live_title"))
                .liveStartTime(new Date())
                .liveDesc((String) params.get("live_desc"))
                .liveHost((int) params.get("live_host"))
                .liveActive(true)
                .build();
        liveRepository.save(live);
    }

    @Override
    public void endLiveSession(String liveId) throws Exception {
        liveRepository.findByLiveId(liveId).ifPresent(item -> {
            item.setLiveEndTime(new Date());
            item.setLiveActive(false);
            liveRepository.save(item);
        });
    }

    @Override
    public LiveEntity checkLiveActive(String liveId) throws Exception {
        return liveRepository.findByLiveId(liveId).get();
    }
}
