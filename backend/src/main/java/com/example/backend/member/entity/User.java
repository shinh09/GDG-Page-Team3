package com.example.backend.member.entity;

import com.example.backend.auth.entity.EmailVerification;
import com.example.backend.common.BaseEntity;
import com.example.backend.member.enums.MemberRole;
import com.example.backend.member.enums.MemberStatus;
import com.example.backend.profile.entity.Profile;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer generation;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    private String part;
    private String studentId;
    private String department;
    private String email;
    private String passwordHash;
    private Boolean isEmailVerified = false;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    // 양방향 매핑 (선택 사항이나 관리상 편리)
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserSnsLink> snsLinks = new ArrayList<>();


}
