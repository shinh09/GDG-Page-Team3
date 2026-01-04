import MemberFilter from "../../components/Members/MemberFilter";
import MemberGrid from "../../components/Members/MemberGrid";
import "../../styles/layout.css";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";

function MembersPage() {
    const [page, setPage] = useState(1);
  return (
    <section className="container">
      <h1 className="page-title">멤버</h1>

      <MemberFilter />

      <MemberGrid page={page} />

      <Pagination
        currentPage={page}
        totalPages={5}
        onPageChange={setPage}
      />
    </section>
  );
}

export default MembersPage;
