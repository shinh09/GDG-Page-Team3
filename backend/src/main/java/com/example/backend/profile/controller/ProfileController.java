package com.example.backend.profile.controller;

import com.example.backend.profile.dto.MyProfileRequest;
import com.example.backend.profile.dto.MyProfileResponse;
import com.example.backend.profile.dto.PasswordUpdateRequest;
import com.example.backend.profile.dto.ProfileImageUrlResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Tag(name = "Profile", description = "내 프로필 관리 API")
public class ProfileController {

    @Operation(summary = "내 프로필 조회")
    @GetMapping
    public ResponseEntity<MyProfileResponse> getMyProfile() {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "프로필 정보 수정")
    @PutMapping
    public ResponseEntity<Void> updateProfile(@RequestBody MyProfileRequest request) {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "비밀번호 변경")
    @PatchMapping("/password")
    public ResponseEntity<Void> updatePassword(@RequestBody PasswordUpdateRequest request) {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "프로필 이미지 변경")
    @PostMapping("/image")
    public ResponseEntity<ProfileImageUrlResponse> updateProfileImage(MultipartFile file) {
        return ResponseEntity.ok().build();
    }


}
