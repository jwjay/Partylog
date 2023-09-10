package com.ssafy.partylog.api.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="live")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class LiveEntity {

    @Id
    @Column(name="live_id")
    private String liveId;
    @Column(name="live_title")
    private String liveTitle;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name="live_start_time")
    private Date liveStartTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name="live_end_time")
    private Date liveEndTime;
    @Column(name="live_desc")
    private String liveDesc;
    @Column(name="live_active")
    private boolean liveActive;
    @Column(name="live_host")
    private int liveHost;

    @Builder
    public LiveEntity(String liveId, String liveTitle, Date liveStartTime, Date liveEndTime, String liveDesc, boolean liveActive, int liveHost) {
        this.liveId = liveId;
        this.liveTitle = liveTitle;
        this.liveStartTime = liveStartTime;
        this.liveEndTime = liveEndTime;
        this.liveDesc = liveDesc;
        this.liveActive = liveActive;
        this.liveHost = liveHost;
    }
}
