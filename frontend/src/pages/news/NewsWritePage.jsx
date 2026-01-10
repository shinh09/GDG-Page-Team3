// src/pages/news/NewsWritePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostEditorForm from "../../components/PostEditor/PostEditorForm";
import { uploadNewsImage } from "../../lib/storage";
import { createNews } from "../../services/newsApi";

function NewsWritePage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);

      const content = (payload.blocks || [])
        .filter((b) => b.type === "text")
        .map((b) => (b.content || "").trim())
        .filter(Boolean)
        .join("\n\n");

      const imageBlocks = (payload.blocks || []).filter(
        (b) => b.type === "image" && b.file
      );

      const uploadedImageUrls = await Promise.all(
        imageBlocks.map((b) => uploadNewsImage(b.file))
      );

      const files = uploadedImageUrls
        .filter(Boolean)
        .map((url) => ({
          fileUrl: url,
          fileType: "IMAGE",
        }));

      const body = {
        title: payload.title,
        content,
        files,
      };

      await createNews(body);
      navigate("/news");
    } catch (e) {
      alert(e?.message || "뉴스 작성에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PostEditorForm
      onSubmit={handleSubmit}
      extraFields={submitting ? <div className="caption">업로드/저장 중...</div> : null}
    />
  );
}

export default NewsWritePage;
