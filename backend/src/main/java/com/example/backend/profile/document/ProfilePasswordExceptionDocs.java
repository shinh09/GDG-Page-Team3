package com.example.backend.profile.document;

import com.example.backend.global.annotation.ExceptionDoc;
import com.example.backend.global.annotation.ExplainError;
import com.example.backend.global.exception.GlobalCodeException;
import com.example.backend.global.interfaces.SwaggerExampleExceptions;
import com.example.backend.profile.exception.ProfileErrorCode;
import com.example.backend.profile.exception.ProfileException;

@ExceptionDoc
public class ProfilePasswordExceptionDocs implements SwaggerExampleExceptions {

    @ExplainError("현재 비밀번호가 틀렸을 때 발생합니다.")
    public GlobalCodeException 현재_비밀번호_불일치 = new ProfileException(ProfileErrorCode.INVALID_CURRENT_PASSWORD);

    @ExplainError("새 비밀번호가 현재 비밀번호와 똑같을 때 발생합니다.")
    public GlobalCodeException 비밀번호_중복_설정 = new ProfileException(ProfileErrorCode.SAME_AS_CURRENT_PASSWORD);

    @ExplainError("비밀번호 재설정 토큰이 만료되었거나 이미 사용되었을 때 발생합니다.")
    public GlobalCodeException 유효하지_않은_토큰 = new ProfileException(ProfileErrorCode.PASSWORD_RESET_TOKEN_EXPIRED);

    @ExplainError("새 비밀번호가 보안 규칙(길이, 조합 등)에 맞지 않을 때 발생합니다.")
    public GlobalCodeException 새_비밀번호_규칙_위반 = new ProfileException(ProfileErrorCode.INVALID_NEW_PASSWORD);
}