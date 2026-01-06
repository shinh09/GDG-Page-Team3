package com.example.backend.member.repository;

import com.example.backend.member.entity.User;
import com.example.backend.member.entity.UserTechStack;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTechStackRepository extends JpaRepository<UserTechStack, Long> {

    List<UserTechStack> findAllByUser(User user);

    void deleteAllByUser(User user);
}
