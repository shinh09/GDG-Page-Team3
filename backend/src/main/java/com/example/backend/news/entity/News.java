package com.example.backend.news.entity;

import com.example.backend.common.BaseEntity;
import com.example.backend.member.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "news")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String thumbnailUrl;

    private Integer generation;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    // 뉴스에 포함된 파일 리스트 (1:N)
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsFile> files = new ArrayList<>();
}
