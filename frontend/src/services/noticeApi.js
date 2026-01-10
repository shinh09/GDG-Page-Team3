// src/api/noticeApi.js
import { api } from "../lib/api";

/**
 * 공지 목록 조회
 */
export async function fetchNotices({ page, size }) {
  return api.get(`/api/notices?page=${page}&size=${size}`);
}

/**
 * 공지 생성 (swagger: POST /api/notices)
 * body:
 * {
 *   title: string,
 *   content: string,
 *   files: [{ fileUrl: string, fileType: "IMAGE" | "FILE" }]
 * }
 */
export async function createNotice(body) {
  return api.post("/api/notices", body);
}
// ✅ 상세조회
export async function fetchNoticeDetail(id) {
    return api.get(`/api/notices/${id}`);
  }
