import Navbar from "../Navbar/Navbar";
import "../../styles/layout.css";
import "./Header.css";

function Header() {
  const isLoggedIn = false;

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-left">GDGoC</div>

        <div className="header-center">
          <Navbar />
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <a href="/mypage">마이페이지</a>
          ) : (
            <>
              <a href="/login">로그인</a>
              <a href="/signup">회원가입</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
