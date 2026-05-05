import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import { useShop } from "../context/ShopContext";
import { formatVnd } from "../utils/format";

const CartPage = () => {
  const { total } = useShop();

  return (
    <div className="page">
      <div className="page-grid">
        <CartList />
        <section className="panel">
          <h2>Tổng quan giỏ hàng</h2>
          {/* <p>Giỏ hàng được lưu trong Redis theo session.</p> */}
          <div className="checkout-box">
            <div className="checkout-row">
              <span>Tổng đơn</span>
              <strong>{formatVnd(total)}</strong>
            </div>
            <Link className="primary-btn full" to="/checkout">
              Thanh toán
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
