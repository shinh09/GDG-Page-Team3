package com.example.backend.member.controller;

import com.example.backend.member.dto.MemberDetailResponse;
import com.example.backend.member.dto.MemberListRequest;
import com.example.backend.member.dto.MemberListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
@Tag(name = "Member", description = "멤버 관련 API")
public class MemberController {

    // private final MemberService memberservice;

    @Operation(summary = "멤버 목록 조회")
    @GetMapping
    public ResponseEntity<List<MemberListResponse>> getMembers(MemberListRequest request) {
        // TODO: 서비스 로직 연결
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "멤버 상세 조회")
    @GetMapping("/{memberId}")
    public ResponseEntity<MemberDetailResponse> getMemberDetail(@PathVariable Long memberId) {
        // TODO: 서비스 로직 연결
        return ResponseEntity.ok().build();
    }
}
