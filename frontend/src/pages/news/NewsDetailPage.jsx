// src/pages/news/NewsDetailPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NoticeHeader from "../../components/Notice/NoticeHeader";
import NoticeContent from "../../components/Notice/NoticeContent";
import NoticeImage from "../../components/Notice/NoticeImage";
import NoticeAttachments from "../../components/Notice/NoticeAttachments";
import NoticeNavigation from "../../components/Notice/NoticeNavigation";
import NoticeBackButton from "../../components/Notice/NoticeBackButton";

import { fetchNewsDetail } from "../../services/newsApi";

import "./NewsDetailPage.css";

function formatCreatedAt(createdAt) {
  if (!createdAt) return "";
  // "2026-01-10T09:15:44.708Z" -> 보기 좋게
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return createdAt;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}

function pickRepresentativeImage(files = []) {
  const img = files.find((f) => f.fileType === "IMAGE" && f.fileUrl);
  return img?.fileUrl || "";
}

function mapAttachments(files = []) {
  // 백엔드가 IMAGE만 주는 것 같지만, 혹시 확장되면 그대로 사용 가능
  return files
    .filter((f) => f.fileUrl)
    .map((f) => ({
      name: f.fileUrl.split("/").pop() || "첨부파일",
      url: f.fileUrl,
      fileType: f.fileType,
    }));
}

function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchNewsDetail(id);
        if (!alive) return;
        setNews(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "뉴스 상세 조회에 실패했습니다.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [id]);

  const viewModel = useMemo(() => {
    if (!news) return null;

    const files = news.files || [];
    const imageUrl = news.thumbnailUrl || pickRepresentativeImage(files);

    return {
      id: news.id,
      title: news.title,
      createdAt: formatCreatedAt(news.createdAt),
      viewCount: news.viewCount ?? 0,
      imageUrl,
      content: news.content || "",
      attachments: mapAttachments(files),
      prev: news.prevPost ? { id: news.prevPost.id, title: news.prevPost.title } : null,
      next: news.nextPost ? { id: news.nextPost.id, title: news.nextPost.title } : null,
    };
  }, [news]);

  if (loading) {
    return (
      <section className="container news-detail-page">
        <div className="caption">불러오는 중...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container news-detail-page">
        <div className="caption">{error}</div>
        <NoticeBackButton onClick={() => navigate("/news")} />
      </section>
    );
  }

  if (!viewModel) return null;

  return (
    <section className="container news-detail-page">
      <NoticeHeader
        title={viewModel.title}
        createdAt={viewModel.createdAt}
        viewCount={viewModel.viewCount}
      />

      <div className="news-detail-divider" />

      {viewModel.imageUrl && <NoticeImage src={viewModel.imageUrl} alt={viewModel.title} />}

      <NoticeContent content={viewModel.content} />

      {viewModel.attachments?.length > 0 && (
        <NoticeAttachments files={viewModel.attachments} />
      )}

      <div className="news-detail-divider" />

      <NoticeNavigation
        prev={viewModel.prev}
        next={viewModel.next}
        onPrev={() => viewModel.prev && navigate(`/news/${viewModel.prev.id}`)}
        onNext={() => viewModel.next && navigate(`/news/${viewModel.next.id}`)}
      />

      <NoticeBackButton onClick={() => navigate("/news")} />
    </section>
  );
}

export default NewsDetailPage;
