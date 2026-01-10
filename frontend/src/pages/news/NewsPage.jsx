// src/pages/news/NewsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../../components/List/PostList";
import Pagination from "../../components/Pagination/Pagination";
import MemberFilter from "../../components/Members/MemberFilter";
import Button from "../../components/Button/Button";
import { fetchNewsList } from "../../services/newsApi";
import "./NewsPage.css";

function NewsPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // UI: 1-based
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const filters = useMemo(
    () => [
      { key: "generation", options: ["전체", "1기", "2기", "3기", "4기", "5기"] },
    ],
    []
  );

  const [selected, setSelected] = useState({ generation: "전체" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // "1기" -> 1 (int), "전체" -> undefined
  const generationParam = useMemo(() => {
    if (selected.generation === "전체") return undefined;
    const n = parseInt(String(selected.generation).replace("기", ""), 10);
    return Number.isFinite(n) ? n : undefined;
  }, [selected.generation]);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        const apiPage = Math.max(0, page - 1); // API: 0-based
        const data = await fetchNewsList({
          generation: generationParam,
          page: apiPage,
          size,
        });

        // 스웨거 예시가 배열이라 "그대로 배열" 응답이라고 가정
        // 만약 백엔드가 {content, totalPages} 형태면 아래를 그 형태로 바꾸면 됨.
        const list = Array.isArray(data) ? data : data?.content ?? [];
        const tp =
          typeof data?.totalPages === "number"
            ? data.totalPages
            : Math.max(1, Math.ceil(list.length / size)); // fallback

        if (!alive) return;
        setItems(list);
        setTotalPages(tp);
      } catch (e) {
        if (!alive) return;
        alert(e?.message || "뉴스 목록 조회 실패");
        setItems([]);
        setTotalPages(1);
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [page, size, generationParam]);

  return (
    <section className="container news-page">
      <div className="news-header">
        <h1 className="page-title">소식</h1>
        <Button variant="primary" onClick={() => navigate("/news/write")}>
          작성하기
        </Button>
      </div>

      <MemberFilter
        filters={filters}
        selected={selected}
        onChange={(key, value) => {
          setSelected({ [key]: value });
          setPage(1); // 필터 바꾸면 첫 페이지로
        }}
      />

      <div className="news-divider" />

      <div className="news-list">
        {loading ? (
          <div className="caption">불러오는 중...</div>
        ) : (
          items.map((item, index) => (
            <List
              key={item.id}
              index={String((page - 1) * size + index + 1).padStart(2, "0")}
              title={item.title}
              date={(item.createdAt || "").slice(0, 10)} // 2026-01-10...
              image={item.thumbnailUrl || "https://placehold.co/120x80"}
              onClick={() => navigate(`/news/${item.id}`)}
            />
          ))
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
}

export default NewsPage;
