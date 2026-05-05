import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="page">
    <section className="panel">
      <h2>Không tìm thấy trang</h2>
      <p>Đường dẫn không tồn tại. Quay về trang chủ để tiếp tục.</p>
      <Link className="primary-btn" to="/">
        Về trang chủ
      </Link>
    </section>
  </div>
);

export default NotFoundPage;
