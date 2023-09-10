package com.ssafy.partylog.api.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="user")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_no")
    private int userNo;
    @Column(name="user_id")
    private String userId;
    @Column(name="user_birthday")
    private Date userBirthday;
    @Column(name="user_nickname")
    private String userNickname;
    @Column(name="user_profile")
    private String userProfile;
    @Column(name="W_refreshtoken")
    private String Wrefreshtoken;
    @Column(name="A_refreshtoken")
    private String Arefreshtoken;

    @Builder
    public UserEntity(int userNo, String userId, Date userBirthday, String userNickname, String userProfile, String Wrefreshtoken, String Arefreshtoken) {
        this.userNo = userNo;
        this.userId = userId;
        this.userBirthday = userBirthday;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
        this. Wrefreshtoken = Wrefreshtoken;
        this.Arefreshtoken = Arefreshtoken;
    }
}
