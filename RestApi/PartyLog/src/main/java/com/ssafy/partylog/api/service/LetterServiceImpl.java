package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.repository.LetterRepository;
import com.ssafy.partylog.api.repository.UserRepository;
import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.request.LetterUpdateRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class LetterServiceImpl implements LetterService {

    private LetterRepository letterRepository;
    private UserRepository userRepository;

    @Autowired
    public LetterServiceImpl(LetterRepository letterRepository) {
        this.letterRepository = letterRepository;
    }

    @Override
    public int addLetter(LetterRequest letterRequest, int loginUserNo) {
        LetterEntity letter = new LetterEntity();

        String uuid = UUID.randomUUID().toString();

        letter.setLetterId(uuid);
        letter.setLetterTitle(letterRequest.getLetterTitle());
        letter.setLetterContent(letterRequest.getLetterContent());
        letter.setLetterWriter(loginUserNo);
        letter.setLetterReceiver(letterRequest.getLetterReceiver());

        LetterEntity check = letterRepository.save(letter);

        if(check == null) { // 저장된 값이 없다면
            return 0; //0을 반환한다.
        }else { // 저장된 값이 있다면
            return 1; // 1을 반환한다.
        }
    }

    public List<LetterResponseBody> updateLetter(LetterUpdateRequest letterUpdateRequest) {
        LetterEntity letter = letterRepository.findByLetterId(letterUpdateRequest.getLetterId()).get();
        letter.setLetterTitle(letterUpdateRequest.getLetterTitle());
        letter.setLetterContent(letterUpdateRequest.getLetterContent());
        letter.setLetterRegDate(LocalDateTime.now());

        LetterEntity check = letterRepository.save(letter);

        if(check == null) { // 저장된 값이 없다면
            return null;
        }else { // 저장된 값이 있다면
            return searchLetterList(letter.getLetterReceiver(), letter.getLetterWriter(), 0, 24,0);
        }

    }

    @Override
    public List<LetterResponseBody> deleteLetter(String letterId) {

        LetterEntity letter = letterRepository.findByLetterId(letterId).get();

        int receiverNo = letter.getLetterReceiver();
        int writerNo = letter.getLetterWriter();;
        letterRepository.deleteByLetterId(letterId);
        return searchLetterList(receiverNo, writerNo, 0, 24, 0);
    }

    @Override
    public List<LetterResponseBody> searchLetterList(int receiverNo, int writerNo, int year, int limit, int offset) {
        List<LetterResponseBody> list;
        list = letterRepository.getLettersByReceiver(receiverNo, year, writerNo, limit, offset);
        return list;
    }

    @Override
    public LetterResponseBody searchLetterById(String letterId) {
        LetterResponseBody letter = letterRepository.getLettersByLetterId(letterId);
        return letter;
    }

}
