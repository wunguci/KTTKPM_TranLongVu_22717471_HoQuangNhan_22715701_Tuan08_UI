import { FiMinus, FiPlus } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { formatVnd } from "../utils/format";

const CartList = () => {
  const { cartItems, changeQty } = useShop();

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Giỏ hàng</h2>
          {/* <p>PU2 lưu session/cart trong Redis.</p> */}
        </div>
        <div className="chip">{cartItems.length} sản phẩm</div>
      </div>
      <div className="cart-list">
        {cartItems.length === 0 ? (
          <div className="empty">Chưa có sản phẩm trong giỏ.</div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-row">
              <div>
                <strong>{item.name}</strong>
                <span>{formatVnd(item.price)}</span>
              </div>
              <div className="qty">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => changeQty(item.id, -1)}
                >
                  <FiMinus />
                </button>
                <span>{item.qty}</span>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => changeQty(item.id, 1)}
                >
                  <FiPlus />
                </button>
              </div>
              <div className="price">{formatVnd(item.subtotal)}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CartList;
