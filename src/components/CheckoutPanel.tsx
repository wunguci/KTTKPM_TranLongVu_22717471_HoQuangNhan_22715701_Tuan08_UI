import { FiArrowRight } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { formatVnd } from "../utils/format";

const CheckoutPanel = () => {
  const { total, checkout, orderMessage } = useShop();

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Đặt hàng</h2>
          {/* <p>PU3 + PU4 trừ stock ngay lập tức.</p> */}
        </div>
        {/* <div className="chip">Thời gian thực</div> */}
      </div>
      <div className="checkout-box">
        <div className="checkout-row">
          <span>Tổng đơn</span>
          <strong>{formatVnd(total)}</strong>
        </div>
        {/* <div className="checkout-row">
          <span>Redis Pipeline</span>
          <strong>On</strong>
        </div> */}
        <button className="primary-btn full" type="button" onClick={checkout}>
          Thanh toán ngay
          <FiArrowRight />
        </button>
        {orderMessage ? <div className="notice">{orderMessage}</div> : null}
      </div>
    </section>
  );
};

export default CheckoutPanel;
