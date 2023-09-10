package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.LetterResponseBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LetterRepository extends JpaRepository<LetterEntity, Long> {

    Optional<LetterEntity> findByLetterId(String LetterId);
    @Query(value = "DELETE FROM letter WHERE letter_id = ?1", nativeQuery = true)
    void deleteByLetterId(String letterId);

    @Query(value = "SELECT letter.*, user.user_nickname, user.user_profile FROM letter LEFT OUTER JOIN user ON letter.letter_writer = user.user_no WHERE letter_receiver = ?1 AND IF(?2 = 0, TRUE, year(letter_reg_date) = ?2) ORDER BY (CASE WHEN (letter_writer = ?3) THEN 1 ELSE 2 END), letter_reg_date DESC LIMIT ?4 OFFSET ?5", nativeQuery = true)
    List<LetterResponseBody> getLettersByReceiver(int receiverNo, int year, int writerNo, int limit, int offset);

    @Query(value = "SELECT letter.*, user.user_nickname, user.user_profile FROM letter LEFT OUTER JOIN user ON letter.letter_writer = user.user_no WHERE letter_id = ?1", nativeQuery = true)
    LetterResponseBody getLettersByLetterId(String letterId);
}
