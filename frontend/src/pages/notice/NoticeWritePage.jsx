// src/pages/Notice/NoticeWritePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostEditorForm from "../../components/PostEditor/PostEditorForm";
import { uploadNoticeImage } from "../../lib/storage";
import { createNotice } from "../../services/noticeApi";

function NoticeWritePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);

      // 1) blocks에서 텍스트 content 합치기 (백엔드 스펙: content: string)
      const content = (payload.blocks || [])
        .filter((b) => b.type === "text")
        .map((b) => (b.content || "").trim())
        .filter(Boolean)
        .join("\n\n");

      // 2) 이미지 블록 업로드 → fileUrl 리스트 만들기
      const imageBlocks = (payload.blocks || []).filter((b) => b.type === "image" && b.file);
      const uploadedImageUrls = await Promise.all(
        imageBlocks.map((b) => uploadNoticeImage(b.file))
      );

      const files = uploadedImageUrls.map((url) => ({
        fileUrl: url,
        fileType: "IMAGE",
      }));

      // (첨부파일도 백엔드가 동일 스펙으로 받는다면 여기서 업로드/추가하면 됨)
      // 지금은 이미지 먼저라 했으니 attachments는 일단 제외

      // 3) swagger 스펙대로 POST body 생성
      const body = {
        title: payload.title,
        content,
        files,
      };

      // 4) 공지 생성 요청
      await createNotice(body);

      // 5) 목록으로 이동
      navigate("/notice");
    } catch (e) {
      alert(e?.message || "공지 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PostEditorForm
      onSubmit={handleSubmit}
      submitting={submitting}   // ✅ 이 줄 추가
      extraFields={submitting ? <div className="caption">업로드/저장 중...</div> : null}
    />
  );
}

export default NoticeWritePage;
