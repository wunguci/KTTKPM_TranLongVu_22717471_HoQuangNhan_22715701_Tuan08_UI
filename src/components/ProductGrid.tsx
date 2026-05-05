import { FiBox, FiShoppingCart } from "react-icons/fi";
import { useShop } from "../context/ShopContext";
import { formatVnd } from "../utils/format";

const ProductGrid = () => {
  const { products, addToCart } = useShop();

  return (
    <section className="panel products">
      <div className="panel-header">
        <div>
          <h2>Danh sách sản phẩm</h2>
          {/* <p>Load từ Data Grid, không truy cập DB.</p> */}
        </div>
        <div className="chip">
          <FiBox /> {products.length} sản phẩm
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-top">
              <div>
                <h3>{product.name}</h3>
                <span>{product.category}</span>
              </div>
              <div className="tag">SLA {product.sla}</div>
            </div>
            <div className="product-meta">
              <strong>{formatVnd(product.price)}</strong>
              <span>Tồn kho: {product.stock}</span>
            </div>
            <button
              className="add-btn"
              type="button"
              onClick={() => addToCart(product.id)}
              disabled={product.stock === 0}
            >
              <FiShoppingCart /> Thêm vào giỏ
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
