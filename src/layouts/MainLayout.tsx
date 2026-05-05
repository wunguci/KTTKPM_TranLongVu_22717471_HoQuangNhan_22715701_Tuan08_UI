import { NavLink, Outlet } from "react-router-dom";
import { FiCreditCard, FiHome, FiShoppingCart, FiZap } from "react-icons/fi";

const MainLayout = () => (
  <div className="layout">
    <header className="site-header">
      <div className="logo">
        <FiZap />
        SHOP Flash Sale
      </div>
      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiHome />
          Trang chủ
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiShoppingCart />
          Giỏ hàng
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiCreditCard />
          Thanh toán
        </NavLink>
      </nav>
    </header>
    <main className="site-main">
      <Outlet />
    </main>
    <footer className="site-footer">
        <p>&copy; 2024 SHOP Flash Sale. All rights reserved.</p>
    </footer>
  </div>
);

export default MainLayout;
