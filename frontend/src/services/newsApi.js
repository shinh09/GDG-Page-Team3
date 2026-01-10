// src/services/newsApi.js
import { api } from "../lib/api";

// 목록 조회: page는 0-base (swagger default: 0)
export async function fetchNewsList({ generation, page = 0, size = 10 }) {
  const params = new URLSearchParams();
  if (generation !== undefined && generation !== null && generation !== "" && generation !== "전체") {
    // UI에서 "1기" 같은 문자열이면 숫자로 변환해서 넣어야 함
    params.set("generation", String(generation));
  }
  params.set("page", String(page));
  params.set("size", String(size));

  return api.get(`/api/news?${params.toString()}`);
}

export async function fetchNewsDetail(id) {
  return api.get(`/api/news/${id}`);
}

export async function createNews(body) {
  // body: { title, content, files:[{fileUrl,fileType:"IMAGE"}] }
  return api.post(`/api/news`, body);
}
