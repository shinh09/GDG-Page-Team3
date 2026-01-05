package com.example.backend.news.dto;

import java.time.LocalDateTime;

public record NewsDetailResponse(
        Long id,
        String title,
        String content,
        LocalDateTime createdAt
) {}
