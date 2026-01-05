package com.example.backend.news.dto;

import java.time.LocalDateTime;

public record NewsSummaryResponse(
        Long id,
        String title,
        LocalDateTime createdAt
) {}
