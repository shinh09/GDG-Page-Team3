package com.example.backend.notice.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notice_files")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_id")
    private Notice notice;

    @Column(nullable = false)
    private String fileUrl;

    private String fileType;
}
