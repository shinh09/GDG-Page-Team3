package com.example.backend.auth.entity;

import com.example.backend.member.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_resets")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PasswordReset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiredAt;

    private LocalDateTime usedAt;
}
