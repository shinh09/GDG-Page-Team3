import "./List.css";

function PostList({ title, date }) {
  return (
    <div className="post-list-item">
      <span className="index">01</span>

      <div>
        <h4>{title}</h4>
        <span>{date}</span>
      </div>
    </div>
  );
}

export default PostList;
