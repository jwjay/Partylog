package com.ssafy.partylog.api.Entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="Letter")
public class LetterEntity {
    @Id
    @Column(name="letter_id")
    private String letterId;

    @Column(name="letter_title")
    private String letterTitle;

    @Column(name="letter_content")
    private String letterContent;

    @Column(name="letter_writer")
    private int letterWriter;

    @Column(name="letter_receiver")
    private int letterReceiver;

    @CreationTimestamp
    @Column(name="letter_reg_date")
    private LocalDateTime letterRegDate;

}
