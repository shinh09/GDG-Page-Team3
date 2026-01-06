package com.example.backend.member.repository;

import com.example.backend.member.entity.User;
import com.example.backend.member.enums.MemberStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByStudentId(String studentId);

    boolean existsByEmail(String email);

}
