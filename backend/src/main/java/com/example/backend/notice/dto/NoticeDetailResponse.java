package com.example.backend.notice.dto;

import java.time.LocalDateTime;

public record NoticeDetailResponse(
        Long id,
        String title,
        String content,
        LocalDateTime createdAt,
        int views
) {}
