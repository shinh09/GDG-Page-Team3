package com.example.backend.member.document;

import com.example.backend.global.annotation.ExceptionDoc;
import com.example.backend.global.annotation.ExplainError;
import com.example.backend.global.exception.GlobalCodeException;
import com.example.backend.global.interfaces.SwaggerExampleExceptions;
import com.example.backend.member.exception.MemberErrorCode;
import com.example.backend.member.exception.MemberException;

@ExceptionDoc
public class SignupExceptionDocs implements SwaggerExampleExceptions {

    @ExplainError("이름이 입력되지 않았거나 비어있는 경우 발생합니다.")
    public GlobalCodeException 이름_입력_필수 = new MemberException(MemberErrorCode.NAME_REQUIRED);

    @ExplainError("이메일 형식이 유효하지 않을 때 발생합니다. (예: @ 누락 등)")
    public GlobalCodeException 이메일_형식_오류 = new MemberException(MemberErrorCode.INVALID_EMAIL_FORMAT);

    @ExplainError("비밀번호가 8자 미만일 때 발생합니다.")
    public GlobalCodeException 비밀번호_길이_부족 = new MemberException(MemberErrorCode.INVALID_PASSWORD_FORMAT);

    @ExplainError("학번 형식이 서버 규격과 맞지 않을 때 발생합니다.")
    public GlobalCodeException 학번_형식_오류 = new MemberException(MemberErrorCode.INVALID_STUDENT_ID_FORMAT);

    @ExplainError("선택한 세대(generation) 정보가 시스템 정의와 다를 때 발생합니다.")
    public GlobalCodeException 유효하지_않은_세대 = new MemberException(MemberErrorCode.INVALID_GENERATION);

    @ExplainError("선택한 파트(part) 정보가 유효하지 않을 때 발생합니다.")
    public GlobalCodeException 유효하지_않은_파트 = new MemberException(MemberErrorCode.INVALID_PART);

    @ExplainError("선택한 학과(department) 정보가 유효하지 않을 때 발생합니다.")
    public GlobalCodeException 유효하지_않은_학과 = new MemberException(MemberErrorCode.INVALID_DEPARTMENT);
}