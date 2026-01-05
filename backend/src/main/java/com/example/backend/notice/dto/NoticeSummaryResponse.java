package com.example.backend.notice.dto;

import java.time.LocalDateTime;

public record NoticeSummaryResponse(
        Long id,
        String title,
        LocalDateTime createdAt
) {}
