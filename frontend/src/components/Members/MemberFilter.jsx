import "./MemberFilter.css";

function MemberFilter() {
  return (
    <div className="member-filter">
      <div className="filter-group">
        <button className="filter-btn active">전체</button>
        <button className="filter-btn">1기</button>
        <button className="filter-btn">2기</button>
      </div>

      <div className="filter-group">
        <button className="filter-btn active">전체</button>
        <button className="filter-btn">AI</button>
        <button className="filter-btn">Front-end</button>
        <button className="filter-btn">Back-end</button>
        <button className="filter-btn">App</button>
        <button className="filter-btn">Design</button>
      </div>
    </div>
  );
}

export default MemberFilter;
