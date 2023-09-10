package com.ssafy.partylog.api.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@ToString
@Table(name="follow")
public class FollowEntity {
    @Id
    @Column(name="follow_no")
    private int followNo;
    @Column(name="follower_no")
    private int followerNo;
    @Column(name="followee_no")
    private int followeeNo;

    @Builder
    public FollowEntity(int followerNo, int followeeNo) {
        this.followerNo = followerNo;
        this.followeeNo = followeeNo;
    }

    public FollowEntity() {
    }
}
