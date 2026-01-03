package com.example.backend.news.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "news_files")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id")
    private News news;

    @Column(nullable = false)
    private String fileUrl;

    private String fileType;
}
