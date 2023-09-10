package com.ssafy.partylog.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;

@Getter
@Setter
public class LetterUpdateRequest {

    @Schema(description = "letterId", nullable = true, example = "01H5VME3DY6SSF2DV34RRBJBGJ")
    private String letterId;
    @Schema(description = "바뀐 제목", nullable = true, example = "수정된 제목")
    private String letterTitle;
    @Schema(description = "바뀐 내용", nullable = true, example = "수정된 내용")
    private String letterContent;
}
