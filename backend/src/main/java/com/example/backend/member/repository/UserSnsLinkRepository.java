package com.example.backend.member.repository;

import com.example.backend.member.entity.User;
import com.example.backend.member.entity.UserSnsLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSnsLinkRepository extends JpaRepository<UserSnsLink, Long> {

    List<UserSnsLink> findAllByUser(User user);

    void deleteAllByUser(User user);
}
