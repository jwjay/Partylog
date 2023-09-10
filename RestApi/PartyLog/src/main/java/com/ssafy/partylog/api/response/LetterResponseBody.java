package com.ssafy.partylog.api.response;

import lombok.*;


public interface LetterResponseBody {

    String getLetter_id();
    String getLetter_title();
    String getLetter_content();
    int getLetter_writer();
    int getLetter_receiver();
    String getLetter_reg_date();
    String getUser_profile();
    String getUser_nickname();

}
