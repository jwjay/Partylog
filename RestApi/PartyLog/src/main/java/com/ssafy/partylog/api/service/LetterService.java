package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.request.LetterUpdateRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface LetterService {
    //작성, 삭제, 전체 불러오기(아이디별), 상세보기
    int addLetter(LetterRequest letter, int loginUserNo);

    List<LetterResponseBody> updateLetter(LetterUpdateRequest letterUpdateRequest);
    List<LetterResponseBody> deleteLetter(String letterId);
    List<LetterResponseBody> searchLetterList(int receiverNo, int writerNo, int year, int limit, int offset);
    LetterResponseBody searchLetterById(String letterId);

}
