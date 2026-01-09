package com.example.backend.profile.document;

import com.example.backend.global.annotation.ExceptionDoc;
import com.example.backend.global.annotation.ExplainError;
import com.example.backend.global.exception.GlobalCodeException;
import com.example.backend.global.interfaces.SwaggerExampleExceptions;
import com.example.backend.profile.exception.ProfileErrorCode;
import com.example.backend.profile.exception.ProfileException;

@ExceptionDoc
public class ProfileImageExceptionDocs implements SwaggerExampleExceptions {

    @ExplainError("지원하지 않는 확장자(예: .txt, .exe)를 업로드할 때 발생합니다.")
    public GlobalCodeException 지원하지_않는_형식 = new ProfileException(ProfileErrorCode.UNSUPPORTED_IMAGE_FORMAT);

    @ExplainError("이미지 파일 크기가 설정된 제한(예: 5MB)을 넘을 때 발생합니다.")
    public GlobalCodeException 파일_크기_초과 = new ProfileException(ProfileErrorCode.IMAGE_SIZE_EXCEEDED);

    @ExplainError("이미지 업로드 중 서버 측 처리 오류가 발생했을 때 발생합니다.")
    public GlobalCodeException 업로드_실패 = new ProfileException(ProfileErrorCode.IMAGE_UPLOAD_FAILED);
}
