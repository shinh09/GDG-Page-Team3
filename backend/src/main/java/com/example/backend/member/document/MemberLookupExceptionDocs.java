package com.example.backend.member.document;

import com.example.backend.global.annotation.ExceptionDoc;
import com.example.backend.global.annotation.ExplainError;
import com.example.backend.global.exception.GlobalCodeException;
import com.example.backend.global.interfaces.SwaggerExampleExceptions;
import com.example.backend.member.exception.MemberErrorCode;
import com.example.backend.member.exception.MemberException;

@ExceptionDoc
public class MemberLookupExceptionDocs implements SwaggerExampleExceptions {

    @ExplainError("특정 회원 조회 시 해당 회원이 존재하지 않는 경우 발생합니다.")
    public GlobalCodeException 회원_없음 = new MemberException(MemberErrorCode.MEMBER_NOT_FOUND);

    @ExplainError("회원 목록이 비어있을 때 발생합니다.")
    public GlobalCodeException 목록_비어있음 = new MemberException(MemberErrorCode.MEMBER_LIST_EMPTY);

    @ExplainError("잘못된 필터 조건으로 조회를 시도할 때 발생합니다.")
    public GlobalCodeException 유효하지_않은_필터 = new MemberException(MemberErrorCode.INVALID_FILTER_PARAMETER);

    @ExplainError("페이지 번호가 0보다 작거나 범위를 벗어난 경우 발생합니다.")
    public GlobalCodeException 페이지_번호_오류 = new MemberException(MemberErrorCode.INVALID_PAGE_NUMBER);

    @ExplainError("회원 목록 조회 권한이 없는 사용자가 접근할 때 발생합니다.")
    public GlobalCodeException 목록_조회_권한_없음 = new MemberException(MemberErrorCode.MEMBER_LIST_ACCESS_FORBIDDEN);
}