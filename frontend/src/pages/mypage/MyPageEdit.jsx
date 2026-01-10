import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/layout.css";
import "./MyPageEdit.css";

function MyPageEdit() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initial = useMemo(
    () => ({
      name: "황길동",
      generation: "황길동",
      position: "직책",
      part: "파트",
      studentId: "21204482",
      major: "지디지학과",
      imageUrl: "https://placehold.co/600x600",
      platform: "플랫폼",
      link: "황길동",

      // ✅ 추가
      bio: "",
      techStacks: [], // ["React", "Spring", ...]
    }),
    []
  );

  const [form, setForm] = useState(initial);
  const [previewUrl, setPreviewUrl] = useState(initial.imageUrl);

  // ✅ 기술스택 입력용
  const [stackInput, setStackInput] = useState("");

  const setValue = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // ✅ tech stack add/remove
  const addStack = () => {
    const v = stackInput.trim();
    if (!v) return;
    setForm((prev) => {
      if (prev.techStacks.includes(v)) return prev;
      return { ...prev, techStacks: [...prev.techStacks, v] };
    });
    setStackInput("");
  };

  const removeStack = (name) => {
    setForm((prev) => ({
      ...prev,
      techStacks: prev.techStacks.filter((s) => s !== name),
    }));
  };

  const onStackKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStack();
    }
  };

  const handleSave = () => {
    // ✅ 지금은 UI만
    navigate("/mypage");
  };

  return (
    <section className="container">
      <div className="mypage-edit-top">
        <h1 className="mypage-edit-title">마이페이지</h1>
        <button className="mypage-edit-save" onClick={handleSave}>
          저장
        </button>
      </div>

      <div className="mypage-edit-center">
        <div className="mypage-edit-avatar">
          <img src={previewUrl} alt="profile" className="mypage-edit-avatar-img" />

          <button type="button" className="mypage-edit-img-btn" onClick={openFilePicker}>
            이미지 수정
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="mypage-edit-file"
            onChange={handleImageChange}
          />
        </div>

        {/* 카드 1: 기본 정보 */}
        <div className="mypage-edit-card">
          <div className="mypage-edit-form">
            <div className="field full">
              <label>이름</label>
              <input value={form.name} onChange={(e) => setValue("name", e.target.value)} />
            </div>

            <div className="field">
              <label>기수</label>
              <input
                value={form.generation}
                onChange={(e) => setValue("generation", e.target.value)}
              />
            </div>

            <div className="field">
              <label>직책</label>
              <select
                value={form.position}
                onChange={(e) => setValue("position", e.target.value)}
              >
                <option value="직책">직책</option>
                <option value="운영진">운영진</option>
                <option value="코어">코어</option>
                <option value="멤버">멤버</option>
              </select>
            </div>

            <div className="field full">
              <label>파트</label>
              <select value={form.part} onChange={(e) => setValue("part", e.target.value)}>
                <option value="파트">파트</option>
                <option value="AI">AI</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="App">App</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="field full">
              <label>학번</label>
              <input
                value={form.studentId}
                onChange={(e) => setValue("studentId", e.target.value)}
              />
            </div>

            <div className="field full">
              <label>학과</label>
              <input value={form.major} onChange={(e) => setValue("major", e.target.value)} />
            </div>

            {/* ✅ 한줄 소개 */}
            <div className="field full">
              <label>한줄 소개</label>
              <textarea
                value={form.bio}
                onChange={(e) => setValue("bio", e.target.value)}
                placeholder="한줄 소개를 입력해주세요"
                rows={3}
              />
            </div>

            {/* ✅ 기술스택 */}
            <div className="field full">
              <label>기술 스택</label>
              <div className="stack-row">
                <input
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyDown={onStackKeyDown}
                  placeholder="예: React (Enter로 추가)"
                />
                <button type="button" className="stack-add" onClick={addStack}>
                  추가
                </button>
              </div>

              <div className="stack-chips">
                {form.techStacks.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className="stack-chip"
                    onClick={() => removeStack(s)}
                    title="클릭하면 삭제"
                  >
                    {s} ✕
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 카드 2: 링크 */}
        <div className="mypage-edit-card">
          <div className="mypage-edit-form two-col">
            <div className="field">
              <label>플랫폼</label>
              <select
                value={form.platform}
                onChange={(e) => setValue("platform", e.target.value)}
              >
                <option value="플랫폼">플랫폼</option>
                <option value="Github">Github</option>
                <option value="Notion">Notion</option>
                <option value="Velog">Velog</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Portfolio">Portfolio</option>
              </select>
            </div>

            <div className="field">
              <label>링크</label>
              <input
                value={form.link}
                onChange={(e) => setValue("link", e.target.value)}
                placeholder="https://"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPageEdit;
