// src/pages/notice/NoticeDetailPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import NoticeHeader from "../../components/Notice/NoticeHeader";
import NoticeContent from "../../components/Notice/NoticeContent";
import NoticeImage from "../../components/Notice/NoticeImage";
import NoticeAttachments from "../../components/Notice/NoticeAttachments";
import NoticeNavigation from "../../components/Notice/NoticeNavigation";
import NoticeBackButton from "../../components/Notice/NoticeBackButton";

import { fetchNoticeDetail } from "../../services/noticeApi";

import "./NoticeDetailPage.css";

function formatDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

function fileNameFromUrl(url) {
  try {
    const clean = url.split("?")[0];
    const last = clean.split("/").pop();
    return decodeURIComponent(last || "file");
  } catch (e) {
    return "file";
  }
}

// ✅ 백엔드가 prevPost/nextPost, prevNotice/nextNotice, prev/next 등 어떤 이름으로 주든 대응
function pickPrevNext(raw) {
  const prev =
    raw?.prevPost ||
    raw?.prevNotice ||
    raw?.prev ||
    raw?.previousPost ||
    raw?.previous ||
    null;

  const next =
    raw?.nextPost ||
    raw?.nextNotice ||
    raw?.next ||
    raw?.nextestPost || // 오타 방지용(혹시)
    null;

  const normalize = (x) =>
    x && typeof x === "object" && x.id != null
      ? { id: x.id, title: x.title || "" }
      : null;

  return { prev: normalize(prev), next: normalize(next) };
}

function NoticeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await fetchNoticeDetail(id);
        if (!mounted) return;

        setNotice(data);
      } catch (e) {
        if (!mounted) return;
        setErrorMsg(e?.message || "공지 상세 조회에 실패했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [id]);

  const mapped = useMemo(() => {
    if (!notice) return null;

    const files = Array.isArray(notice.files) ? notice.files : [];

    // ✅ 대표 이미지: IMAGE 중 첫 번째
    const imageUrl =
      files.find((f) => f.fileType === "IMAGE" && f.fileUrl)?.fileUrl || "";

    // ✅ 첨부파일: FILE만 (백엔드에서 FILE 타입을 쓰는 경우)
    const attachments = files
      .filter((f) => f.fileType === "FILE" && f.fileUrl)
      .map((f) => ({
        name: fileNameFromUrl(f.fileUrl),
        url: f.fileUrl,
      }));

    const { prev, next } = pickPrevNext(notice);

    return {
      id: notice.id,
      title: notice.title || "",
      createdAt: formatDateTime(notice.createdAt),
      viewCount: notice.viewCount ?? 0,
      content: notice.content || "",
      imageUrl,
      attachments,
      prev,
      next,
    };
  }, [notice]);

  if (loading) {
    return (
      <section className="container notice-detail-page">
        <div className="caption">불러오는 중...</div>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="container notice-detail-page">
        <div className="caption" style={{ marginBottom: 12 }}>
          {errorMsg}
        </div>
        <NoticeBackButton onClick={() => navigate("/notice")} />
      </section>
    );
  }

  if (!mapped) return null;

  return (
    <section className="container notice-detail-page">
      <NoticeHeader
        title={mapped.title}
        createdAt={mapped.createdAt}
        viewCount={mapped.viewCount}
      />

      <div className="notice-detail-divider" />

      {/* ✅ 대표 이미지 */}
      {mapped.imageUrl && <NoticeImage src={mapped.imageUrl} alt={mapped.title} />}

      <NoticeContent content={mapped.content} />

      {/* ✅ 첨부파일 */}
      {mapped.attachments?.length > 0 && (
        <NoticeAttachments files={mapped.attachments} />
      )}

      <div className="notice-detail-divider" />

      {/* ✅ 이전글/다음글: 백엔드가 내려주면 자동 표시 */}
      {(mapped.prev || mapped.next) && (
        <NoticeNavigation
          prev={mapped.prev}
          next={mapped.next}
          onPrev={() => mapped.prev && navigate(`/notice/${mapped.prev.id}`)}
          onNext={() => mapped.next && navigate(`/notice/${mapped.next.id}`)}
        />
      )}

      <NoticeBackButton onClick={() => navigate("/notice")} />
    </section>
  );
}

export default NoticeDetailPage;
